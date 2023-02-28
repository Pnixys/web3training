import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

import getConfig from 'next/config'

const {
    publicRuntimeConfig: {ADDRESS}
} = getConfig()

const instance = new web3.eth.Contract(CampaignFactory.abi, ADDRESS);

export default instance;