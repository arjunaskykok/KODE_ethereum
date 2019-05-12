const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const source = fs.readFileSync('SimpleToken.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['SimpleToken.sol:SimpleToken'].abi
const gasEstimate = 3000000;

const factory = web3.eth.contract(JSON.parse(abi));
const contractAddress = fs.readFileSync('address.txt', 'utf8');

const instance = factory.at(contractAddress);

const manager = web3.eth.accounts[0];
const account1 = web3.eth.accounts[1];

var managerBalance = instance.balanceOf(manager);
var accountBalance = instance.balanceOf(account1);

console.log("Manager balance: " + managerBalance.toNumber());
console.log("Destination account balance: " + accountBalance.toNumber());

instance.transfer(account1, 300, {from: manager, gas: gasEstimate}, function(e, data) {
  if (e==null) {
    console.log(data);

    managerBalance = instance.balanceOf(manager);
    accountBalance = instance.balanceOf(account1);

    console.log("Manager balance: " + managerBalance.toNumber());
    console.log("Destination account balance: " + accountBalance.toNumber());
  }
});
