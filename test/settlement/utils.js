const soliditySha3 = require('solidity-sha3').default
const { hashPersonalMessage, sha3, ecsign} = require('ethereumjs-util')
const crypto = require('crypto')

const calcPermID = async (address1, address2) => {
  try {
    const adrs1 = address1.slice(2)
    const adrs2 = address2.slice(2)
    const order = adrs1.localeCompare(adrs2)
    const concacted = (order === 0 ? `${adrs1}${adrs2}` : `${adrs2}${adrs1}`)
    return soliditySha3(concacted)
  } catch (err) {
    console.log('### error in calcPermID', err)
  }
}

const signOrder = async (order, pk) => {
  try {
    const orderHash = sha3(JSON.stringify(order))
    const msgHash = hashPersonalMessage(orderHash)
    const signature = ecsign(msgHash, new Buffer(pk.slice(2), 'hex'))
    const sig = [
      signature.v,
      '0x' + signature.r.toString('hex'),
      '0x' + signature.s.toString('hex')
    ]
    return sig
  } catch (err) {
    console.log('### error in singOrder', err)
  }
}

const generateSalt = async () => {
  return '0x' + crypto.randomBytes(32).toString('hex')
}

module.exports = {
  calcPermID,
  signOrder,
  generateSalt
}
