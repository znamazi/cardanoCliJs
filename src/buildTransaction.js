const cardano = require('./cardano')

const buildTransaction = (tx) => {
  const raw = cardano.transactionBuildRaw(tx)
  const fee = cardano.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
    witnessCount: 1
  })

  tx.txOut[0].value.lovelace -= fee

  return cardano.transactionBuildRaw({ ...tx, fee })
}

module.exports = buildTransaction
