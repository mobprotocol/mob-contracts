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
      const hash = sha3('hello world')
      const msgHash = hashPersonalMessage(hash)
      const settlement = await Settlement.deployed()
      const hash2 = await settlement.verifyMsg.call()
      console.log('hash1', hash.toString('hex'))
      console.log('hash2', hash2)
      const msgHash2 = await settlement.verifyHash.call(hash)
      const msgHash3 = soliditysha3("\x19Ethereum Signed Message:\n32", hash)
      console.log('msgHash', msgHash.toString('hex'))
      console.log('msgHash2', msgHash2)
      console.log('msgHash3', msgHash3)
      // const hash2 = await settlement.checkHash.call()
      // assert.equal(hash1, hash2)

    } catch (err) {
      console.log('### error in test1', err)
    }
  })

  it ('Should verify signature w/ ethereumjs-util', async () => {
    try {
      const settlement = await Settlement.deployed()
      const hash = sha3('hello world')
      console.log('hash check', hash)
      const msgHash = hashPersonalMessage(hash)
      const signature = ecsign(msgHash, new Buffer(users[0].secretKey.substring(2), 'hex'))
      const sig = [
        signature.v,
        signature.r.toString('hex'),
        signature.s.toString('hex')
      ]
      console.log('msgHash', msgHash.toString('hex').replace(/^/, '0x'))
      console.log('sig', sig)
      const address = await settlement.verifySignature.call(hash, sig)
      console.log('signer', users[0].pubAddress)
      console.log('address', address)
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
      const sig = [v, r, s]
      console.log('v', v)
      console.log('r', r)
      console.log('s', s)
      const address = await settlement.verifySignature.call(hash, sig)
      console.log('address', address)
    } catch (err) {
      console.log(err)
    }
  })
})
