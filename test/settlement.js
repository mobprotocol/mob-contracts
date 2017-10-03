const Settlement = artifacts.require('./Settlement')
const { sha3, ecsign } = require('ethereumjs-util')

contract('Settlement', (accounts) => {
  it ('Should verify signer', () => {
    const hash = sha3('hello world').toString('hex').replace(/^/, '0x')
    console.log('hash', hash)
  })
})
