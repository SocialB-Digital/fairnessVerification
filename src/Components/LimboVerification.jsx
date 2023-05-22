import React, { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";

const LimboVerification = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const clientSeed = queryParams.get("clientSeed");
  const serverSeed = queryParams.get("severSeed");
  const nonce = queryParams.get("nonce");
  const serverHashed = queryParams.get("serverSeedhashed");
  const [clienthash, setClientHash] = useState(null);
  const [limboResult, setlimboResult] = useState(null);
  // http://localhost:3000/limbo/?clientSeed=clientSeed&severSeed=serverSeed&nonce=3
  const result_hash = (serverSeed, clientSeed, nonce) => {
    const message = clientSeed + ":" + nonce;
    return CryptoJS.HmacSHA256(message, serverSeed).toString(CryptoJS.enc.Hex);
  };
  const gameResult = (result_hash_list, server_seed) => {
    let seed = result_hash_list;
    const nBits = 52;
    seed = seed.slice(0, nBits / 4);
    const r = parseInt(seed, 16);
    let X = r / Math.pow(2, nBits);
    X = 99 / (1 - X);
    const result = Math.floor(X);
    return server_seed ? Math.max(1, result / 100) : "";
  };
  useEffect(() => {
    setlimboResult(
      gameResult(result_hash(serverSeed, clientSeed, nonce), serverSeed)
    );

    setClientHash(result_hash(serverSeed, clientSeed, nonce));
  }, []);

  return (
    <div id="app" class="main">
      <h1 class="text-center pb-5">Limbo verify</h1>
      <hr />
      <form class="py-5">
        <h2 class="text-center">Input</h2>
        <div class="form-group">
          <input
            placeholder="Client Seed"
            value={clientSeed}
            class="form-control"
          />
        </div>
        <div class="form-group">
          <input
            placeholder="Server Seed"
            value={serverSeed}
            class="form-control"
          />
        </div>
        <div class="form-group">
          <input placeholder="Nonce" value={nonce} class="form-control" />
        </div>
      </form>
      <hr />
      <form class="py-5">
        <h2 class="text-center pb-5">Output</h2>
        <div class="form-group">
          <label>sha256(server_seed)</label>
          <input
            readonly="readonly"
            value={serverHashed}
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>hmac_sha256(client_seed:nonce, server_seed)</label>
          <input readonly="readonly" value={clienthash} class="form-control" />
        </div>
      </form>
      <hr />
      <form class="py-5">
        <h2 class="text-center pb-5">Results</h2>
        <h5>Final Result</h5>
        <h5>hmac_sha256(client_seed:nonce, server_seed)</h5>
        <input readonly="readonly" value={limboResult} class="form-control" />
      </form>
    </div>
  );
};

export default LimboVerification;
