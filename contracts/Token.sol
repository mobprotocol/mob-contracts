pragma solidity ^0.4.11;

contract Token {
  event Transfer(address indexed _from, address indexed _to, uint256 indexed _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 indexed _value);

  string public name;
  string public symbol;
  uint256 public decimals;
  uint256 public supply;
  mapping(address => uint) balances;
  mapping(address => mapping(address => uint)) approvals;

  function Token(string _name, string _symbol, uint256 _decimals, uint256 _supply) {
      name = _name;
      symbol = _symbol;
      decimals = _decimals;
      supply = _supply;
  }

  function transfer(address _to, uint256 _value) returns (bool) {
      require(_value <= balances[msg.sender]);
      balances[msg.sender] -= _value;
      balances[_to] += _value;
      Transfer(msg.sender, _to, _value);
      return true;

  }

  function approve(address _spender, uint _value ) returns (bool) {
      require(_value <= balances[msg.sender]);
      approvals[msg.sender][_spender] = _value;
      Approval(msg.sender, _spender, _value);
      return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) returns (bool) {
      require(_value <= approvals[_from][msg.sender]);
      approvals[_from][msg.sender] -= _value;
      balances[_from] -= _value;
      balances[_to] += _value;
      Transfer(_from, _to, _value);
      return true;
  }
}
