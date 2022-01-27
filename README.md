# crypto-game

# Steps to reproduce project

## setup

mkdir crypto-game
cd crypto-game
npm init -y
npm install --save-dev hardhat
npx hardhat

- select defaults

### dependencies

npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npm install @openzeppelin/contracts

#### test setup

npx hardhat run scripts/sample-script.js

## remove starter files

sample-test.js under test. Also, delete sample-script.js under scripts. Then, delete Greeter.sol under contracts.
Just the Files not the Folders!
