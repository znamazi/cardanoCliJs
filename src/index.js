const getBalance = require('./getBalance')
const mintToken = require('./mint')
const sendAsset = require('./sendAssset')

const WALLET_NAME = 'MUON'
const RECEIVER =
  'addr_test1qp7l74uk33qf9neraukwz3dfsqsg2nz6a5ayygx488r37uz7dgyquhxpddal3v93wjuzjy8k0ftn7v9aerdf6nh5f8jqsy0c6r'

const ASSET_NAME = 'Muon'
const AMOUNT_MINT = 1000
const AMOUNT_SEND = 10
const MIN_ADA = 15

// Frist time run createWallet and fund it

let balance = getBalance(WALLET_NAME)

console.log('Balance:', JSON.stringify(balance, undefined, 2))

// run mint and send seprately

const mintTx = mintToken(
  WALLET_NAME,
  ASSET_NAME,
  {
    image: 'ipfs://QmYGmAJiSKNALdPvgfRxGTLDN6hxycrVRzXTiAgB9Tcc8E',
    description: ASSET_NAME,
    type: 'image/svg',
    src: 'ipfs://QmYGmAJiSKNALdPvgfRxGTLDN6hxycrVRzXTiAgB9Tcc8E',
    // other properties of your choice
    authors: [ASSET_NAME, 'MuonWallet']
  },
  AMOUNT_MINT
)

console.log('Mint Transaction Hash:\n', mintTx)

sendAsset(WALLET_NAME, RECEIVER, MIN_ADA, ASSET_NAME, AMOUNT_SEND)
