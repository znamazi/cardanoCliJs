const cardano = require('./cardano')

const submitTransaction = (signed) => {
  return cardano.transactionSubmit(signed)
}

module.exports = submitTransaction
