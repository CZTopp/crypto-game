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

  let txn
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2)
  await txn.wait()

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1)
  console.log("Token URI:", returnedTokenUri)
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
