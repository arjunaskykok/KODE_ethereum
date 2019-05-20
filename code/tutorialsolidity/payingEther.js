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
        var smartContractAddress = contract.address;
        const instance = factory.at(smartContractAddress);
        instance.payether({ from: account1, gas: gasEstimate, value: web3.toWei(2, 'ether') }, function(e2, data) {
            if (e2==null) {
                console.log("Paying ethers is successful.");
                instance.withdrawether({ from: manager, gas: gasEstimate }, function(e3, data) {
                    if (e3==null) {
                        console.log("Withdrawing ethers is successful.");
                    }
                });
            }
        });
    }
});
