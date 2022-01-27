const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("CryptoGame")
  const gameContract = await gameContractFactory.deploy(
    ["Dogon", "Zulu", "Masai"], // Names
    [
      "https://i.imgur.com/Tsu8OTH.jpg", // Images
      "https://i.imgur.com/12kEPRn.jpg",
      "https://i.imgur.com/YUK4Aej.jpg",
    ],
    [450, 500, 400], // HP values
    [100, 150, 125], // Attack damage values
    "Napolean Bonaparte", // Boss name
    "https://upload.wikimedia.org/wikipedia/commons/3/31/David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg", // Boss image
    10000, // Boss hp
    150 // Boss attack damage
  )
  await gameContract.deployed()
  console.log("Contract deployed to:", gameContract.address)

  let txn
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2)
  await txn.wait()

  txn = await gameContract.attackBoss()
  await txn.wait()

  txn = await gameContract.attackBoss()
  await txn.wait()

  // Get the value of the NFT's URI.
  //   let returnedTokenUri = await gameContract.tokenURI(1)
  //   console.log("Token URI:", returnedTokenUri)
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
