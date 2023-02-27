require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonic =  process.env.MNEMONIC;
const endPointUrl = process.env.ENDPOINT_URL;

const provider = new HDWalletProvider(mnemonic,endPointUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const gasBlockLimit = await web3.eth.getBlock('latest').gasLimit;

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: gasBlockLimit, from: accounts[0] });

  console.log(compiledFactory.abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
