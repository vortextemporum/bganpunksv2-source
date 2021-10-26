require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const Bastard = require('./models/Bastard')
const TotalSupply = require('./models/TotalSupply')
require('./database')
const _ = require('underscore')
app.use(cors());



function generateMetadata(bastard) {
    
    let response = {
        tokenId: bastard.tokenId,
        name: bastard.name,
        description: bastard.description,
        image: `https://ipfs.io/ipfs/${bastard.imageIpfs}`,
        // image: `https://berk.mypinata.cloud/ipfs/${bastard.imageIpfs}`,
        imageArweave: `https://arweave.net/${bastard.imageArweave}`,
        external_url: `https://www.bastardganpunks.club/v2/${bastard.tokenId}`,
        attributes: [
            {
                trait_type: "HYPE TYPE",
                value: bastard.hypeType
            },
            {
                trait_type: "BASTARDNESS",
                value: bastard.bastardnessType
            },
            {
                trait_type: "SONG WORD COUNT",
                value: bastard.songWordCount
            }
        ]
    }

        if (bastard.hypeType === "CALM AF (STILL)") {

        response.attributes.push(
            {
                trait_type: "TYPE",
                value: bastard.faceType
            },
            {
                trait_type: "BACKGROUND",
                value: bastard.solidglitchbg
            },
            {
                trait_type: "FACING DIRECTION",
                value: bastard.facingDirection
            },
            {
                trait_type: "BAD HABIT(S)",
                value: bastard.badHabit
            },
        )
        if(bastard.solidglitchbg === "GLITCHY AF") {
            response.attributes.push(
                {
                    trait_type: "GLITCH PATTERN",
                    value: bastard.glitchPattern
                }
            )
        }
        
        if(bastard.calmFaceTraits[0] !== '') {

            bastard.calmFaceTraits.forEach((f) => 
                response.attributes.push(
                    {
                        trait_type: "FACE",
                        value: f
                    }
            
            ))

        }


        response.attributes.push(
            {
                trait_type: "NOSE",
                value: bastard.calmNose
            },
            {
                trait_type: "EAR",
                value: bastard.calmEar
            },
        )


        

    }

    if (bastard.hypeType === "HYPED AF (ANIMATED)") {

        response.attributes.push(
            {
                trait_type: "SPEEDOMETER",
                value: bastard.hypeSpeedometer
            },
            {
                trait_type: "NUM OF FRAMES",
                value: bastard.hypeNumOfFrames.toString()
            },
            {
                trait_type: "HEAD TURNS",
                value: bastard.hypeHeadTurns.toString()
            },
            {
                trait_type: "FLOATY HEAD",
                value: bastard.hypeFloatyHead
            },
            {
                trait_type: "BACKGROUND GLITCH LEVEL",
                value: bastard.hypeBackgroundGlitchLevel
            }, 
            {
                trait_type: "BACKGROUND MOOD",
                value: bastard.hypeBackgroundMood
            },
        )
    }
 
    return response

}


app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'ENDPOINT GUIDE: "/id" returns the metadata of minted bastard, "/all" returns all bastard metadatas, "/allhypes" returns all hyped bastards, "/allcalms" returns all calm bastards, "/multiple/x,y,z,a,b,c" (they should be numbers) returns multiple bastard requests at once, "/totalsupply" returns total amount of bastards minted'
    })
})

app.get('/totalSupply', async (req, res) => {

    try {

        const total = await TotalSupply.findOne({ id: 0 }).lean()


        const response = {
            totalSupply: total.totalSupply
        }

        // return response
  
        res.json(response)
        
    } catch (err) {
        console.error(err, 'API ERROR')
        throw err
    }


})


app.get('/multiple/:ids', async (req, res) => {

    try {
        const input = req.params.ids
        console.log(input)
        const total = await TotalSupply.findOne({ id: 0 }).lean()

        const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
        // console.log(bastards)
        // console.log(input.split(","))
        const params = input.split(",").filter(item => Number(item) != NaN && item < total.totalSupply)
        console.log(params)
        const selectedBastards = []
        params.forEach( (item) => {
            // console.log(item)
            selectedBastards.push(bastards[Number(item)])
        } )

        const allResponse = selectedBastards.map(bastard =>{

            const response = generateMetadata(bastard)

            return response
            
        })
        
        
        res.json(allResponse)
        


    } catch (err) {
        console.error(err, 'API ERROR')
        throw err
    }


})
app.get('/all', async (req, res) => {

    try {

        const total = await TotalSupply.findOne({ id: 0 }).lean()

        const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
        const allResponse = bastards.slice(0,total.totalSupply).map(bastard =>{

            const response = generateMetadata(bastard)

            return response

            
        })
              
        res.json(allResponse)      


    } catch (err) {
        console.error(err, 'API ERROR')
        throw err
    }


})


