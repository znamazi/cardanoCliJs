// create get-balance.js
const cardano = require('./cardano')

const getBalance = (walletName) => {
  const sender = cardano.wallet(walletName)
  return sender.balance()
}

module.exports = getBalance
