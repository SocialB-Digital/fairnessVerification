import React, { useEffect } from "react";
import { useState } from "react";
import hashVerify from "./verifyMultiplier";
import { Routes, Route } from "react-router";
import LimboVerification from "./Components/LimboVerification";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userhash = queryParams.get("hash");
  const [hashField, setHashField] = useState(userhash);
  const [SaltField, setSaltField] = useState(
    "cc4fa823defe35515f78efba2a7ac31c45fd81468916c6929ac2ff1f3368fe6c"
  );
  const [hashAmount, setHashamount] = useState(5);
  const [returnedHashes, setReturnedHashes] = useState([]);
  const [returnedMultiplier, setreturnedMultiplier] = useState([]);
  const [err, seterr] = useState(false);

  // console.log("Returned Hashes : ", returnedHashes);
  // console.log("Returned Multiplier : ", returnedMultiplier);
  const handleVerify = () => {
    if (!hashField || !SaltField || !hashAmount) {
      seterr(true);
    } else {
      seterr(false);

      hashVerify(
        hashField,
        hashAmount,
        setreturnedMultiplier,
        setReturnedHashes,
        SaltField
      );
    }
  };
  useEffect(() => {
    handleVerify();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <section className="section">
            <div className="container">
              <h1 className="title">
                BCW.CLUB/CRASH - Game Verification Script
              </h1>
              <h2 className="subtitle">
                Third party script used to verify games on crash game.
              </h2>
            </div>
            <hr />
            <div className="container">
              <p>
                The following sites have purchased a non-distributable copy of
                the previous version of bcw.club's source code, exempting them
                from the requirements of the AGPL:
              </p>
              <p>
                <a target="_blank" href="https://bcw.club">
                  https://bcw.club
                </a>
              </p>
            </div>
            <hr />

            <hr />
            <div className="container">
              <div className="field">
                <label className="label">Game's hash</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    id="game_hash_input"
                    placeholder="Game's hash (SHA256)"
                    value={hashField}
                    onChange={(e) => {
                      setHashField(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-key"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Salt</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    id="game_salt_input"
                    placeholder="Salt"
                    value={SaltField}
                    onChange={(e) => {
                      setSaltField(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-filter"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Amount of games</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="number"
                    id="game_amount_input"
                    min="1"
                    max="100000"
                    step="1"
                    placeholder="Amount of games"
                    value={hashAmount}
                    onChange={(e) => {
                      setHashamount(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-hashtag"></i>
                  </span>
                </p>
              </div>
              <div className="field is-grouped justified">
                <p className="control">
                  <button
                    style={{
                      background: "grey",
                      border: "none",
                      color: "black",
                      opacity: "80%",
                    }}
                    className="button is-primary"
                    id="game_verify_submit"
                    onClick={handleVerify}
                  >
                    Verify
                  </button>
                </p>
                {err && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Fields must be filled.
                  </span>
                )}
              </div>
            </div>
            <hr />
            <div className="container">
              <table
                className="table is-striped is-fullwidth is-hoverable is-narrow"
                style={{
                  display: "table",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <b>Game's hash</b>
                    </th>
                    <th>
                      <b>Bust</b>
                    </th>
                  </tr>
                </thead>
                <tbody id="game_verify_table">
                  {returnedHashes.map((hash, index) => {
                    return (
                      <tr key={index} className="is-first">
                        <td>{hash}</td>
                        <td className="is-under-median">
                          {returnedMultiplier[index]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        }
      />

      <Route path="/limbo" element={<LimboVerification />} />
    </Routes>
  );
};

export default App;
