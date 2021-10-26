const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TotalSupplySchema = Schema({
    id: {type: Number, index:true, unique: true},
    totalSupply: Number,
}, {
  timestamps: true
})

console.log("TotalSupply.js - Yüklendi");

module.exports = mongoose.model('totalsupply', TotalSupplySchema)