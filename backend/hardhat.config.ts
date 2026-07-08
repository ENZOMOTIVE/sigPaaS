require("@nomiclabs/hardhat-ethers");
require("dotenv").config();


module.exports = {
  solidity: "0.8.20",
  networks: {
    opencampus: {
      url: 'https://open-campus-codex-sepolia.drpc.org',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

