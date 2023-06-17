
const hre = require("hardhat");

async function main() {

  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy();

  await nftmarketplace.deployed();

  console.log(
    `NFTMARKETPLACE deployed to ${nftmarketplace.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
