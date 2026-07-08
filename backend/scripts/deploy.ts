import { ethers } from "hardhat";
import { MultiSigNFT } from "../contracts/MultiSigNFT.sol";

async function main() {
  try {
    console.log("Deploying MultiSigNFT contract...");

    // Get the ContractFactory for MultiSigNFT
    const MultiSigNFTFactory = await ethers.getContractFactory("MultiSigNFT");

    // Deploy the contract with constructor arguments
    const multiSigNFT = await MultiSigNFTFactory.deploy("MultiSigNFT", "MSNFT") as MultiSigNFT;

    // Wait for the contract to be deployed
    await multiSigNFT.deployed();

    console.log("MultiSigNFT deployed to:", multiSigNFT.address);

    // Optionally, you can perform additional setup here, such as granting roles
    const [deployer] = await ethers.getSigners();
    
    // Grant MINTER_ROLE to the deployer
    const MINTER_ROLE = await multiSigNFT.MINTER_ROLE();
    await multiSigNFT.grantRole(MINTER_ROLE, deployer.address);
    console.log("MINTER_ROLE granted to:", deployer.address);

    // Grant VALIDATOR_ROLE to the deployer
    const VALIDATOR_ROLE = await multiSigNFT.VALIDATOR_ROLE();
    await multiSigNFT.grantRole(VALIDATOR_ROLE, deployer.address);
    console.log("VALIDATOR_ROLE granted to:", deployer.address);

    console.log("Deployment and initial setup completed successfully!");
  } catch (error) {
    console.error("Error deploying MultiSigNFT contract:", error);
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

