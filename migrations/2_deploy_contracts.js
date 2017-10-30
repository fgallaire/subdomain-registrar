var ENS = artifacts.require("ENS");
var SubdomainRegistrar = artifacts.require("SubdomainRegistrar");

var namehash = require('eth-ens-namehash');
var sha3 = require('js-sha3').keccak_256;

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ENS).then(function() {
    return ENS.deployed().then(function(ens) {
      return ens.setSubnodeOwner(0, '0x' + sha3('eth'), accounts[0]).then(function(tx) {
        return deployer.deploy(SubdomainRegistrar, ens.address);
      });
    });
  });
};
