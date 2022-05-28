import './App.css';

//external:
import React, { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

//internal:
import TweetPreview from './components/TweetPreview'
import { userWallet, userWalletByTwitterUserId, connectWallet, tweetAuthor } from './utils/Backend'

//Web3:
import { ethers, getDefaultProvider } from 'ethers';

import ERC20 from './jsons/ERC20.json';
import Multicall from './jsons/Multicall.json';
import SocialNFT from './jsons/SocialNFT.json';
import SocialDiamond from './jsons/SocialDiamond.json';

const _daiAddress = '0x8B5D21DEfB46ec472B113639338c9401B0D0b60d';
const _diamondAddress = '0xC9fd3EFfFf3f6ab127522634c63Ba7160d878D57';

function App() {
    useEffect(() => {
    }, []);

    const [state, setState] = useState({
        isConfirmationVisible: false
    });

    const [amount, setAmount] = useState(1);

    var onTweetLinkChanged = (value) => {
        var index = value.lastIndexOf('/');

        var tweetId = null;
        if (index != -1) {
            var tweetId = value.substr(index + 1);
        }

        setState(prevState => ({
            ...prevState,
            tweetId: tweetId,
            tweetLink: value
        }));
    };

    var onAmountChanged = (value) => {
        setAmount(value);
    };

    var onRewardClick = () => {
        setState(prevState => ({
            ...prevState,
            isConfirmationVisible: true
        }));
    };

    var onApprovalClick = async () => {
        var erc20Contract = await getErc20Contract();
        await erc20Contract
            .connect(getProvider().getSigner())
            .approve(state.diamondAddress, ethers.constants.MaxUint256);

        var address = await getAddress();
        var allowance = await erc20Contract.allowance(address, _diamondAddress);
        allowance = ethers.utils.formatEther(allowance);

        setState(prevState => ({
            ...prevState,
            allowance: allowance
        }));
    };

    var onRefreshClick = async () => {
        var address = await getAddress();
        var socialDiamondContract = await getSocialDiamondContract();

        var donated = await socialDiamondContract.donated(address);
        donated = ethers.utils.formatEther(donated);

        loadBalance();

        setState(prevState => ({
            ...prevState,
            donated: donated
        }));
    };

    var onCancelClick = () => {
        setState(prevState => ({
            ...prevState,
            isConfirmationVisible: false
        }));
    };

    var onSendRewardClick = async () => {
        var tweetAuthorResult = await tweetAuthor(state.tweetId);
        var twitterUserId = tweetAuthorResult.data.author;

        var userWalletByTwitterUserIdResult = await userWalletByTwitterUserId(twitterUserId);
        var recepientAddress = userWalletByTwitterUserIdResult.data.wallet;

        console.log('amount: ' + amount);
        var _amount = ethers.BigNumber
            .from(amount)
            .mul(ethers.BigNumber.from(10).pow(18));
        console.log('_amount: ' + _amount.toString());

        var socialDiamondContract = await getSocialDiamondContract();
        await socialDiamondContract
            .connect(getProvider().getSigner())
            .fundTweet(_amount, state.tweetLink, recepientAddress);

        var address = await getAddress();
        console.log(address);

        var donated = await socialDiamondContract
            .donated(address);

        donated = ethers.utils.formatEther(donated);

        setState(prevState => ({
            ...prevState,
            donated: donated
        }));
    };

    var onConnectWalletClick = async () => {
        await connect();
        await loadBalance();
    };

    var getProvider = () => {
        try {
            return new ethers.providers.Web3Provider(window.ethereum);
        }
        catch {
            const url = 'https://api.avax-test.network/ext/bc/C/rpc';

            return new ethers.providers.JsonRpcProvider(url);
        }
    };

    async function connect() {
        let provider = getProvider();
        console.log(provider);

        await provider.send("eth_requestAccounts", []);

        var socialDiamondContract = await getSocialDiamondContract()
        console.log(socialDiamondContract);

        var address = await getAddress();
        await connectWallet(address);

        var donated = await socialDiamondContract
            .donated(address);

        donated = ethers.utils.formatEther(donated);

        setState(prevState => ({
            ...prevState,
            donated: donated,
            address: address
        }));
    }

    async function getAddress() {
        const signer = getProvider().getSigner();
        return await signer.getAddress();
    }

    async function loadBalance() {
        var address = await getAddress();

        console.log(address);

        let balance = 0;
        let allowance = 0;
        if (address) {
            var erc20Contract = await getErc20Contract();
            balance = await erc20Contract.balanceOf(address);
            balance = ethers.utils.formatEther(balance);

            allowance = await erc20Contract.allowance(address, _diamondAddress);
            allowance = ethers.utils.formatEther(allowance);

            setState(prevState => ({
                ...prevState,
                balance: balance,
                allowance: allowance,
                diamondAddress: _diamondAddress
            }));
        }
    };

    async function getErc20Contract() {
        return await new ethers.Contract(_daiAddress, ERC20.abi, getProvider());
    }

    async function getSocialDiamondContract() {
        return await new ethers.Contract(_diamondAddress, SocialDiamond.abi, getProvider());
    }

    function multicallStuff() {
        const multicallAddress = '0x9aEeeD65aE87e3b28793aefAeED59c3f10ef956b';


    }

    function SocialNFTStuff() {
        const SocialNFTAddress = '0xEB97FC2BAb16ea25Ce8fF88a70814b36ce1Fc709';


    }

    return (
        <div className="App">
            <div className="connect">
                Connect to wallet
                <button className="connect-button" onClick={onConnectWalletClick}>Connect</button>
                <br />
                {state.donated ? 'Donated: ' + Math.round(state.donated) : ''}
            </div>

            <h1>Social Diamond</h1>

            <div className={state.isConfirmationVisible ? 'invisible' : 'main-input'}>
                <h2>1. Login to a social network</h2>

                <a href="">Twitter</a>
                <a href="">Facebook</a>
                <a href="">Instagram</a>

                <br />
                <br />

                <h2>2. Paste a link to a tweet</h2>
                <input className="tweet-input" onChange={(e) => onTweetLinkChanged(e.target.value)} type="text" placeholder="Tweet Link" />

                <br />
                <br />

                <h2>3. Choose amount & select coin</h2>

                <input onChange={(e) => onAmountChanged(e.target.value)} type="number" className="amount" defaultValue="1" min="1" />
                <select>
                    <option value="test" defaultValue>Generosity Coin</option>
                </select>

                {state.balance ? '(balance: ' + Math.round(state.balance) + ')' : ''}
                {state.allowance === 0 ? '(allowance: ' + state.allowance + ')' : ''}

                <br />

                <ProgressBar completed={parseInt(amount) + parseInt(state.donated ? state.donated : 0)} />

                <h1 className={(parseInt(amount) + parseInt(state.donated ? state.donated : 0)) >= 100 ? '' : 'invisible'}>
                    You'll get an NFT
                </h1>

                <br />
                <br />

                <h2>4. Reward the tweet</h2>
                <button onClick={onRewardClick} disabled={!state?.tweetId}>Reward</button>
                <button onClick={onApprovalClick}>Approval</button>
                <button onClick={onRefreshClick}>Refresh</button>

                <TweetPreview tweetId={state?.tweetId} />
            </div>

            <div className={state.isConfirmationVisible ? 'approval' : 'invisible'}>
                <button onClick={onCancelClick} className="back">Back</button>

                <h2>Summary</h2>

                <h4>Donate {amount + ' Generosity Coin(s)'}</h4>
                <button className="donate-button" onClick={onSendRewardClick}>Approve</button>

                <TweetPreview tweetId={state?.tweetId} />
            </div>
        </div>
    );
}

export default App;


