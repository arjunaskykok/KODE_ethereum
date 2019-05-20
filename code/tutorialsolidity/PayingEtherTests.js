const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var assert = require('assert');

const source = fs.readFileSync('../basiccode/PayingEther.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['PayingEther.sol:PayingEther'].abi
const bytecode = '0x' + compiledContract.contracts['PayingEther.sol:PayingEther'].bin
const gasEstimate = 400000;

const factory = web3.eth.contract(JSON.parse(abi));

const contractAddress = fs.readFileSync('address2.txt', 'utf8');

let deployer = web3.eth.accounts[0];
let instance = factory.at(contractAddress);

describe('PayingEther', function() {

  this.timeout(5000);

  describe('PayingEther payingether', function()  {
    it('Contract user can transfers ether', function(done) {
      let payer = web3.eth.accounts[1];
      
      initialBalance = web3.eth.getBalance(payer).toNumber();
      assert.equal(initialBalance, web3.toWei(100, 'ether'));

      instance.payether({ from: payer, gas: gasEstimate, value: web3.toWei(3, 'ether') });

      afterBalance = web3.eth.getBalance(payer).toNumber();
      assert.ok((initialBalance - (afterBalance + web3.toWei(3, 'ether'))) < web3.toWei(0.01, 'ether'));

      done();
    });
  });
});
