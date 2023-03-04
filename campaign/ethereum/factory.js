import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

import getConfig from 'next/config'

const {
    publicRuntimeConfig: {ADDRESS}
} = getConfig()

const instance = new web3.eth.Contract(CampaignFactory.abi, "0x2B4715343c5ff8AF69caFF631BCD40745E2F510b");
export default instance;