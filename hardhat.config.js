require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".env").toString()
// const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    hardhat:{
      chainId: 11297108099//palm testnet
    },
    // testnet:{
    //   url: `https://palm-testnet.infura.io/v3/def2a01463c14be2817271cf9063a05a`,
    //   accounts: [privateKey]
    // },
    // mainnet:{
    //   url: `https://palm-mainnet.infura.io/v3/def2a01463c14be2817271cf9063a05a`,
    //   accounts: [privateKey]
    // }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

