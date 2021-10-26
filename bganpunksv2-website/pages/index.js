import { useState, useEffect, useRef } from 'react';
import {ADDRESS, ABI , INFURA_WEBSITE, PROXYABI, PROXYADDRESS} from "../contract/config.js"
import Head from 'next/head'
import Web3 from "web3";

import Bg from "../components/bg"
import Ownership from "../components/ownership"
import About from "../components/about"

export default function Home() {
  const hype_type = {"gif": "HYPED AF (ANIMATED)", "png": "CALM AF (STILL)"}

  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [walletBastardBalance, setWalletBastardBalance] = useState(0)
  const [walletBastardsArray, setWalletBastardsArray] = useState([])
  const [walletBastardsData, setWalletBastardsData] = useState([])
  const [saleStarted, setSaleStarted] = useState(false)


  const [galleryWhich, setGalleryWhich] = useState(7777)
  const [galleryData, setGalleryData] = useState([])


  const [contractWallet, setContractWallet] = useState(null)

  const [adoptPrice, setAdoptPrice] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  
  const [proxyContract, setProxyContract] = useState(null)
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [proxySaleStarted, setProxySaleStarted] = useState(false)
  const [startingTime, setStartingTime] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [halvingInterval, setHalvingInterval] = useState(0)
  const [charities, setCharities] = useState([["name","address"]])
  const [startPrice, setStartPrice] = useState(0)
  const [charitySelection, setCharitySelection] = useState(0)

  


  const [how_many_bastards, set_how_many_bastards] = useState(1)


  const [txStatus, setTxStatus] = useState(null)
  const [txHash, setTxHash] = useState("")
  const [bornBastards, setBornBastards] = useState([])
  const [bornBastardsData, setBornBastardsData] = useState([])

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);


  useEffect( async() => { 
      const web3infura = new Web3(new Web3.providers.HttpProvider(INFURA_WEBSITE));
      const bastardInfuraContract = new web3infura.eth.Contract(ABI, ADDRESS)
      // const total = await bastardInfuraContract.methods.totalSupply().call();

      // const querystring = '' + bastards.join(",")
      // console.log(querystring)

      const res = await fetch('https://api.bastardganpunks.club/totalSupply/', {
        method: 'GET'
      })
  
      const result = await res.json()
      const total = result.totalSupply
      // console.log(total)
      setGalleryWhich(Math.floor(Math.random() * Math.floor(total)))
      setTotalSupply(total)

      signIn()

      // console.log("Total Supply:", totalSupply)
  }, [])


  useEffect( async() => { 
    if (bornBastards.length != 0) { 
    const res = await fetch(`https://api.bastardganpunks.club/multiple/${bornBastards.join(",")}`, {
      method: 'GET'
    })
  

    const result = await res.json()
    // console.log(result)
    setBornBastardsData(result)
  }
    
  }, [bornBastards])

  
  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
      .then(function (accounts) {
        window.web3.eth.net.getNetworkType()
        .then((network) => {console.log(network);if(network != "main"){alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do shit here")} });  
        let wallet = accounts[0]
        setWalletAddress(wallet)
        setSignedIn(true)
        callContractData(wallet)

  })
  .catch(function (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
})
  }

//

  async function signOut() {
    setSignedIn(false)
  }

// 

  async function callContractData(wallet) {
    let balance = await web3.eth.getBalance(wallet);
    setWalletBalance(balance)
    const bastardContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setContractWallet(bastardContract)
    const salebool = await bastardContract.methods.hasSaleStarted().call() 
    setSaleStarted(salebool)
    // console.log("Has sale started:",salebool)
    
    // if(salebool){
    // const price = await bastardContract.methods.calculatePrice().call() 
    // setAdoptPrice(price)
    // }
    const balanceOfWallet = await bastardContract.methods.balanceOf(wallet).call() 
    setWalletBastardBalance(balanceOfWallet)


    const proxyContract = new window.web3.eth.Contract(PROXYABI, PROXYADDRESS)
    setProxyContract(proxyContract)
    
    
    const proxySaleBool = await proxyContract.methods.saleRunning().call() 
    setProxySaleStarted(proxySaleBool)

    if(proxySaleBool){
      const discountedPrice = await proxyContract.methods.calculateDiscountedPrice().call() 
      setDiscountedPrice(discountedPrice)
    }

    const startingTime = await proxyContract.methods.startTime().call() 
    setStartingTime(startingTime)
    const startingPrice = await proxyContract.methods.startprice().call() 
    setStartPrice(startingPrice)
    
    const timeElapsed = await proxyContract.methods.howManySecondsElapsed().call() 
    setTimeElapsed(timeElapsed)

    const halvingInterval = await proxyContract.methods.halvingTimeInterval().call() 
    setHalvingInterval(halvingInterval)

    const charities = await proxyContract.methods.getCharities().call() 
    setCharities(charities)

    const randomCharity = Math.floor(Math.random() * charities.length)

    // console.log(randomCharity)

    // setCharitySelection(13)
    setCharitySelection(randomCharity)

  }
    
 
  async function mintDiscountedBastard(charitySelection, how_many_bastards) {
    if (proxyContract) {
      // console.log(charitySelection,how_many_bastards)

      const mintPrice = await proxyContract.methods.calculateDiscountedPrice().call()
      // console.log(Number(mintPrice))
      const price = Number(mintPrice)  * how_many_bastards + 1000
      // console.log(price)
      // const price = 0
      const gasAmount = await proxyContract.methods.adoptCheaperBASTARD(charitySelection, how_many_bastards).estimateGas({from: walletAddress, value: price})
      console.log("estimated gas",gasAmount)

      console.log("Price:", price, "Charity Selection:", charities[charitySelection][0],"How many bastards:",how_many_bastards)
      console.log({from: walletAddress, value: price})

      var tokenIds = new Set()

      proxyContract.methods
            .adoptCheaperBASTARD(charitySelection, how_many_bastards)
            .send({from: walletAddress, value: price, gas: String(gasAmount)})
            .on('transactionHash', function(hash){
              setTxHash(hash);
              setTxStatus("started");
              console.log("transactionHash", hash)
          })
            .once('confirmation', function(confirmationNumber, receipt){
              const yes = receipt;
              for (const item of Object.entries(yes["events"])) {
                  const tokenId = parseInt(item[1]["raw"]["topics"][3])
                  tokenIds.add(tokenId);
                  // console.log(tokenId)
                }
              console.log(tokenIds)
              setTxStatus("succeeded")
              setBornBastards(Array.from(tokenIds))
              // parseMinted(yes)
          })
          .once('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setTxStatus("failed");

            console.log("error", error)
          });
          
    } else {
        console.log("Wallet not connected")
    }
    
  };
  
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  
const Transaction = () => {
  if (txStatus == null) {
    return(<></>)
  }  else if (txStatus == "started") {
    return(
      <>
      <span className="vw2 charriot text-center font-bold">Transaction <a className="text-red-500 underline" target="_blank" href={"https://etherscan.io/tx/" + txHash}>{txHash}</a> has started!</span>
      <span id="" className="loadingtx vw2 charriot text-center font-bold">YOUR BASTARDS ARE BEING GENERATED BY BASTARD GAN PUNK INCUBATION AUTOMATION UNIT #99999. PLEASE WAIT FOR A BIT, THEY ARE GONNA BE SHOWN BELOW ONCE THEY ARE MINTED. IF YOU DONATED TO ONE OF THE THEGIVINGBLOCK ADDRESSES, FORM FOR TAX DEDUCTION WILL APPEAR.</span>
      
      </>
    )


  } else if (txStatus == "succeeded") {
    return(
      <>
      <span className="vw2 charriot text-center font-bold mb-8">Your transaction <a className="text-red-500 underline" target="_blank" href={"https://etherscan.io/tx/" + txHash}>{txHash}</a> succeeded!</span>
      {/* <span className="vw2 charriot text-center font-bold mb-8">View your bastards on <a className="text-red-500 underline" target="_blank" href={"https://opensea.io/account/"}>Opensea</a> and tweet about them!</span> */}
      
      <span className="vw2 charriot text-center font-bold">Here are the BASTARDS you just adopted. Scroll below to see tax deduction form:</span>
      <div className='flex flex-col'>
      {bornBastardsData.map((item,key) => { return(
      <div className="charriot border-4 m-6 mx-auto" key={key}>
        <div className="flex bg-pinku bg-opacity-100" >
        <a target="_blank" href={`https://bastardganpunks.club/v2/${item.tokenId}`}>
          <img className="" width="120px" height="120px" src={item.image}/>
        </a>
          <div className="flex flex-col justify-center mx-4">
            <p className="text-4xl bg-red-500 text-center text-green-300 bg-red-500">{item.name}</p>
            <div className="flex">

            <a target="_blank" href={"https://opensea.io/assets/" + ADDRESS + "/" + item.tokenId} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-800 font-medium vw1-50 py-2 px-4   ">View on Opensea</a>
            <a target="_blank" href={`https://twitter.com/intent/tweet?text=I%20JUST%20ADOPTED%20BASTARD%20GAN%20PUNK%20V2%20%23${item.tokenId}%20AND%20DONATED%20TO%20${charities[charitySelection][0]}%21%21%21%0Dhttps://opensea.io/assets/${ADDRESS}/${item.tokenId}%0D%0DGO%20GET%20YOURS%20FROM%20%C2%BB%20https://bastardganpunks.club%0D%0D%23bastardganpunks%20%23bastardganpunksv2%20%23bganpunks%20%23bganpunksv2%20%23bganpunkscharity%20%40bganpunks`} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-800 font-medium vw1-50 py-2 px-4   ">Tweet about it!</a>
            </div>
            
          </div>
        </div>
      </div>
      )})}
      </div>
      <div>
      {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div  className="charriot vw2" >
          {copySuccess}<br/>
          <button onClick={copyToClipboard}>CLICK TO COPY THE TX FOR GOOGLE FORM</button> 
          
        </div>
      }
      <form >
        <textarea
        className="vw2 charriot w-full text-center"
          readOnly
          ref={textAreaRef}
          value={txHash}
        />
      </form>
      </div>
      <a className="vw2 charriot w-full text-center" target="_blank" href="https://forms.gle/jmuJ6ykZeaZrFYTb9">If you can't view the embedded form below, use this link:</a>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdid8c4VIXKvZMgdi7_B9Qvvr0UGDX2ix041yfVee-pyUvXJw/viewform?embedded=true" max-width="640" height="800" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>


      </>
    )
  } else if (txStatus == "failed") {
   return(
     <span className="vw2 charriot text-left font-bold my-6 px-4 border-4 border-black">Oh no! For some reason I can't figure out now, your transaction <a className="text-red-500 underline" target="_blank" href={"https://etherscan.io/tx/" + txHash}>{txHash}</a> failed! It may be due to an update on NFT price before your transaction passed, or maybe you rejected the transaction, or something else.</span>
   )
  
  }

}

  
  const incrementGallery = async event => {
    event.preventDefault()
    setGalleryWhich((galleryWhich + 1) % totalSupply)
  }
  const decrementGallery = async event => {
    event.preventDefault()
    if (galleryWhich == 0) {
      setGalleryWhich(totalSupply - 1)
    } else {
      setGalleryWhich(galleryWhich - 1)
    }
  }
  const randomizeGallery = async event => {
    event.preventDefault()
    setGalleryWhich(Math.floor(Math.random() * Math.floor(totalSupply)))
   
  }
  
  useEffect( async() => { 
    const res = await fetch('https://api.bastardganpunks.club/' + galleryWhich, {
      method: 'GET'
    })

    const result = await res.json()
    // console.log(result)
    setGalleryData([result])

    
  }, [galleryWhich])
  
  async function loadWalletBastards() {
    if (contractWallet) {
      const bastards = await contractWallet.methods.tokensOfOwner(walletAddress).call()
      setWalletBastardsArray(bastards)
      console.log("Bastards of " + walletAddress,bastards)
      const querystring = 'https://api.bastardganpunks.club/multiple/' + bastards.join(",")
      console.log(querystring)

      const res = await fetch(querystring, {
        method: 'GET'
      })
  
      const result = await res.json()
      console.log(result)
      setWalletBastardsData(result)

    } else {
        console.log("Wallet not connected")
    }


  }
  return (
    <div >
      <Head>
        <title>BASTARD GAN PUNKS V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Bg />

      

        
      
      <main className="">
          <div className="bg-black bg-opacity-50 flex flex-col">

            <span className="text-center vw6 charriot textstroke text-indigo-500 ">
              BASTARD GAN PUNKS V2 (beta)
            </span>
            <span className="text-center vw5 charriot  textstroke text-pink-500 ">
              (B·G·A·N·P·U·N·K·S V2)
            </span>

            
            <div className="text-white w-11/12 flex flex-col items-center">

          
            </div>

          </div>
          
          

            
            <div className="flex flex-wrap items-center justify-center charriot font-bold mt-8">
            <a href="#home" className=" border-2 border-black border-opacity-100 no-underline bg-yellu bg-opacity-90 text-black hover:text-white hover:bg-black font-medium vw2 py-2 px-4 mx-2 my-2">HOME</a>
            <a href="https://gallery.bastardganpunks.club" target="_blank" className="border-2 border-black border-opacity-100 no-underline bg-red-500 bg-opacity-90 text-white hover:text-white hover:bg-black font-medium vw2 py-2 px-4 mx-2 my-2">BASTARDOUS GALLERY!!!</a>
            <a href="#about" className=" border-2 border-black border-opacity-100 no-underline bg-grunu bg-opacity-90 text-black hover:text-white hover:bg-black font-medium vw2 py-2 px-4 mx-2 my-2">ABOUT BGANPUNKS V2</a>
            <a href="#nftownership" className=" border-2 border-black border-opacity-100 no-underline bg-blau bg-opacity-90 text-white hover:text-black hover:bg-white font-medium vw2 py-2 px-4 mx-2 my-2">NFT OWNERSHIP</a>
            <a href="#orphanage" className=" border-2 border-black border-opacity-100 no-underline bg-pinku bg-opacity-90 hover:text-black hover:bg-white font-bold vw3 py-2 px-2 mx-4 my-2" >ADOPT BASTARDS!</a>
            <a href="/rarity" className=" border-2 border-black border-opacity-100 no-underline bg-red-500 bg-opacity-90 hover:text-black hover:bg-white font-bold vw2 py-2 px-2 mx-4 my-2" >RARITY SANITY SH!T</a>
            <a href="#showbastards" className=" border-2 border-black border-opacity-100 no-underline bg-grunu bg-opacity-90  hover:text-black hover:bg-white font-medium vw2 py-2 px-4 mx-2 my-2 ">SHOW MY LUCKY SEXY BASTARDS</a>
            <a href="https://allbastards.com/" target="_blank" className="border-2 border-black border-opacity-100 no-underline bg-yellu bg-opacity-90 text-black hover:text-white hover:bg-black font-medium vw2 py-2 px-4 mx-2 my-2">ALLBASTARDS.COM (made by Rosco Kalis)</a>
            <a target="_blank" href="http://bganpunks.eth.link" className=" border-2 border-black border-opacity-100 no-underline bg-blau bg-opacity-90 text-white hover:text-black hover:bg-white font-medium vw2 py-2 px-4 mx-2  my-2">BGANPUNKS V1 Website (Legacy Bastards)</a>
            <a href="#socialmedia" className=" border-2 border-black border-opacity-100 no-underline bg-yellow-500 bg-opacity-90 text-white hover:text-black hover:bg-white font-medium vw2 py-2 px-4 mx-2  my-2">SOCIAL MEDIA / MARKETPLACES</a>
            </div>

                
                
          

          
            {/* ABOUT START */}
            <div className="flex flex-col justify-center items-center ">

              <div id="home" className="p-8 mv-8 border-8 bg-pinku bg-opacity-90 pageboxborder border-opacity-100 my-6 flex flex-col w-11/12 ">
                  <span className="flex-wrap  text-center text-blau vw5 charriot mb-4 ">
                    HEY YO VISITOR!
                  </span>
                  
                  <span className=" flex-wrap vw2 charriot mb-4 text-pink-500 font-bold">
                  <span className="text-black">></span> WELCOME TO THE MOST BADA$$ NFT COLLECTIBLE PROJECT EVERRRRRRRR
                  </span>
                  <span className=" flex-wrap vw2 charriot mb-4 text-green-900 font-bold">
                  <span className="text-black">></span> LATE TO THE CRYPTOPUNKS WAVE? IN NEED OF A SURFBOARD? WANNA RIDE THE NFT POINT BREAK?
                  </span>
                  <span className=" flex-wrap vw2 charriot mb-4 text-red-900 font-bold">
                  <span className="text-black">></span> OR ARE YOU JUST BORED WITH BØØMER CRYPTOPUNKS AND LOOKING FOR SOMETHING FRESH AND WAY CØØLER????? (OPINIONS ARE SUBJECTIVE OF COURSE)
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-blau  font-bold">
                  <span className="text-black">></span> NEW YOUNGLING <span className="underline text-red-600">BASTARD GAN PUNKS</span> ARE HERE TO KICK BØØMER PUNKS' ASSES AND DEGENERATE THE SHIT OUTTA NFT WORLD!!!!! 👊👊👊👊👊
                      
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-pink-600  font-bold">
                  <span className="text-black">></span> THERE ARE <span className="underline text-red-600">11305</span> BASTARD GAN PUNKS V2  IN TOTAL.  UNTIL NOW <span className="underline text-red-600">{totalSupply}</span> MINTED AND ADOPTED BY LOVELY PEOPLE. 
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-green-900 font-bold">
                  <span className="text-black">></span> <span className="text-blue-500 underline">847</span> OF THEM ARE "HYPE AS FUCK" BASTARDS (TLDR: ANIMATED GIF IMAGES, 480x480 DIMENSIONS).   
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-red-900 font-bold">
                  <span className="text-black">></span> <span className="text-blue-500">10458</span> OF THEM ARE "CALM AS FUCK" BASTARDS (TLDR: STILL PNG IMAGES, 1024x1024 DIMENSIONS). A MINORITY OF THESE HAVE SOME GLITCHY BACKGROUNDS, WHICH ARE FROM AN UPCOMING COLLECTION WHICH WILL BE ON <a href="https://viv3.com">https://viv3.com/</a> 
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-blau  font-bold">
                  <span className="text-black">></span> EACH BGANPUNKV2 TOKEN DESCRIPTION CAN BE THOUGHT LIKE A FORTUNE COOKIE. I USED <a target="_blank" href="https://openai.com/blog/better-language-models/" className="text-red-500 underline"> GPT-2</a> -  A MACHINE LEARNING ALGORITHM WHICH CAN BE USED FOR LANGUAGE TRAINING TO GENERATE TEXT, THAT I TRAINED WITH THOUSANDS OF PUNK AND EMO SONG LYRICS.   
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-red-500 font-bold">

                  <span className="text-black">></span> THEY ALSO HAVE SUM RANDOMLY ASSIGNED BASTARDNESS ATTRIBUTES. SOME OF THEM ARE VEEEEEEEEERY RAAAAAAAAAARE 
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-pink-500 font-bold">
                  <span className="text-black">></span> HELP THESE BASTARDS FIND A NEW HOME ❤️. ADOPT THEM BEFORE THEY ALL RUN OUT! 👊👊👊👊👊
                      
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4 text-green-900 font-bold">
                  <span className="text-black">></span> THIS PROJECT IS NOT AFFILIATED WITH <a className="text-blue-400 underline"target="_blank" href="https://larvalabs.com/cryptopunks/">LARVA LABS</a>. THANKS TO THEM FOR BEING SUCH AN INSPIRATION TO MANY OF US ❤️. THIS PROJECT IS A HOMAGE TO CRYPTOPUNKS AND A HYPOTHESIS ON HOW BASTARD CHILDREN CAN BE WAY COOLER THAN THEIR BOOMER ANCESTORS.    
                  </span>
                  <span className="flex-wrap vw2 charriot  text-red-800 font-bold">
                  <span className="text-black">></span> ALSO A SHOUTOUT TO <a target="_blank" href="https://linktr.ee/unofficialpunks" className="text-indigo-500 underline">UNOFFICIAL PUNKS</a>. TO BE HONEST, BASTARDS NEVER THOUGHT OF BEING A PART OF A COLLECTIVE, BECAUSE THEY ARE FREE SPIRITS, AND THEY KINDA WOULDN'T LIKE BEING CALLED "UNOFFICIAL" (EVEN THOUGH THEY ARE TECHNICALLY UNOFFICIAL LOL), BECAUSE THEY FEEL LIKE THIS ADJECTIVE DEFINES THEM AS "THE BASTARDS THAT ARE DISOWNED BY THEIR PARENTS", EVEN THOUGH THEY CARRY REAL DEAL CRYPTOPUNK DNA IN THEIR BLOOD. THEY JUST DON'T KNOW WHO THEIR EXACT PARENTS ARE. HOWEVER, THEY RECENTLY RECEIVED A MESSAGE SAYING THAT THEY ARE NOW A PART OF UNOFFICIAL PUNKS. WELL, BEING A STUBBORN BASTARD WON'T HELP ANYONE, SO THEY ARE GLADLY ACCEPTING THIS CALL LOL <br/><br/>

                  KUDOS TO ALL CREATIVES IN UNOFFICIAL PUNKS FOR BEING AWESOME! MAYBE BASTARD GAN PUNKS V3 WILL CARRY THEIR GENES THE NEXT TIME!
                  
                
                  </span>
                
              </div>

              
              <div id="minigallery" className="p-8 mv-8 border-8 bg-red-300 bg-opacity-90 border-opacity-100 my-6  ">
                  
              <p className="text-4xl bg-red-500 charriot text-center text-green-300 bg-red-500 px-4 font-bold">- MINI BASTARD GALLERY -</p>

                  {
                      
                      galleryData.map((item,key) => {

                        return(
                        <div className="flex flex-col charriot border-4 m-6" key={key}>
                          <div className="flex justify-start items-center flex-wrap bg-pinku bg-opacity-100"   style={{width:"480px"}} >
                          
                            <img className="mr-4" width="480px" src={item.image}/>
                            <div className="w-full ">
                              <p className="text-4xl bg-red-500 text-center text-green-300 bg-red-500">{item.name}</p>
                              <p className="text-2xl bg-red-500 text-center text-green-50 bg-green-900">{item.attributes[1].value}</p>
                              <p className="text-2xl bg-red-500 text-center text-green-50 bg-red-900">HYPE TYPE: {item.attributes[0].value}</p>
                              
                              <p className="text-xl p-4 bg-pinku text-pink-800" style={{whiteSpace: "pre-wrap"}}>{item.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col">
                          <a target="_blank" href={"https://opensea.io/assets/" + ADDRESS + "/" + item.tokenId} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-800 font-medium vw2 py-2 px-4   ">View on Opensea</a>
                          <a target="_blank" href={"https://app.rarible.com/token/" + ADDRESS + ":" + item.tokenId} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline  hover:text-white bg-gradient-to-r hover:from-pink-500  hover:to-yellow-500 from-yellow-500 to-yellow-200 font-medium vw2 py-2 px-4   ">View on Rarible</a>
                          </div>
                          <div className="flex">
                          <button  className="charriot w-full text-center border-2 border-black border-opacity-100 no-underline bg-white hover:text-white hover:bg-black hover:from-pink-500 font-medium vw2 py-2 px-4  navbarshadow " onClick={() => incrementGallery(event)}>+</button>
                          <button  className="charriot  w-full text-center border-2 border-black border-opacity-100 no-underline bg-white hover:text-white hover:bg-black hover:from-pink-500 font-medium vw2 py-2 px-4  navbarshadow " onClick={() => decrementGallery(event)}>-</button>
                          <button  className="charriot  w-full text-center border-2 border-black border-opacity-100 no-underline bg-white hover:text-white hover:bg-black hover:from-pink-500 font-medium vw2 py-2 px-4  navbarshadow " onClick={() => randomizeGallery(event)}>RANDOM</button>
                          </div>
                        
                        </div>
                        )
                      })

                  }
                
              </div>
            
                <About />
      
                <Ownership />
              </div>


          {/* <div id="orphanage" className="flex flex-wrap items-center justify-center charriot font-bold mt-8">
              <a href="/proxycharity" className=" border-2 border-black border-opacity-100 no-underline bg-grunu bg-opacity-90 text-black hover:text-white hover:bg-black font-medium vw3 py-2 px-4 mx-2 my-2">(README FIRST) NEW PRICING / DONATIONS</a>
              <a href="#buybastard" className=" border-2 border-black border-opacity-100 no-underline bg-blau bg-opacity-90 text-black hover:text-white hover:bg-black font-medium vw3 py-2 px-4 mx-2 my-2">BUY BASTARD!</a>   
          </div> */}


          <div id="orphanage" className="flex flex-col items-center">

            {/* <div className="md:mr-4 my-8" id="nav-content">
              <div className="flex auth charriot font-bold  justify-center items-center vw2">
                {!signedIn ? <button onClick={signIn} className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Connect Wallet with Metamask</button>
                // <button  className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black font-medium text-lg py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100 navbarshadow">Connect Wallet</button>
                :
                <button onClick={signOut} className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Wallet Connected: {walletAddress}</button>}
              </div>
            </div> */}
        
            <div  className="p-8 mv-8 border-8 bg-grunu  bg-opacity-90 pageboxborder  border-opacity-100 my-6 flex flex-col w-11/12 font-bold">
                  <span className="flex-wrap  vw2 charriot">
                    BASTARD ORPHANAGE IS EMPTY! EVERY BASTARD HAS A WARM HOUSE AND FAMILY NOW!
                  </span>
                  <span className="flex-wrap   vw2 charriot mb-4">
                    GO TO <a className="text-red-500 font-bold underline" target="_blank" href="https://opensea.io/collection/bastard-gan-punks-v2">OPENSEA COLLECTION</a> IF YOU WANNA VIEW AND TRADE BASTARDS!
                  </span>
                  <span className="flex-wrap vw2 charriot mb-4">
                    DURING DISCOUNTED PROXY CONTRACT MINTS, TOTAL OF 234.556 ETH WAS SENT DIRECTLY FOR CHARITIES! YOU CAN <a className="text-red-500 font-bold underline" target="_blank" href="https://docs.google.com/spreadsheets/d/1_yIe-cu-2S4cRGuS2Xa2tJKKQfye4zpnueDd-pMxgmw/edit?usp=sharing">VIEW THE SPREADSHEED</a> TO SEE WHERE THEY ARE SENT.
                  </span>
            </div>     
          </div>




          
          <div id="showbastards" className="flex flex-col items-center">
            <div className="md:mr-4 my-8" id="nav-content">
              <div className="flex auth charriot font-bold  justify-center items-center vw2">
                {!signedIn ? <button onClick={signIn} className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Connect Wallet with Metamask</button>
                // <button  className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black font-medium text-lg py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100 navbarshadow">Connect Wallet</button>
                :
                <button onClick={signOut} className="inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Connected {walletAddress}</button>}
              </div>
            </div>


            <div  className="p-8 text-pink-500 mv-8 border-8 bg-indigo-800  bg-opacity-90 pageboxborder  border-opacity-100 my-6 flex flex-col w-11/12 ">
                  <span className="flex-wrap  text-center vw5 charriot mb-4">
                    SHOW MY SEXY BASTARDS
                  </span>
                
                  <span className="flex-wrap  text-center vw2 charriot mb-4">
                    ----------------------------------------------- 
                  </span>
                <span className="flex-wrap text-center text-yellow-50 vw2 charriot mb-4 font-bold">
                  Your fucking wallet address: {signedIn ? walletAddress : "---"}
                </span>
                <span className="flex-wrap text-center text-green-200 vw2 charriot mb-4 font-bold">
                  You own  {(walletBastardBalance == 0) ? "no bastards. Adopt a unique one above or go find a poor bastard on marketplaces such as Opensea or Rarible. Or the website sucks and failed to load your bastards. If so, don't worry, your NFTs are safu and on chain, eventually you will be able to see them." : walletBastardBalance + " bastards!"}
                </span>

                <button className="shakebutton inline-block vw2 font-bold charriot border-2 border-black bg-white border-opacity-100 no-underline hover:text-black  text-lg py-4 px-4 mx-4 my-6 shadow-lg hover:bg-blue-500 hover:text-gray-100 navbarshadow" onClick={() => loadWalletBastards()}> LOAD MY BASTARDS!!! </button>
                {/* <a className="shakebutton inline-block vw2 font-bold charriot border-2 border-black bg-white border-opacity-100 no-underline hover:text-black  text-lg py-4 px-4 mx-4 my-6 shadow-lg hover:bg-blue-500 hover:text-gray-100 navbarshadow" href="https://opensea.io/account" target="_blank"> LOAD MY BASTARDS!!! </a> */}
                <div className="flex flex-wrap justify-around items-center" id="bastardcards">
                  {/* {console.log(walletBastardsData)} */}
                  {
                    walletBastardsData.map((item,key) => {
                  
                      return(
                      <div className="flex charriot border-4 m-6" key={key}>
                      
                        <div className="flex justify-start items-center flex-wrap "   style={{width:"360px"}} >
          

                          <img  width="360px" src={item.image}/>
                          <div className="w-full ">
                            <p className="text-2xl bg-red-500 text-center text-green-300 bg-red-500">{item.name}</p>
                            <p className="text-2xl bg-red-500 text-center text-green-50 bg-green-900">{item.attributes[1].value}</p>

                            <p className="text-xl bg-red-500 text-center text-green-50 bg-red-900">{item.attributes[0].value}</p>
                            
                            <p className="text-md p-4 bg-pinku text-pink-800" style={{whiteSpace: "pre-wrap"}}>{item.description}</p>
                          </div>


                          <div className="flex flex-col w-full">
                            <a target="_blank" href={"https://opensea.io/assets/" + ADDRESS + "/" + item.tokenId} className=" w-full border-2 border-black text-center border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-800 font-bold text-xl py-2 px-4   ">View on Opensea</a>
                            <a target="_blank" href={"https://app.rarible.com/token/" + ADDRESS + ":" + item.tokenId} className=" w-full  border-2 border-black text-center border-opacity-100 no-underline  hover:text-white bg-gradient-to-r hover:from-pink-500  hover:to-yellow-500 from-yellow-500 to-yellow-200 font-bold text-xl py-2 ">View on Rarible</a>
                          </div>
                        </div>
                      
                      </div>
                      )
                    })

                  }

                </div>
        
            </div>
          

          </div>
      </main>



      <ul id="socialmedia" className="flex items-center justify-center charriot text-base font-bold py-4 my-8">

        <li><a target="_blank" href="https://twitter.com/bganpunks" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-blue-100 to-indigo-200 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow ">Twitter</a></li>
        <li><a target="_blank" href="https://instagram.com/bganpunks" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-blue-100 to-indigo-200 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow ">Instagram</a></li>
        <li><a target="_blank" href="https://discord.gg/qQY9jYX4p7" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow ">Discord</a></li>
        <li><a target="_blank" href="https://etherscan.io/address/0x31385d3520bced94f77aae104b406994d8f2168c" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow " >Etherscan</a></li>
        <li><a target="_blank" href="https://opensea.io/collection/bastard-gan-punks-v2/" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow" >Opensea</a></li>
        <li><a target="_blank" href="https://app.rarible.com/collection/0x31385d3520bced94f77aae104b406994d8f2168c?tab=collectibles" className=" ms: my-2 border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 mx-4 navbarshadow" >Rarible</a></li>

      </ul>
    </div>
  )
}

