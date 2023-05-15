import React from "react";

const LimboVerification = () => {
  return (
    <div id="app" class="main">
      <h1 class="text-center pb-5">Limbo verify</h1>
      <hr />
      <form class="py-5">
        <h2 class="text-center">Input</h2>
        <div class="form-group">
          <input placeholder="Client Seed" class="form-control" />
        </div>
        <div class="form-group">
          <input placeholder="Server Seed" class="form-control" />
        </div>
        <div class="form-group">
          <input placeholder="Server Seed Hash" class="form-control" />
        </div>
        <div class="form-group">
          <input placeholder="Nonce" class="form-control" />
        </div>
      </form>
      <hr />
      <form class="py-5">
        <h2 class="text-center pb-5">Output</h2>
        <div class="form-group">
          <label>sha256(server_seed)</label>
          <input readonly="readonly" class="form-control" />
        </div>
        <div class="form-group">
          <label>hmac_sha256(client_seed:nonce, server_seed)</label>
          <input readonly="readonly" class="form-control" />
        </div>
      </form>
      <hr />
      <form class="py-5">
        <h2 class="text-center pb-5">Results</h2>
        <h5>Final Result</h5>
        <h5>hmac_sha256(client_seed:nonce, server_seed)</h5>
        <input readonly="readonly" class="form-control" />
      </form>
    </div>
  );
};

export default LimboVerification;
