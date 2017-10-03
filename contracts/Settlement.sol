pragma solidity ^0.4.15;

contract Settlement {
  function verifySignature(bytes32 _msg, bytes32[3] _sig) returns (address) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 msgHash = sha3(prefix, _msg);
    address signer = ecrecover(msgHash, uint8(_sig[2]), _sig[0], _sig[1]);
    return signer;
  }
}
