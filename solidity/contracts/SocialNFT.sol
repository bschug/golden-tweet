// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Ownable.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

// solhint-disable

contract SocialNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(address => bool) minters;

  mapping(address => uint256[]) public userOwnedTokens;
  mapping(uint256 => uint256) public tokenIsAtIndex;

  // We split the SVG at the part where it asks for the background color.
  string svgPartOne =
    "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='";
  string svgPartTwo =
    "'/><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] firstWords = [
    "Ross ",
    "Rachel ",
    "Hagrid ",
    "Joey ",
    "Chandler ",
    "Phoebe "
  ];
  string[] secondWords = [
    "likes ",
    "hates ",
    "eats ",
    "spills ",
    "drinks ",
    "smells "
  ];
  string[] thirdWords = [
    "shoe",
    "banana",
    "ice cream",
    "beer",
    "pizza",
    "rotten fish"
  ];

  // Get fancy with it! Declare a bunch of colors.
  string[] colors = ["red", "#08C2A8", "black", "yellow", "blue", "green"];

  event NewEpicNFTMinted(address sender, uint256 tokenId);

  constructor() ERC721("SocialNFT", "SNFT") Ownable() {
  }

  function pickRandomFirstWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
    );
    rand = rand % firstWords.length;
    return firstWords[rand];
  }

  function pickRandomSecondWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
    );
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function pickRandomThirdWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId)))
    );
    rand = rand % thirdWords.length;
    return thirdWords[rand];
  }

  // Same old stuff, pick a random color.
  function pickRandomColor(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked("COLOR", Strings.toString(tokenId)))
    );
    rand = rand % colors.length;
    return colors[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function mint(address _to) public {
    require(minters[msg.sender], "Only Minter Can Interact");
    uint256 newItemId = _tokenIds.current();

    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory third = pickRandomThirdWord(newItemId);
    string memory combinedWord = string(abi.encodePacked(first, second, third));

    // Add the random color in.
    string memory randomColor = pickRandomColor(newItemId);
    string memory finalSvg = string(
      abi.encodePacked(
        svgPartOne,
        randomColor,
        svgPartTwo,
        combinedWord,
        "</text></svg>"
      )
    );

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            combinedWord,
            '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
            Base64.encode(bytes(finalSvg)),
            '"}'
          )
        )
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    console.log("\n--------------------");
    console.log(finalTokenUri);
    console.log("--------------------\n");

    _safeMint(_to, newItemId);

    _setTokenURI(newItemId, finalTokenUri);

    userOwnedTokens[_to].push(newItemId);
    uint256 arrayLength = userOwnedTokens[_to].length;
    tokenIsAtIndex[newItemId] = arrayLength;

    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, _to);
    emit NewEpicNFTMinted(_to, newItemId);
  }

  function getUserOwnedTokens(address _user)
    public
    view
    returns (uint256[] memory _ret)
  {
    _ret = userOwnedTokens[_user];
  }

  function setMinter(address _newMinter) public onlyOwner {
    minters[_newMinter] = true;
  }

  function removeMinter(address _minter) public onlyOwner {
    minters[_minter] = false;
  }
}
