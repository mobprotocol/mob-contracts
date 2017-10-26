const Settlement = artifacts.require('./Settlement')
const Token = artifacts.require('./Token')
const Tokens = require('../../conf/tokens.json')
const BN = require('bn.js')

contract('Settlement', accts => {
  before(async () => {
    console.log('### before')
    const settlement = await Settlement.deployed()
    const TokenA = await Token.new(Tokens[0].name, Tokens[0].symbol, Tokens[0].decimals, Tokens[0].supply)
    const TokenB = await Token.new(Tokens[1].name, Tokens[1].symbol, Tokens[1].decimals, Tokens[1].supply)
  })

  it('Should submit two signed orders to atomic swap', async () => {
    try  {

      const order1 = {
        // price = price / 1000
        price: new BN(550, 10),
        quantity: new BN(50)
      }
    } catch (err) {
      console.log('### error in atomic swap test 1', err)
    }
  })
})
