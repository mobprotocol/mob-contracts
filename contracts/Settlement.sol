pragma solidity ^0.4.7;

contract Settlement {
    function verifyMsg() returns (bytes32) {
        return sha3('hello world');
    }
    function verifyHash(bytes32 _msg) returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        return sha3(prefix, _msg);
    }
    function verifySignature(bytes32 _msg, uint8 v, bytes32 r, bytes32 s) returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 msgHash = sha3(prefix, _msg);
        return ecrecover(msgHash, v, r, s);
    }
}
