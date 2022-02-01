import React, { useEffect, useState } from "react"
import "./styles/App.css"
import SelectCharacter from "./Components/SelectCharacter/SelectCharacter"
import Arena from "./Components/Arena/Arena"
import LoadingIndicator from "./Components/LoadingIndicator"
import { CONTRACT_ADDRESS, transformCharacterData } from "./constants"
import cyrptoGame from "./utils/CryptoGame.json"
import twitterLogo from "./assets/twitter-logo.svg"
import { ethers } from "ethers"

// Constants
const TWITTER_HANDLE = "_buildspace"
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null)
  const [characterNFT, setCharacterNFT] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    checkIfWalletIsConnected()
    checkNetwork()
  }, [])

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log("Checking for Character NFT on address:", currentAccount)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        cyrptoGame.abi,
        signer
      )

      const txn = await gameContract.checkIfUserHasNFT()
      if (txn.name) {
        console.log("User has character NFT")
        setCharacterNFT(transformCharacterData(txn))
      } else {
        console.log("No character NFT found")
      }
      setIsLoading(false)
    }

    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount)
      fetchNFTMetadata()
    }
  }, [currentAccount])

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log("Make sure you have MetaMask!")
        setIsLoading(false)
        return
      } else {
        console.log("We have the ethereum object", ethereum)

        const accounts = await ethereum.request({ method: "eth_accounts" })

        if (accounts.length !== 0) {
          const account = accounts[0]
          console.log("Found an authorized account:", account)
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  // Render Methods
  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />
    }
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Piledriver.gif"
            alt="Stick Man Wrestle Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      )
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      )
    }
  }

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert("Get MetaMask!")
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }
  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "4") {
        alert("Please connect to Rinkeby!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mintHandler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      cyrptoGame.abi,
      signer
    )
    await gameContract.mintCharacterNFT(2)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Colony Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the MotherLandVerse!</p>
          {renderContent()}
          {/* <button onClick={mintHandler}>Mint</button> */}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}

export default App
