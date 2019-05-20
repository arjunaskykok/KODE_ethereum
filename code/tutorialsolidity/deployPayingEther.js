const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const source = fs.readFileSync('../basiccode/PayingEther.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['PayingEther.sol:PayingEther'].abi
const bytecode = '0x' + compiledContract.contracts['PayingEther.sol:PayingEther'].bin
const gasEstimate = 3000000;

const factory = web3.eth.contract(JSON.parse(abi));

const manager = web3.eth.accounts[0];
const account1 = web3.eth.accounts[1];

factory.new({ from: manager, data: bytecode, gas: gasEstimate }, function(e, contract) {
  if (e==null) {
    if (contract.address!=undefined) {
      console.log(contract.address);
      fs.writeFile("address2.txt", contract.address, function(err) {
        if (err==null) {
          console.log("Successfully written address in the file.");
        }
      });
    }
  } else {
    console.log(e);
  }
});
