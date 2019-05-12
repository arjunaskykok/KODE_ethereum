pragma solidity ^0.5.0;

import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract SimpleToken is ERC20, ERC20Detailed {
  uint private INITIAL_SUPPLY = 10000;

  constructor () public ERC20Detailed("SimpleToken", "HAH", 2) {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}
