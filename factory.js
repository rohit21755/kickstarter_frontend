import web3 from "./web";
import CampaignFactory from "./CampaignFactory.json";
const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xa960aAe2E91C30Add2520da9eB920928EDC21fc2');
    console.log(instance);
export default instance;