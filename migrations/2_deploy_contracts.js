var JobList = artifacts.require('./JobList.sol');

module.exports = function(deployer) {
  deployer.deploy(JobList);
};
