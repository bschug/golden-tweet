// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/ERC20/IERC20Mintable.sol";
import "./libraries/EnumerableSet.sol";
import "./libraries/Ownable.sol";

contract SocialDiamond is Ownable {
  using EnumerableSet for EnumerableSet.AddressSet;

  struct Reward {
    uint256 claimed;
    uint256 pending;
  }

  address reward;
  address asset;

  mapping(address => string[]) public tweetsFundedForUser;
  mapping(address => uint256) public countTweetsFunded;
  mapping(string => mapping(address => bool)) public funded;

  // user address -> asset -> Reward
  mapping(address => Reward) public userRewards;

  mapping(address => uint256) public donated;

  // url -> asset -> balance
  mapping(string => uint256) public rewardPerTweet;

  uint256 public totalTransactionVolume;

  constructor(address _initialAsset, address _reward) Ownable() {
    asset = _initialAsset;
    reward = _reward;
  }

  function fundTweet(
    uint256 _amount,
    string memory _link,
    address _recipient
  ) public {
    IERC20(asset).transferFrom(msg.sender, address(this), _amount);
    rewardPerTweet[_link] += _amount;
    totalTransactionVolume += _amount;
    userRewards[_recipient].pending += _amount;
    donated[msg.sender] += _amount;
    IERC20Mintable(reward).mint(msg.sender, _amount);
    if (!funded[_link][msg.sender]) {
      {
        countTweetsFunded[msg.sender] += 1;
        tweetsFundedForUser[msg.sender].push(_link);
      }

      funded[_link][msg.sender] = true;
    }
  }

  function claim(address _recipient) public {
    if (userRewards[msg.sender].pending > 0) {
      IERC20(asset).transfer(_recipient, userRewards[msg.sender].pending);
    }
  }

  function replaceAsset(address _asset) public onlyOwner {
    asset = _asset;
  }

  function getUserRewards(address _user)
    public
    view
    returns (Reward memory _rewards)
  {
    _rewards = userRewards[_user];
  }

  function getTweetFunding(string memory _tweet) public view returns (uint256) {
    return rewardPerTweet[_tweet];
  }

  function getTweetFundedForUser(address _user, uint256 _index)
    public
    view
    returns (string memory)
  {
    return tweetsFundedForUser[_user][_index];
  }
}
