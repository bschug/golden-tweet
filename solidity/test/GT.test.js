/* global describe it before ethers */

const { assert, expect } = require('chai')
const { ethers, upgrades } = require('hardhat')
const { parseUnits } = require('ethers/lib/utils')
const { expectRevert } = require('@openzeppelin/test-helpers')

describe('GoldenTweet Test', async function () {
  let socialDiamond
  let dai
  let wbtc
  let gen
  let reward
  let fundForLink
  let linksFunded

  before(async function () {
    const accounts = await ethers.getSigners()
    contractOwner = accounts[0]
    otherAccount = accounts[1]
    recipient = accounts[2]
    creator = accounts[3]
    const SocialDiamond = await ethers.getContractFactory('SocialDiamond')

    const DAI = await ethers.getContractFactory('MockERC20')
    const BTC = await ethers.getContractFactory('MockERC20')

    dai = await DAI.deploy("DAI", "DAI Stblecoin", 18)
    wbtc = await BTC.deploy("wBTC", "Wrapepd Bitcoin", 8)
    // mint7
    await dai.mint(contractOwner.address, parseUnits("124314", 18))

    const Token = await ethers.getContractFactory('Generosity')
    gen = await Token.deploy("GEN", "G")

    console.log(dai.address, wbtc.address, gen.address)

    socialDiamond = await SocialDiamond.deploy(dai.address, gen.address);
    await socialDiamond.deployed();

  })


  it('funds link for user', async () => {
    await gen.setDistributor(socialDiamond.address)
    await dai.approve(socialDiamond.address, ethers.constants.MaxUint256)
    await socialDiamond.fundTweet(
      "213321321", // uint256 _amount,
      "link1", // string memory _link,
      creator.address// address _recipient
    )
    reward = await socialDiamond.userRewards(creator.address)
    expect(reward.pending.toString()).to.equal("213321321")
    expect(reward.claimed.toString()).to.equal("0")
    fundForLink = await socialDiamond.userRewards(creator.address)
    linksFunded = await socialDiamond.getTweetFundedForUser(contractOwner.address, 0)
    console.log("FUNDED", linksFunded)
    expect(linksFunded).to.equal("link1")

    await socialDiamond.fundTweet(
      "213321321", // uint256 _amount,
      "link2", // string memory _link,
      creator.address// address _recipient
    )

    linksFunded = await socialDiamond.getTweetFundedForUser(contractOwner.address, 1)
    console.log("FUNDED", linksFunded)
  })

})