app.get('/allhypes', async (req, res) => {

    // console.log(total);


        try {


            const total = await TotalSupply.findOne({ id: 0 }).lean()

            const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
            const allResponse = bastards.slice(0,total.totalSupply).filter(bastard => bastard.hypeType === 'HYPED AF (ANIMATED)').map(bastard =>{
               
                const response = generateMetadata(bastard)
    
                return response
                      
            })           
            
            res.json(allResponse)
            

        } catch (err) {
            console.error(err, 'API ERROR')
            throw err
        }


})

app.get('/allcalms', async (req, res) => {

        // const bastard = await Bastard.findOne({ tokenId }).lean();
        // console.log(bastard)

        try {

            const total = await TotalSupply.findOne({ id: 0 }).lean()

            
            const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
            const allResponse = bastards.slice(0,total.totalSupply).filter(bastard => bastard.hypeType === 'CALM AF (STILL)').map(bastard =>{
                
                    const response = generateMetadata(bastard)
        
                    return response
                          
            })
            
            
            res.json(allResponse)
            


        } catch (err) {
            console.error(err, 'API ERROR')
            throw err
        }


})

app.get('/random', async (req, res) => {

    const total = await TotalSupply.findOne({ id: 0 }).lean()

    const tokenId = Math.floor(Math.random() * total.totalSupply).toString()
    console.log(tokenId)

    const bastard = await Bastard.findOne({ tokenId }).lean();
    console.log(bastard)

    try {

        if (!bastard) {
            res.json({ status: false })
            return
        }

        const response = generateMetadata(bastard)

        res.json(response)

    } catch (err) {
        console.error(err, tokenId, 'API ERROR')
        throw err
    }


})

app.get('/randomcalm/:amount', async (req, res) => {
    const amount = req.params.amount

    if (Number(amount) > 0) {

        try {

            const total = await TotalSupply.findOne({ id: 0 }).lean()

            
            const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
            const allResponse = bastards.slice(0,total.totalSupply).filter(bastard => bastard.hypeType === 'CALM AF (STILL)')
            const randomcalms = _.shuffle(allResponse).slice(0,amount);
            const randomStillResponse = randomcalms.map(bastard =>{

                const response = generateMetadata(bastard)

                return response

                
            })

            res.json(randomStillResponse)
            

        } catch (err) {
            console.error(err, 'API ERROR')
            throw err
        }
    } else {

        res.json({ status: "ENTER AN AMOUNT 1 OR BIGGER" })
    }


})
app.get('/randomhyped/:amount', async (req, res) => {
    const amount = req.params.amount

    if (Number(amount) > 0) {

        try {

            const total = await TotalSupply.findOne({ id: 0 }).lean()

            
            const bastards = await Bastard.find({ }).sort({tokenId: 1}).lean();
            const allResponse = bastards.slice(0,total.totalSupply).filter(bastard => bastard.hypeType === 'HYPED AF (ANIMATED)')
            const randomhypes = _.shuffle(allResponse).slice(0,amount);
            const randomHypeResponse = randomhypes.map(bastard =>{

                const response = generateMetadata(bastard)

                return response

                
            })

            res.json(randomHypeResponse)
            

        } catch (err) {
            console.error(err, 'API ERROR')
            throw err
        }
    } else {

        res.json({ status: "ENTER AN AMOUNT 1 OR BIGGER" })
    }


})



app.get('/:id', async (req, res) => {
    const tokenId = req.params.id
    const total = await TotalSupply.findOne({ id: 0 }).lean()
    // console.log(total)

    if (Number(tokenId) < Number(total.totalSupply)) {

        const bastard = await Bastard.findOne({ tokenId }).lean();
        console.log(bastard)

        try {

            if (!bastard) {
                res.json({ status: false })
                return
            }

            const response = generateMetadata(bastard)

            res.json(response)

        } catch (err) {
            console.error(err, tokenId, 'API ERROR')
            throw err
        }

    } else {
        res.json({ status: "YOU ENTERED A WRONG BASTARD ID" })
    }

})



app.listen(8585, () => {
    console.log('App listening on port 8585');
})


// async function bastard0Save() {

//     const bastard = new Bastard({
//         tokenId: 0,
//         name: "BASTARD GAN PUNK V2 #0",
//         description: "UGLY STINKY WHALES\nFATHER PICK ME UP\nI'M OUT OF CONTROL\nBUT MY BONES ARE EMPTY\nHER LIPS ARE EMPTY\nMY HEAD DOES NOT FEEL ALONE\nAND MY HANDS ARE OPEN\n",
//         imageIpfs: "QmXsNHk4aQtoPe33qtK7zYKyGtcz7EMzyX4RJehKy1uPfb",
//         imageArweave: "YTVoLMLRvovynLOR6RfB6q2IRlqHwCSxNu-Yg3X3tm0",
//         hypeType: "HYPED AF (ANIMATED)",
//         bastardnessType: "GOD BASTARD",
//         gifSpeed: 12.5,
//         directionChanges: 4,
//         backgroundGlitchType: 1,
//         floatyHead: "YEAH",
//         backgroundColorType: "TRANSIENT COLOR"
//     })

//     console.log(bastard);
//     bastard.save()

// }

// bastard0Save()