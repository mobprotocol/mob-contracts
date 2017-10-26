const Settlement = artifacts.require('./Settlement')
const Token = artifacts.require('./Token')
const Tokens = require('../../conf/tokens.json')
const Users = require('../../conf/users.json')
const BN = require('bn.js')
const { calcPermID, signOrder } = require('./utils')

contract('Settlement', accts => {
  let settlement
  let TokenA
  let TokenB
  let permutationID

  before(async () => {
    console.log('### before')
    settlement = await Settlement.deployed()
    TokenA = await Token.new(Tokens[0].name, Tokens[0].symbol, Tokens[0].decimals, Tokens[0].supply)
    TokenB = await Token.new(Tokens[1].name, Tokens[1].symbol, Tokens[1].decimals, Tokens[1].supply)
    permutationID = await calcPermID(TokenA.address, TokenB.address)
  })

  it('Should submit two signed orders to atomic swap', async () => {
    try  {
      const order1 = {
        price: new BN(550, 10),
        quantity: new BN(50),
        sell: TokenA.address,
        permutationID
      }
      const order2 = {
        price: new BN(1500, 10),
        quanity: new BN(100),
        sell: TokenB.address,
        permutationID
      }
      const signature1 = await signOrder(order1, Users[0].secretKey)
      const signature2 = await signOrder(order2, Users[1].secretKey)
      
    } catch (err) {
      console.log('### error in atomic swap test 1', err)
    }
  })
})
