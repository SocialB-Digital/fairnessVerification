const web3 = require("web3");
var CryptoJS = require("crypto-js");
const keccak256 = require("keccak256");
const hashVerify = (
  hash,
  amount,
  setreturnedMultiplier,
  setReturnedHashes,
  SaltField
) => {
  let multiplier_array = [];
  let hash_array = [];
  var hash = hash;
  // var salt = "cc4fa823defe35515f78efba2a7ac31c45fd81468916c6929ac2ff1f3368fe6c";
  var salt = SaltField;
  let num = amount;
  for (let i = 0; i < num; i++) {
    var encoded = web3.utils.encodePacked(
      { value: salt, type: "string" },
      { value: hash, type: "string" }
    );
    var message = web3.utils.soliditySha3(encoded);
    var number = Number.parseInt("hash", 16);
    if (number % 33 == 0) {
      return 1;
    }
    var sliceHash = Number.parseInt(message.slice(2, 15), 16);
    var power = Math.pow(2, 52);
    var multiplier = parseFloat(
      (99 * power - sliceHash) / (power - sliceHash) / 100
    ).toFixed(2);
    // console.log("Script multiplier", multiplier);
    multiplier = Math.max(1, multiplier);
    multiplier_array.push(multiplier);
    // setreturnedMultiplier([multiplier]);
    // setreturnedMultiplier((prevState) => [...prevState, multiplier]);
    // console.log("Script hash", hash);
    hash_array.push(hash);
    // setReturnedHashes((prevState) => [...prevState, hash]);
    var sha256 = CryptoJS.algo.SHA256.create();
    sha256.update(hash);
    var hash = sha256.finalize();
    hash = hash.toString(CryptoJS.enc.Hex);
  }
  setreturnedMultiplier(multiplier_array);
  setReturnedHashes(hash_array);
};
export default hashVerify;