const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol':{
      content:source,
    }
  },
  settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

try {
  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];
  for (let contract in output) {
    fs,fs.outputJsonSync(
      path.resolve(buildPath, contract+'.json'),
      output[contract]
    )
  };
} catch(error) {
  console.error(error);
}

