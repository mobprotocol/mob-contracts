const Settlement = artifacts.require('./Settlement.sol')
const Token = artifacts.require('./Token.sol')
const Tokens = require('../conf/tokens.json')

module.exports = function(deployer) {
  deployer.deploy(Token, Tokens[0].name, Tokens[0].symbol, Tokens[0].decimals, Tokens[0].supply)
  deployer.deploy(Token, Tokens[1].name, Tokens[1].symbol, Tokens[1].decimals, Tokens[1].supply)
  deployer.deploy(Settlement)
}
