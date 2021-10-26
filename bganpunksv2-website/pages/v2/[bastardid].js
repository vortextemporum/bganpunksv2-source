import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export async function getServerSideProps({
  params,
}) {
  
  console.log("params",params)
  let item = await (
    await fetch(
      `https://api.bastardganpunks.club/${params.bastardid}`
    )
  ).json();

  return {
    props: { item },
  };
}


export default function Post({item}) {
  // console.log(item)
  return (

  <>
  <Head>
    
    <meta property="og:title" content={item.name} key="ogtitle" />
    <meta property="og:description" content={item.description} key="ogdesc" />
    <meta property="og:type" content="website" key="ogtype" />
    <meta property="og:url" content={`https://bastardganpunks.club/v2/${item.tokenId}`} key="ogurl"/>
    <meta property="og:image" content={item.image} key="ogimage"/>
    <meta property="og:site_name" content="https://bastardganpunks.club/" key="ogsitename" />

    <meta name="twitter:card" content="summary_large_image" key="twcard"/>
    <meta property="twitter:domain" content="bastardganpunks.club" key="twdomain" />
    <meta property="twitter:url" content={`https://bastardganpunks.club/v2/${item.tokenId}`} key="twurl" />
    <meta name="twitter:title" content={item.name} key="twtitle" />
    <meta name="twitter:description" content={item.description} key="twdesc" />
    <meta name="twitter:image" content={item.image} key="twimage" />

    <title>{item.name}</title>
    
  </Head>

  <div className="p-8  bg-yellow-500 w-screen flex justify-center items-center">
      <div className="flex flex-col m-4 border-8 bg-pinku border-blue-500 text-white w-full charriot">

        <p className="text-center vw4 text-black py-4" >{item.name}</p>
        <div className="flex justify-around items-center flex-wrap py-6 px-6">
          <div className="flex flex-col border-4">
            <img className="my-auto" width="360px" height="360px" src={item.image}></img>       
            <a className="bg-blau  text-xl text-white text-center w-full py-2" target="_blank" href={item.image}>Show Image on IPFS</a>       
            <a className="bg-yellu text-xl text-black text-center w-full py-2" target="_blank" href={item.imageArweave}>Show Image on Arweave</a>       
          </div>

          <div className="flex flex-col my-6">

            <div className="text-black p-8 border-4 border-black">
              <span className="text-2xl font-bold" style={{whiteSpace: "pre-wrap"}}>{item.description}</span>  
            </div>

            {/* <div>{bastardData.attributes[0]} </div> */}
            <div className="flex flex-col">

              <span className="text-black font-bold text-xl py-2">HYPE TYPE: {item.attributes[0]["value"]}</span>
              <span className="text-black font-bold text-xl py-2">BASTARDNESS: {item.attributes[1]["value"]}</span>
              <span className="text-black font-bold text-xl py-2">SONG WORD LENGTH: {item.attributes[2]["value"]}</span>
              {
                (item.attributes[0]["value"] == "CALM AF (STILL)")? 
                <div className="flex flex-col">
                <span className="text-black font-bold text-xl py-2">BASTARD TYPE: {item.attributes[3]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">BACKGROUND: {item.attributes[4]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">FACING DIRECTION: {item.attributes[5]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">BAD HABIT(S): {item.attributes[6]["value"]}</span>
                {
                  (item.attributes[4]["value"] === "GLITCHY AF")?
                  <span className="text-black font-bold text-xl py-2">GLITCH PATTERN: {item.attributes[7]["value"]}</span> : <></>
                }
                </div> : 
                <div className="flex flex-col">
                <span className="text-black font-bold text-xl py-2">SPEEDOMETER: {item.attributes[3]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">NUM OF FRAMES: {item.attributes[4]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">HEAD TURNS: {item.attributes[5]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">FLOATY HEAD: {item.attributes[6]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">BACKGROUND GLITCH LEVEL: {item.attributes[7]["value"]}</span>
                <span className="text-black font-bold text-xl py-2">BACKGROUND MOOD: {item.attributes[8]["value"]}</span>
                </div>
              }

              
            </div>

            <a target="_blank" href={"https://opensea.io/assets/0x31385d3520bced94f77aae104b406994d8f2168c" +  "/" + item.tokenId} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline hover:text-white bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-800 font-medium text-2xl py-2 px-4   ">View on Opensea</a>
            <a target="_blank" href={"https://app.rarible.com/token/0x31385d3520bced94f77aae104b406994d8f2168c" + ":" + item.tokenId} className=" ms:  border-2 border-black text-center border-opacity-100 no-underline  hover:text-white bg-gradient-to-r hover:from-pink-500  hover:to-yellow-500 from-yellow-500 to-yellow-200 font-medium text-2xl py-2 px-4   ">View on Rarible</a>

          </div>
        </div>     
                    
      </div>

  </div>
  </>
    )
}

// Post.getInitialProps = async (ctx) => {
//   console.log(ctx)
     
//   // const router = useRouter()
//   // // console.log()
//   // const {bastardid} = router.query

//   // console.log(bastardid)
//   // const url = 'https://api.bastardganpunks.club/' + bastardid
//   // console.log(url)
//   // const res = await fetch(url, {
//   //   method: 'GET'
//   // })

//   // const result = await res.json()
//   // console.log(result)
//   return {name:"yes",description:"ues"}



// }

// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`https://api.bastardganpunks.club/${params.bastardid}`)
//   const post = await res.json()

//   // Pass post data to the page via props
//   return {
//     props: { post },
//     // Re-generate the post at most once per second
//     // if a request comes in
//     revalidate: 1,
//   }
// }