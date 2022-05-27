import './App.css';

//external:
import React, { useState, useEffect } from 'react';
import { Tweet } from 'react-twitter-widgets'

//internal:
//import TweetPreview from './components/TweetPreview'
import { userWallet, userWalletByTwitterUserId, connectWallet } from './utils/Backend'

//Web3:
import { ethers } from 'ethers';

import ERC20 from './jsons/ERC20.json';
import Multicall from './jsons/Multicall.json';
import SocialNFT from './jsons/SocialNFT.json';

function App() {
    useEffect(() => {
        Backend.justAnAlert();
    }, []);

    const [state, setState] = useState({
        isConfirmationVisible: false
    });

    var onTweetLinkChanged = (value) => {
        var index = value.lastIndexOf('/');

        var tweetId = null;
        if (index != -1) {
            var tweetId = value.substr(index + 1);
        }

        setState({
            ...state,
            tweetId: tweetId
        });
    };

    var onRewardClick = () => {
        setState({
            ...state,
            isConfirmationVisible: true
        });
    };

    var onCancelClick = () => {
        setState({
            ...state,
            isConfirmationVisible: false
        });
    };

    var onApproveClick = () => {
        alert('waiting to be implemented...');
    };

    var onConnectWalletClick = async () => {
        var result = await connect();
        await loadBalance(result);
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

        const daiAddress = '0x8B5D21DEfB46ec472B113639338c9401B0D0b60d';
        const erc20Contract = new ethers.Contract(daiAddress, ERC20.abi, provider);

        setState({
            ...state,
            erc20Contract: erc20Contract,
            provider: provider
        });

        return {
            erc20Contract: erc20Contract,
            provider: provider
        };
    }

    async function loadBalance(connectionResult) {
        var connection = connectionResult;//todo or state

        const signer = connection.provider.getSigner();
        const address = await signer.getAddress();
        const diamondAddress = '0xC9fd3EFfFf3f6ab127522634c63Ba7160d878D57';

        console.log(address);

        let balance = 0;
        let allowance = 0;
        if (address) {
            balance = await connection.erc20Contract.balanceOf(address);
            allowance = await connection.erc20Contract.allowance(address, diamondAddress);

            //convert balance
            console.log(balance);
            balance = ethers.utils.formatEther(balance);
            console.log(balance);

            //convert allowance
            console.log(allowance);
            allowance = ethers.utils.formatEther(allowance);
            console.log(allowance);

            setState({
                ...state,
                balance: balance,
                allowance: allowance
            });
        }
    };

    function multicallStuff() {
        const multicallAddress = '0x9aEeeD65aE87e3b28793aefAeED59c3f10ef956b';


    }

    function SocialNFTStuff() {
        const SocialNFTAddress = '0xEB97FC2BAb16ea25Ce8fF88a70814b36ce1Fc709';


    }

    return (
        <div className="App">
            <div>
                Connect to wallet
                <button onClick={onConnectWalletClick}>Connect</button>
            </div>

            <h1>Social Diamond</h1>

            <div className={state.isConfirmationVisible ? 'invisible' : ''}>
                <h2>1. Login to a social network</h2>

                <a href="">Twitter</a>
                <a href="">Facebook</a>
                <a href="">Instagram</a>

                <br />
                <br />

                <h2>2. Paste a link to a tweet</h2>
                <input onChange={(e) => onTweetLinkChanged(e.target.value)} type="text" placeholder="Tweet Link" />

                <br />
                <br />

                <h2>3. Choose amount & select coin</h2>

                <input type="number" className="amount" defaultValue="1" min="1" />
                <select>
                    <option value="test" defaultValue>Generosity Coin</option>
                </select>

                {state.balance ? '(balance: ' + state.balance + ')' : ''}
                {state.allowance ? '(allowance: ' + state.allowance + ')' : ''}

                <br />
                <br />

                <h2>4. Reward the tweet</h2>
                <button onClick={onRewardClick} disabled={!state?.tweetId}>Reward</button>

                <div className={state?.tweetId ? '' : 'invisible'}>
                    <br />
                    <Tweet tweetId={state?.tweetId} />
                </div>

            </div>

            <div className={state.isConfirmationVisible ? 'approval' : 'invisible'}>
                <button onClick={onCancelClick} className="back">Back</button>

                <h2>Summary</h2>

                <h4>some info</h4>
                <button onClick={onApproveClick}>Approve</button>

                <Tweet tweetId={state?.tweetId} />
            </div>


        </div>
    );
}

export default App;


