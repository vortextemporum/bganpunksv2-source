import {useState} from "react"

export default function About({desctest}) {

    const [desctext, setDescText] = useState("");
    
    const RandomizeText = async event => {
      event.preventDefault()
      
      const res = await fetch('https://api.bastardganpunks.club/random', {
        method: 'GET'
      })
      
      const result = await res.json()
      // console.log(result)
      setDescText(result.description)
      // result.user => 'Ada Lovelace'
    }

    // console.log(desctest)
    return(
        <>
        <div id="about" className="p-8 mv-8 border-8 bg-yellu bg-opacity-90 pageboxborder border-opacity-100 my-6 flex flex-col w-11/12 mx-auto ">
              <span className="flex-wrap  text-center text-blau vw5 charriot mb-4 ">
                ABOUT
              </span>
             
              <span className="flex-wrap  text-center vw2 charriot mb-4 text-red-500">
                ----------------------------------------------- 
              </span>
              <span className="flex-wrap vw2 charriot mb-4 ">
                 BASTARD GAN PUNKS project has started as a hobby NFT project of me (<a target="_blank" href="https://twitter.com/berkozdemir" className="text-blue-500">@berkozdemir</a>). There were two main reasons for me to initiate this project:
              </span>
              <span className="flex-wrap vw2 charriot mb-4 ml-6 ">
                <span className="text-pink-600">-</span> to practice Generative Adversarial Networks (GANs) with my own dataset, as part of my artistic research at Masters programme at <a target="blank" href="http://interfaculty.nl/" className="text-pink-600">ArtScience Interfaculty</a>
              </span>
              <span className="flex-wrap vw2 charriot mb-4 ml-6">
              <span className="text-pink-600">-</span> even though Cryptopunks were way cheaper last year than now, I had no money to buy any, so I challenged myself to make "interesting enough" remixes of them. So I came up with the bastards concept. Bastard GAN Punks carry the genes of original Cryptopunk, but they carry many different traits from several punks, so they don't know who their actual parents are. And you know, sometimes BASTARDS are much cooler than their parents. Look at Jon Snow for example lol
              </span>
              <span className="flex-wrap  text-center vw2 charriot mb-4 text-red-500">
                ----------------------------------------------- 
              </span>
              <span className="flex-wrap  text-pink-600  vw2 charriot mb-4 bg-black bg-opacity-90 p-6">
              First iteration of Bastard Gan Punks were trained on 10000 original Cryptopunks and gave birth to many weirdo adorable motherfuckin' bastards.
              The process worked very well and I was so happy with getting weird interesting results. 
              <br/> However, since some traits of Cryptopunks exist on just a few ones (like Alien, Ape, Zombie, or Beanie etc); most of the rare traits were lost during the model training.  
              </span>
              <span className="flex-wrap  text-center vw2 charriot mb-4 text-red-500">
                ----------------------------------------------- 
              </span>
              <div className="flex items-center">
              <div className="flex flex-col items-start charriot mr-4">
                <span className="flex-wrap    vw3 charriot  ">
                  View more about the VERSION 1 BASTARDS on:
                </span>
                
                <a target="_blank" href="http://bganpunks.eth.link" className=" ms: my-2 w-full text-center border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4  navbarshadow ">Website - http://bganpunks.eth.link</a>
                <a href="https://opensea.io/collection/bastard-gan-punks/" className=" ms: my-2 w-full text-center border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4 " >Opensea</a>
                <a href="https://app.rarible.com/bganpunks" className=" ms: my-2 w-full text-center border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4  navbarshadow " >Rarible</a>
                <a href="https://etherscan.io/token/0x9126b817ccca682beaa9f4eae734948ee1166af1" className=" ms: my-2 w-full text-center border-2 border-black border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-blue-100 to-indigo-200 hover:from-pink-500 hover:to-yellow-500 font-medium vw2 py-2 px-4  navbarshadow ">Etherscan</a>
              </div>
              <video className="w-1/2 h-1/2" autoPlay="autoplay" loop="loop" muted>
                <source src="https://gateway.pinata.cloud/ipfs/QmarGHk9toHiLKTV7rz1zqPhMiNag8s9nfCDhR6oNQ6qVD/static/media/Lootboxcube.e00ba972.mp4" type="video/mp4" />
                
                Your browser does not support the video tag.
              </video>

              </div>
          </div>
          
          <div className="p-8 mv-8 border-8 bg-orangu bg-opacity-90 pageboxborder border-opacity-100 my-6 flex flex-col w-11/12 mx-auto">
            <span className="flex-wrap  text-center vw5 charriot mb-4">
                DIFFERENCE OF BGANPUNKS V2
              </span>
             
              <span className="flex-wrap  text-center vw2 charriot mb-4">
                ----------------------------------------------- 
            </span>
            <div className="flex flex-wrap">
              <img src="/traits.gif" className="w-1/2"></img>
              <div className="w-1/2 flex flex-col justify-around">
                <span className="text-left flex-wrap vw1-50 font-bold charriot mb-4">
                   > For BGANPUNKS V2, I chopped all Cryptopunks attributes, made cross-gender copies of ones which were made for only one gender (BGANPUNKS ARE QUEER!), categorised them in different folders (Hairs/Heads, Eyes, Glasses, Smokes etc.), and wrote a script to make all possible combinations of those traits. I also added skin and accessory color randomization + a couple of custom traits I've drawn myself. To be honest it was a painful and shitty process because I had to do all the cuts by hand and had to optimize the script via trial and error maybe like hundreds of times, to not to make unnecessary 1000000 images at the end which would take a lifetime to train the model with my shitty GPU. 
                </span> 
              </div>
             </div>
      
             <span className="text-left my-6 flex-wrap vw1-75 font-bold charriot mb-4">
                    > Also for each BASTARD V2 to have their own story like fortune cookie, I fetched all Punk & Emo song lyrics from <a target="_blank" href="http://www.plyrics.com/" className="text-red-500 font-bold underline">this website</a> and trained them with GPT-2, which resulted in very weird texts which you will see in NFT description. In BGANPUNKS V1, there were lots of people who loved my humorous approach to NFT descriptions (I was writing goofy and edgy stuff), this time I trusted GPUs on this task.
              </span>
             <span className="text-left my-6 flex-wrap vw1-75 font-bold charriot mb-4">
                   > Disclaimer: I haven't been in process of selecting the texts and generating them. So if you encounter a text that is saying very very bad things (like hardcore racism, discrimination on an identity, promoting violence etc), tell me and I am gonna replace them with another freshly generated text. For instance, when I was checking some of the texts generated, I found out that some of them contained Nazi flattery (WTF???). I have no idea how it happened. So I had to find each of them and replace the word nazi with something else. I wonder if you will be able to find the ones i changed haha
              </span>
             <span className="text-left my-6 flex-wrap vw1-75 font-bold charriot mb-4">
                   > Yeah, I put a button below. When you click on it, one of the BASTARD fortune cookie will be revealed randomly. Each text you will see here will be in one of bastards' metadata description.
              </span>
        
              <button  className="charriot ms: my-2 w-full text-center border-2 border-black border-opacity-100 no-underline bg-white hover:text-white hover:bg-black hover:from-pink-500 font-medium vw2 py-2 px-4  navbarshadow " onClick={() => RandomizeText(event)}>CLICK THIS BUTTON TO VIEW A RANDOM LYRICS FROM MINTED BASTARDS</button>
             <span className="text-left my-6 flex-wrap vw2 text-center font-bold charriot mb-4 item-center">
                      <div className="mx-auto" style={{whiteSpace: "pre-wrap"}}>{desctext}</div>
              </span>

          </div>
          </>






    )


}