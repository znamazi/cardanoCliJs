const buildTransaction = require('./buildTransaction')
const cardano = require('./cardano')
const getPolicyID = require('./getPolicyID')
const signTransaction = require('./signTransaction')
const submitTransaction = require('./submitTransaction')
const viewTransaction = require('./viewTransaction')

const mintToken = (walletName, ASSET_NAME, metaData, quantity) => {
  // 1. Get the wallet

  const wallet = cardano.wallet(walletName)

  // 2. Define mint script

  const mintScript = {
    keyHash: cardano.addressKeyHash(wallet.name),
    type: 'sig'
  }
  // 3. Create POLICY_ID

  const POLICY_ID = getPolicyID(walletName)

  // 5. Create ASSET_ID

  const ASSET_ID = `${POLICY_ID}.${ASSET_NAME}`

  // 6. Define metadata

  const metadata = {
    721: {
      [POLICY_ID]: {
        [ASSET_NAME]: {
          name: ASSET_NAME,
          ...metaData
        }
      }
    }
  }

  // 7. Define transaction

  const tx = {
    txIn: wallet.balance().utxo,
    txOut: [
      {
        address: wallet.paymentAddr,
        value: { ...wallet.balance().value, [ASSET_ID]: quantity }
      }
    ],

    mint: [{ action: 'mint', quantity, asset: ASSET_ID, script: mintScript }],
    metadata,
    witnessCount: 2
  }

  // console.log(JSON.stringify(tx, undefined, 2))
  // 8. Build transaction

  const raw = buildTransaction(tx)

  // 9. Sign transaction

  const signed = signTransaction(walletName, raw)

  // // 10. View transaction

  // console.log('View Transactions:\n', viewTransaction(signed))

  // 10. Submit transaction

  const txHash = submitTransaction(signed)
  // console.log(txHash)

  return txHash
}

module.exports = mintToken
