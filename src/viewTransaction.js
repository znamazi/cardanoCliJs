const cardano = require('./cardano')

const viewTransaction = (signed) => {
  return cardano.transactionView({ txFile: signed })
}

module.exports = viewTransaction
