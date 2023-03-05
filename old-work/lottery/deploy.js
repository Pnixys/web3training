const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const mnemonic = 'ginger acquire message taste scheme near mule genre cross asset inquiry all' 
const endPointUrl = 'https://goerli.infura.io/v3/87c4314ef4e448d791c9458899877a18';

const provider = new HDWalletProvider(mnemonic,endPointUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const gasBlockLimit = await web3.eth.getBlock('latest').gasLimit;

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: gasBlockLimit, from: accounts[0] });

  console.log(abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
