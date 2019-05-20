pragma solidity < 0.6.0;

contract PayingEther {
    mapping (address => uint256) public ethermapping;
    address payable public manager;
    
    constructor() public {
        manager = msg.sender;
    }

    function payether() public payable {
        require(msg.value >= 2 ether);
        ethermapping[msg.sender] = msg.value;
    }

    function withdrawether() public payable {
        manager.transfer(address(this).balance);
    }
}
