const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const initialSupply = 10000

const source = fs.readFileSync('SimpleToken.json', 'utf8');
const compiledContract = JSON.parse(source);
const abi = compiledContract.contracts['SimpleToken.sol:SimpleToken'].abi
const bytecode = '0x' + compiledContract.contracts['SimpleToken.sol:SimpleToken'].bin
const gasEstimate = 3000000;

const factory = web3.eth.contract(JSON.parse(abi));

//const sender = "0xce7ecce0DE4C41662cd84b207E2E38920B512b7f";
const sender = web3.eth.accounts[0];

//const senderPassword = "password1234";
//web3.personal.unlockAccount(sender, senderPassword, 6000);

factory.new(initialSupply, { from: sender, data: bytecode, gas: gasEstimate }, function(e, contract) {
  if (e==null) {
    if (contract.address!=undefined) {
      console.log(contract.address);
      fs.writeFile("address.txt", contract.address, function(err) {
        if (err==null) {
          console.log("Successfully written address in the file.");
        }
      });
    }
  } else {
    console.log(e);
  }
});

