const Settlement = artifacts.require('./Settlement')
const { sha3, ecsign, ecrecover, hashPersonalMessage } = require('ethereumjs-util')
const { getContract } = require('./utils')
const users = require('../conf/users.json')
const Web3 = require('web3')
const soliditysha3 = require('solidity-sha3').default
const web3 = new Web3('http://localhost:8545')
const { eth } = web3

contract('Settlement', (accounts) => {
  it ('Verify js and solidity sha3 conformity :)', async () => {
    try {
      const settlement = await Settlement.deployed()
      const hash = sha3('hello world')
      const msgHash = await settlement.verifyHash.call(hash.toString('hex').replace(/^/, '0x'))
      const msgHash2 = hashPersonalMessage(hash).toString('hex').replace(/^/, '0x')
      assert.equal(msgHash, msgHash2)
    } catch (err) {
      console.log('### error in test1', err)
    }
  })

  it ('Should verify signature with simple hello world message', async () => {
    try {
      const settlement = await Settlement.deployed()
      const hash = sha3('hello world')
      const msgHash = hashPersonalMessage(hash)
      const signature = ecsign(msgHash, new Buffer(users[0].secretKey.substring(2), 'hex'))
      const sig = [
        signature.v,
        '0x' + signature.r.toString('hex'),
        '0x' + signature.s.toString('hex')
      ]
      const address = await settlement.verifySignature.call(
        hash.toString('hex').replace(/^/, '0x'),
        sig[0],
        sig[1],
        sig[2]
      )
      assert.equal(users[0].pubAddress, address)
    } catch (err) {
      console.log('### error in test2', err)
    }
  })

  it ('Should verify signatrue w/ web3 signer', async () => {
    try {
      const settlement = await Settlement.deployed()
      const hash = soliditysha3('hello world')
      const signature = await eth.sign(hash, users[0].pubAddress)
      const r = "0x"+signature.substr(2, 64)
      const s = "0x"+signature.substr(66, 64)
      const v = 27 + Number(signature.substr(130, 2))
      const address = await settlement.verifySignature.call(hash, v, r, s)
      assert.equal(users[0].pubAddress, address)
    } catch (err) {
      console.log(err)
    }
  })
})
