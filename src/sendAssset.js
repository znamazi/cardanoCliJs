const buildTransaction = require('./buildTransaction')
const cardano = require('./cardano')
const getPolicyID = require('./getPolicyID')
const signTransaction = require('./signTransaction')
const submitTransaction = require('./submitTransaction')

const sendAsset = (walletName, receiver, minAda, tokenName, amount) => {
  // 1. get the wallet

  const sender = cardano.wallet(walletName)

  // 2. POLICY_ID

  const POLICY_ID = getPolicyID(walletName)

  // 3. define the transaction

  let txOutSender = sender.balance().value
  const ASSET_ID = POLICY_ID + '.' + tokenName
  txOutSender[ASSET_ID] = txOutSender[ASSET_ID] - amount
  txOutSender.lovelace = txOutSender.lovelace - cardano.toLovelace(minAda)

  const txInfo = {
    txIn: cardano.queryUtxo(sender.paymentAddr),
    txOut: [
      {
        address: sender.paymentAddr,
        value: {
          ...txOutSender
        }
      },
      {
        address: receiver,
        value: {
          lovelace: cardano.toLovelace(minAda),
          [`${POLICY_ID}.${tokenName}`]: amount
        }
      }
    ]
  }

  // console.log(JSON.stringify(txInfo, undefined, 2))
  // // 3. build the transaction

  // const raw = cardano.transactionBuildRaw(txInfo)

  // // 4. calculate the fee

  // const fee = cardano.transactionCalculateMinFee({
  //   ...txInfo,
  //   txBody: raw,
  //   witnessCount: 1
  // })
  // console.log(fee)

  // // 5. pay the fee by subtracting it from the sender utxo

  // txInfo.txOut[0].value.lovelace -= fee

  // 6. build the final transaction

  const tx = buildTransaction(txInfo)

  // 7. sign the transaction

  const txSigned = signTransaction(walletName, tx)

  // 8. submit the transaction

  const txHash = submitTransaction(txSigned)

  console.log(txHash)
}

module.exports = sendAsset
