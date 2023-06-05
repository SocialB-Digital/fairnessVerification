import React, { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";

function PlinkoVerification() {
  const queryParams = new URLSearchParams(window.location.search);
  const clientSeed = queryParams.get("clientSeed");
  const serverSeed = queryParams.get("severSeed");
  const nonce = queryParams.get("nonce");
  const serverHashed = queryParams.get("serverSeedhashed");
  const [clienthash, setClientHash] = useState(null);
  const [plinkoResult, setplinkoResult] = useState(null);
  // http://localhost:3000/limbo/?clientSeed=clientSeed&severSeed=serverSeed&nonce=3
  const result_hash = (serverSeed, clientSeed, nonce) => {
    const message = clientSeed + ":" + nonce;
    return CryptoJS.HmacSHA256(message, serverSeed).toString(CryptoJS.enc.Hex);
  };
  const hmac_sha512 = (serverSeed, clientSeed, nonce) => {
    const msg = clientSeed + ":" + nonce;
    return CryptoJS.HmacSHA512(msg, serverSeed).toString(CryptoJS.enc.Hex);
  };

  const result_hash_list = () => {
    return String(hmac_sha512(serverSeed, clientSeed, nonce)).match(/.{2}/g);
  };
  const hexToDecimal = (hex) => parseInt(hex, 16);

  const gameResult = () => {
    let res = [];
    let hexArr = result_hash_list();
    for (let i = 0, l = hexArr.length; i < l; i += 4) {
      let num =
        hexToDecimal(hexArr[i]) / Math.pow(256, 1) +
        hexToDecimal(hexArr[i + 1]) / Math.pow(256, 2) +
        hexToDecimal(hexArr[i + 2]) / Math.pow(256, 3) +
        hexToDecimal(hexArr[i + 3]) / Math.pow(256, 4);
      res.push(num);
    }
    return res;
  };
  useEffect(() => {
    setplinkoResult(
      gameResult(result_hash(serverSeed, clientSeed, nonce), serverSeed)
    );
    setClientHash(hmac_sha512(serverSeed, clientSeed, nonce));
  }, []);
  const Hash = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63,
  ];
  return (
    <div className="main">
      <h1 className="text-center pb-3">Plinko verify</h1>
      <hr />
      <form className="py-3">
        <h2 className="text-center">Input</h2>
        <div className="form-group">
          <input
            placeholder="Client Seed"
            value={clientSeed}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Server Seed"
            value={serverSeed}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input placeholder="Nonce" value={nonce} className="form-control" />
        </div>
      </form>
      <hr />
      <form className="py-3">
        <h2 className="text-center pb-3">Output</h2>
        <div className="form-group">
          <label>sha256(server_seed)</label>
          <input
            readonly="readonly"
            value={serverHashed}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>hmac_sha512(client_seed:nonce, server_seed)</label>
          <input
            readonly="readonly"
            value={clienthash}
            className="form-control"
          />
        </div>
        <hr />
        <h5>Convert each set of four bytes into a number</h5>
        <div className="form-group" style={{ overflowX: "auto" }}>
          <table
            className="table table-sm table-bordered"
            style={{ width: "1200px", marginBottom: "0" }}
          >
            <thead>
              <tr>
                <th>#</th>
                {Hash.map((val, rowID) => (
                  <td key={rowID}>{val}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Hex</th>
                {result_hash_list().map((val, rowID) => (
                  <td key={rowID}>{val}</td>
                ))}
              </tr>
              <tr>
                <th>Base 10</th>
                {result_hash_list().map((val, rowID) => (
                  <td key={rowID}>{hexToDecimal(val)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="py-3">
          <h5>
            Each set of 4 bytes is turned into a number in the range (0, 1).
            Only the first calculation is displayed for conciceness.
          </h5>
        </div>
        <div>
          ({hexToDecimal(result_hash_list()[0])}/256^1) + (
          {hexToDecimal(result_hash_list()[1])}/256^2) + (
          {hexToDecimal(result_hash_list()[2])}/256^3) + (
          {hexToDecimal(result_hash_list()[3])}/256^4)
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          = ({hexToDecimal(result_hash_list()[0]) / 256} ) + (
          {hexToDecimal(result_hash_list()[1]) / (256 * 256)}) + (
          {hexToDecimal(result_hash_list()[2]) / (256 * 256 * 256)} ) + (
          {hexToDecimal(result_hash_list()[3]) / (256 * 256 * 256 * 256)})
        </div>
        <div>
          = (
          {hexToDecimal(result_hash_list()[0]) / 256 +
            hexToDecimal(result_hash_list()[1]) / (256 * 256) +
            hexToDecimal(result_hash_list()[2]) / (256 * 256 * 256) +
            hexToDecimal(result_hash_list()[3]) / (256 * 256 * 256 * 256)}
          )
        </div>
      </form>
      <form className="py-3">
        <h2 className="text-center pb-3">Results</h2>
        <div className="form-group">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Pin #</th>
                <th>Number</th>
                <th>Number*2</th>
                <th>Direction</th>
              </tr>
            </thead>
            <tbody>
              {plinkoResult?.map((num, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{num}</td>
                  <td>{num * 2}</td>
                  <td>{num > 0.5 ? "Right" : "Left"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default PlinkoVerification;
