const cardano = require('./cardano')

const getPolicyID = (walletName) => {
  // 1. Get the wallet

  const wallet = cardano.wallet(walletName)

  // 2. Define mint script

  const mintScript = {
    keyHash: cardano.addressKeyHash(wallet.name),
    type: 'sig'
  }
  // 3. Create POLICY_ID

  return cardano.transactionPolicyid(mintScript)
}

module.exports = getPolicyID
