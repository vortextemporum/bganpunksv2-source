require('dotenv').config()
const express = require('express');
const app = express();
const fs = require('fs');
require('./database')
const Bastard = require('./models/Bastard')

let rawdata = fs.readFileSync('accessories.json');
let phase1update = JSON.parse(rawdata);

async function bastard0Save() {

    // // console.log(phase1update2)
    Object.entries(phase1update).forEach(async ([key,value]) => {
        // const [key, value] = entry;
        

        // console.log(key, value)

        let faceTraits = value["FACE_TRAITS"].split(",").sort()
        let nose = (value["NOSE"] !== "") ? value["NOSE"] : "NUTTIN'"
        let ear = (value["EAR"] !== "") ? value["EAR"] : "NUTTIN'"
        // console.log(faceTraits)
        console.log(key, nose)
        // console.log(ear)

        // !(faceTraits == ['']) ? console.log(faceTraits) : console.log("EMORTY")
        // const rhypeSpeedometer = await Bastard.findOneAndUpdate({ tokenId: Number(key) }, { calmFaceTraits: faceTraits });
        // const calmNose = await Bastard.findOneAndUpdate({ tokenId: Number(key) }, { calmNose: nose });
        // const calmEar = await Bastard.findOneAndUpdate({ tokenId: Number(key) }, { calmEar: ear });

        // console.log(hypeBackgroundGlitchLevel)
        // console.log(hypeBackgroundMood)
        // const rhypeSpeedometer = await Bastard.findOneAndUpdate({ tokenId: key }, { glitchPattern: value });

        // console.log(tokenId)
        // console.log(`${key}: ${value["FACE DIRECTION"]}`);
        // console.log(Number(key),value["FACE DIRECTION"])
        // console.log(key, value, phase1update2[key]["SOLID/GLITCH BG"])
        // const rhypeSpeedometer = await Bastard.findOneAndUpdate({ tokenId: tokenId }, { hypeSpeedometer: hypeSpeedometer });
        // const rhypeNumOfFrames = await Bastard.findOneAndUpdate({ tokenId: tokenId }, {hypeNumOfFrames: hypeNumOfFrames});
        // const rhypeHeadTurns = await Bastard.findOneAndUpdate({ tokenId: tokenId }, { hypeHeadTurns: hypeHeadTurns});
        // const rhypeBackgroundGlitchLevel = await Bastard.findOneAndUpdate({ tokenId: tokenId }, { hypeBackgroundGlitchLevel: hypeBackgroundGlitchLevel });
        // const rhypeBackgroundMood = await Bastard.findOneAndUpdate({ tokenId: tokenId }, { hypeBackgroundMood: hypeBackgroundMood });
        // const rhypeFloatyHead = await Bastard.findOneAndUpdate({ tokenId: tokenId }, { hypeFloatyHead: hypeFloatyHead });


        // const rhypeSpeedometer = await Bastard.update({}, {$unset: {hypeBackgroundMood:1}} , {multi: true});


      
      });
    


    // console.log(dicti)
    // let data = JSON.stringify(dicti);
    // fs.writeFileSync('student-2.json', data);

    // const bastard = new Bastard({
    //     tokenId: 0,
    //     name: "BASTARD GAN PUNK V2 #0",
    //     description: "UGLY STINKY WHALES\nFATHER PICK ME UP\nI'M OUT OF CONTROL\nBUT MY BONES ARE EMPTY\nHER LIPS ARE EMPTY\nMY HEAD DOES NOT FEEL ALONE\nAND MY HANDS ARE OPEN\n",
    //     imageIpfs: "QmXsNHk4aQtoPe33qtK7zYKyGtcz7EMzyX4RJehKy1uPfb",
    //     imageArweave: "YTVoLMLRvovynLOR6RfB6q2IRlqHwCSxNu-Yg3X3tm0",
    //     hypeType: "HYPED AF (ANIMATED)",
    //     bastardnessType: "GOD BASTARD",
    //     gifSpeed: 12.5,
    //     directionChanges: 4,
    //     backgroundGlitchType: 1,
    //     floatyHead: "YEAH",
    //     backgroundColorType: "TRANSIENT COLOR"
    // })

    // console.log(bastard);
    // bastard.save()

}

app.listen(4567, () => {
    console.log('App listening on port 4567');
})
bastard0Save()
// test()