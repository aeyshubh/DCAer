import { ethers } from "hardhat";
import "dotenv/config";
async function main() {
  const OracleConsumerContract = await ethers.getContractFactory("OracleConsumerContract");

  const [deployer] = await ethers.getSigners();

  
  const consumerSC = "0x43Cde9620DDA68c1dA0318Ec9Db0c25F5b247583";
  const consumer = OracleConsumerContract.attach(consumerSC);
  await Promise.all([
    consumer.deployed(),
  ])

  console.log('Setting attestor...');
  const attestor = "0x28edf70d212367c2107cf37c8447c3757d8df368";
  await consumer.connect(deployer).setAttestor(attestor); // change this to the identity of your ActionOffchainRollup found in your Phala Oracle deployment labeled 'Oracle Endpoint'
  console.log(`🚨NOTE🚨\nMake sure to set the Consumer Contract Address in your Phat Contract 2.0 UI dashboard (https://bricks.phala.network)\n- Go to the 'Configuration' tab and update the 'Client' box\n- Set value to ${consumerSC}`)
  console.log('Done');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
