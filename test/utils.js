const Settlement = artifacts.require('./Settlement')

module.exports = {
  getContract: () => {
    return new Promise((res, rej) => {
      Settlement.deployed()
      .then(inst => res(inst))
      .catch(err => rej(err))
    })
  }
}
