import Web3 from "web3";

import getConfig from 'next/config'

const {
  serverRuntimeConfig: {MNEMONIC, ENDPOINT_URL} // Only available server side
} = getConfig()

let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(ENDPOINT_URL);
  web3 = new Web3(provider);
}
 
export default web3;