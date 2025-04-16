// src/utils/contract.js
import { Contract } from "ethers";
import contractABI from "./DecentralizedContentSubscription.json";

const CONTRACT_ADDRESS = "0xb82A7765134234071a5Ef7C5BF60c2C04c601Dc9"; // Replace this with the actual address

const getContract = (signerOrProvider) => {
  return new Contract(CONTRACT_ADDRESS, contractABI.abi, signerOrProvider);
};

export default getContract;
