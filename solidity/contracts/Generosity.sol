// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import "./libraries/ERC20.sol";
import "./libraries/Ownable.sol";

contract Generosity is ERC20, Ownable {
  bool internal distributorSet;
  address public distributor;

  constructor(string memory _name, string memory _symbol)
    ERC20(_name, _symbol, 18)
  {}

  function setDistributor(address _distributor) public onlyOwner {
    require(!distributorSet, "dist already set");
    distributor = _distributor;
  }

  function mint(address to, uint256 value) public virtual {
    require(msg.sender == distributor);
    _mint(to, value);
  }

  function burn(address from, uint256 value) public virtual {
    _burn(from, value);
  }
}
