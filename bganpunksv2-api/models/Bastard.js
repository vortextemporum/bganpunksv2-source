const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BastardSchema = Schema({
    tokenId: {type: Number, index:true, unique: true},
    name: String,
    description: String,
    imageIpfs: String,
    imageArweave: String,
    hypeType: String,
    bastardnessType: String,
    songWordCount: Number,
    
    
    faceType: String,
    solidglitchbg: String,
    facingDirection: String,
    badHabit: String,
    glitchPattern: String,
    
    calmFaceTraits: [String],
    calmNose: String,
    calmEar: String,
    
    hypeSpeedometer: String,
    hypeNumOfFrames: Number,
    hypeHeadTurns: Number,
    hypeBackgroundGlitchLevel: String,
    hypeBackgroundMood: String,
    hypeFloatyHead: String,

    
}, {
  timestamps: true
})

console.log("Bastard.js - Yüklendi");

module.exports = mongoose.model('bastards', BastardSchema)

// {
//     "name": "BASTARD GA"UGLY STINKY WHALES\nFATHER PICK ME UP\nI'M OUT OF CONTROL\nBUT MY BONES ARE EMPTY\nHER LIPS ARE EMPTY\nMY HEAD DOES NOT FEEL ALONE\nAND MY HANDS ARE OPEN\n"N PUNK V2 #0",
//     "description": ,
//     "image": "https://ipfs.io/ipfs/QmXsNHk4aQtoPe33qtK7zYKyGtcz7EMzyX4RJehKy1uPfb",
//     "external_url": "https://www.bastardganpunks.club",
//     "attributes": [
//       {
//         "key": "HYPE TYPE",
//         "trait_type": "HYPE TYPE",
//         "value": "HYPED AF (ANIMATED)"
//       },
//       {
//         "key": "BASTARDNESS",
//         "trait_type": "BASTARDNESS",
//         "value": "GOD BASTARD"
//       }
//     ]
//   }