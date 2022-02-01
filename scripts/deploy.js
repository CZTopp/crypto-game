const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("CryptoGame")
  const gameContract = await gameContractFactory.deploy(
    ["Dogon", "Zulu", "Masai"], // Names
    [
      "QmVA6SkVnQVLbkN9cKS8oiuzBXJSdSHeMX6Fnawd2fJKLu", // Images
      "QmfBqTFWZiwbSUUNUTBqHNS4KMR6jgprQiWQVTEYAeLpG9",
      "QmXjyVgA1tpUzehGaYjWFbcWFc13MKXKuVNyBGkhegaYJQ",
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
