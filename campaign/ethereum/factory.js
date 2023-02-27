import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'
require('dotenv').config();

export default instance = new web3.eth.Contract(JSON.parse(CampaignFactory.abi), process.env.ADDRESS);