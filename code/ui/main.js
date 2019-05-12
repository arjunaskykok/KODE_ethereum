var instance = null;
var web3provider = null

function transfer() {
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var coins = document.getElementById("amount").value;

  instance.transfer(to, coins, {from: from, gas: 300000}, function(err, result) {
    if (err==null) {
      console.log(result);
      displayAmount();
    }
  });
}

function displayAmount() {
  var account1 = web3provider.eth.accounts[0];
  var account2 = "0x488e53B3B2e8E94966041Eb1C614F8E4aae8d333";

  var addressNode1 = document.getElementById("address1");
  addressNode1.innerHTML = account1;
  var addressNode2 = document.getElementById("address2");
  addressNode2.innerHTML = account2;

  var coinNode1 = document.getElementById("coin1");
  instance.balanceOf(account1, function(err, result) {
    if (err == null) {
      coinNode1.innerHTML = result.toNumber();
    }
  });
  var coinNode2 = document.getElementById("coin2");
  instance.balanceOf(account2, function(err, result) {
    if (err == null) {
      coinNode2.innerHTML = result.toNumber();
    }
  });
}

window.addEventListener('load', function() {
  if (typeof web3 != undefined) {
    web3provider = new Web3(web3.currentProvider);
  } else {
    web3provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  var abi = "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getString\",\"outputs\":[{\"name\":\"result\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"initialSupply\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]";
  var factory = web3provider.eth.contract(JSON.parse(abi));
  instance = factory.at("0xbe7fda1cd034faf3cbc1d8a794ff77ff69e736dd");

  displayAmount();
});
