const SimpleStorage = artifacts.require("SimpleStorage");
const Voting = artifacts.require("SimpleStVotingorage");


module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Voting);

};
