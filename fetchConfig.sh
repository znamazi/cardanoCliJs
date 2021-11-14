
# Copy the Cardano node genesis latest build number from IOHK hydra website

#   https://hydra.iohk.io/build/5367762/download/1/index.html

NODE_BUILD_NUM=5367762

wget -N https://hydra.iohk.io/build/${NODE_BUILD_NUM}/download/1/testnet-shelley-genesis.json


#  run :
#  chmod +x fetchConfig.sh
#  ./fetchConfig.sh
