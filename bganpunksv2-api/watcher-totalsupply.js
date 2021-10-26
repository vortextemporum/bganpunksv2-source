require('dotenv').config()
const Web3 = require('web3');
const INFURA_API = process.env.INFURA_API
const ADDRESS = '0x31385d3520bced94f77aae104b406994d8f2168c'
const ABI = [{ "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const cron = require('node-cron');
const express = require('express');
const app = express();
const cors = require('cors');
const TotalSupply = require('./models/TotalSupply')
require('./database')
app.use(cors());

const httpProvider = new Web3.providers.HttpProvider(INFURA_API)
const httpInfura = new Web3(httpProvider)
const bastardContract = new httpInfura.eth.Contract(ABI, ADDRESS)


cron.schedule('*/5 * * * * *', async () => {

    try {
        const totalSupply = await bastardContract.methods.totalSupply().call()

        const currentTotalSupply = await TotalSupply.findOneAndUpdate({ id: 0 }, { totalSupply: totalSupply });
        console.log(currentTotalSupply)
      
      } catch (err) {
        console.error(err)
      }

});


async function supplySave() {

  const supply = new TotalSupply({
    id: 0,
    totalSupply: 123
  })

  console.log(supply);
  supply.save()

}
// supplySave()
// main()
app.listen(1234, () => {
  console.log('App listening on port 1234');
})
