const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const source = fs.readFileSync('../basiccode/MinimumToken.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['MinimumToken.sol:MyToken'].abi
const gasEstimate = 3000000;

const MyTokenContractFactory = web3.eth.contract(JSON.parse(abi));
const contractAddress = fs.readFileSync('address.txt', 'utf8');

const MyTokenInstance = MyTokenContractFactory.at(contractAddress);

const manager = web3.eth.accounts[0];

//const account1 = "0xc2a11B8a27C40b8Aa250620b24e7EA1dD95f57a5";
const account1 = web3.eth.accounts[1];

var managerBalance = MyTokenInstance.balanceOf(manager);
var accountBalance = MyTokenInstance.balanceOf(account1);

console.log("Manager balance: " + managerBalance.toNumber());
console.log("Destination account balance: " + accountBalance.toNumber());

console.log(MyTokenInstance.getString.call());

//const senderPassword = "password1234";
//web3.personal.unlockAccount(manager, senderPassword, 6000);

MyTokenInstance.transfer(account1, 100, {from: manager, gas: gasEstimate}, function(e, data) {
  if (e==null) {
    console.log(data);

    managerBalance = MyTokenInstance.balanceOf(manager);
    accountBalance = MyTokenInstance.balanceOf(account1);

    console.log("Manager balance: " + managerBalance.toNumber());
    console.log("Destination account balance: " + accountBalance.toNumber());
  }
});
