const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("CryptoGame")
  const gameContract = await gameContractFactory.deploy(
    ["Dogon", "Zulu", "Masai"], // Names
    [
      "https://imgur.com/a/JKyHGNN", // Images
      "https://imgur.com/a/VdFcsMT",
      "https://imgur.com/a/EKryMHq",
    ],
    [450, 500, 400], // HP values
    [100, 150, 125] // Attack damage values
  )
  await gameContract.deployed()
  console.log("Contract deployed to:", gameContract.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
