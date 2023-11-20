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
const DEPLOYER_PRIVATE_KEY ="1b4ef2764fb0b762512aca9558a76db21db34c80b549e782e4ef8018a831dce2";
// Get a free POLYGONSCAN_API_KEY at https://polygonscan.com.
const POLYGONSCAN_API_KEY = "NHSYWBD5ESFNKXSYN9KPEAVG5Y6YA5A8XV"
const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    mumbai: {
      // If not set, you can get your own Alchemy API key at https://dashboard.alchemyapi.io or https://infura.io
      url:"https://rpc.ankr.com/polygon_mumbai",
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "NHSYWBD5ESFNKXSYN9KPEAVG5Y6YA5A8XV",
  },
};

export default config;
