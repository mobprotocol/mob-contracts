pragma solidity ^0.4.11;

contract Token {
  event Transfer(address indexed _from, address indexed _to, uint256 indexed _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 indexed _value);

  string public name;
  string public symbol;
  uint256 public decimals;
  uint256 public supply;
  mapping(address => uint) balances;
  mapping(address => mapping(address => uint)) allowances;

  function Token(string _name, string _symbol, uint256 _decimals, uint256 _supply) {
    name = _name;
    symbol = _symbol;
    decimal = _decimal;
    supply = _supply;
  }
}
