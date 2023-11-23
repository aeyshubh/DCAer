import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ProxyAgent, setGlobalDispatcher } from 'undici';

if (process.env.http_proxy || process.env.https_proxy) {
  const proxy = (process.env.http_proxy || process.env.https_proxy)!;
  const proxyAgent = new ProxyAgent(proxy);
  setGlobalDispatcher(proxyAgent);
}

// If not set, it uses the hardhat account 0 private key.
const DEPLOYER_PRIVATE_KEY ="";
// Get a free POLYGONSCAN_API_KEY at https://polygonscan.com.
const POLYGONSCAN_API_KEY = "NHSYWBD5ESFNKXSYN9KPEAVG5Y6YA5A8XV"
const config: HardhatUserConfig = {
  solidity:{
    compilers: [
        {
            version: '0.8.21',
            settings: {
                evmVersion: 'paris'
            }
        }
    ]
},
  networks: {
    polygon:{
      url:"https://polygon-mainnet.g.alchemy.com/v2/",
      accounts:[DEPLOYER_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "NHSYWBD5ESFNKXSYN9KPEAVG5Y6YA5A8XV",
  },
};

export default config;
