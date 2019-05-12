const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var assert = require('assert');

const source = fs.readFileSync('../basiccode/MinimumToken.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['MinimumToken.sol:MyToken'].abi
const bytecode = '0x' + compiledContract.contracts['MinimumToken.sol:MyToken'].bin
const gasEstimate = 400000;

const factory = web3.eth.contract(JSON.parse(abi));

const contractAddress = fs.readFileSync('address.txt', 'utf8');

let deployer = web3.eth.accounts[0];
let instance = factory.at(contractAddress);

describe('MinimumToken', function() {

  this.timeout(5000);

  describe('MinimumToken constructor', function()  {
    it('Contract owner gets initial supply', function(done) {
      assert(instance.balanceOf(deployer).toNumber(), 100);
      done();
    });
  });

  describe('MinimumToken transfer', function()  {
    it('Contract user can transfer coin', function(done) {
      let destination = web3.eth.accounts[1];

      instance.transfer(destination, 30, { from: deployer, gas: gasEstimate })
      assert(instance.balanceOf(destination).toNumber(), 30);
      assert(instance.balanceOf(deployer).toNumber(), 70);
      done();
    });
  });
});
