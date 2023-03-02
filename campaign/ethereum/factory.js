import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

import getConfig from 'next/config'

const {
    publicRuntimeConfig: {ADDRESS}
} = getConfig()

const instance = new web3.eth.Contract(CampaignFactory.abi, "0xC97E9925A531FEF36BfA52A4D0c7fE66ebe8f32B");
export default instance;