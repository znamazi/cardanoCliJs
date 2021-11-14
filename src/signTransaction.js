const cardano = require('./cardano')

const signTransaction = (wallet, tx) => {
  const sender = cardano.wallet(wallet)

  return cardano.transactionSign({
    signingKeys: [sender.payment.skey, sender.payment.skey],
    txBody: tx
  })
}

module.exports = signTransaction
