require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-etherscan")

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },

    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
            gas: 6000000,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },

    // namedAccounts: {
    //     deployer: {
    //         default: 0,
    //      }
    //  }
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
}
