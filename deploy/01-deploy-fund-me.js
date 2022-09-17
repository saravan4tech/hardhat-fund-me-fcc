//import
// no main fun
// no calling func

// const { hre} = require("ethers/lib/utils")
// const { network } = require("hardhat")

// function deployFunc(hre) {
//     console.log("Hi!")
// hre.getNamedAccounts()
// hre.deployments()
// }
// module.exports.default = deployFunc

//instead create anonymys func

// module.exports = async (hre) => {
// const { getNamedAccounts, deployments } = hre
//hre.getNamedAccounts
//hre.deployments
//}

//can be written in single line as below

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    //need 2 func deploy & log
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //if chainId is x use address Y
    //if chainId is Z use address A

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //if the contact doesnt exist , we deploy a minimal version
    //of our local testing

    //when going for localhost or hardhat n/w, we wan to use a mock

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }

    log(
        "----------------------------------------------------------------------"
    )
}
module.exports.tags = ["all", "fundme"]
