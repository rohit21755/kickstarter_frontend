import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/3ff51a3ae5ad4776a15a55d6f2a2c4aa'
  );
  web3 = new Web3(provider);
}
 
export default web3;