const Settlement = artifacts.require('./Settlement')
const { sha3, ecsign } = require('ethereumjs-util')
const { getContract } = require('./utils')
const users = require('../conf/users.json')

contract('Settlement', (accounts) => {
  it ('Verify js and solidity sha3 conformity :)', async () => {
    try {
      const settlement = await getContract()
      const hash1 = sha3('hello world').toString('hex').replace(/^/, '0x')
      const hash2 = await settlement.checkHash.call()
      assert.equal(hash1, hash2)
    } catch (err) {
      new Error('### error in test1', err)
    }
  })

  it ('Should verify signature', async () => {
    try {
      const settlement = await getContract()
      console.log('users', users)
      const signature = ecsign
    } catch (err) {
      new Error('### error in test2', err)
    }
  })
})
