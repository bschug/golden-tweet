import './App.css';
import React, { useState, useEffect } from 'react';
//import TweetPreview from './components/TweetPreview'
import { Tweet } from 'react-twitter-widgets'
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";


function App() {
    //const { connect, metaState } = useMetamask();

    // instead of calling it from useEffect, you can also call connect method from button click handler
    useEffect(() => {

        /*if (!metaState.isConnected) {
            (async () => {
                try {
                    await connect(Web3);
                } catch (error) {
                    console.log(error);
                }
            })();
        }*/
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

        //console.log(signer);

        var erc20 = {
            "_format": "hh-sol-artifact-1",
            "contractName": "ERC20",
            "sourceName": "contracts/libraries/ERC20.sol",
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name_",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol_",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals_",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            "bytecode": "0x60806040523480156200001157600080fd5b50604051620017d9380380620017d9833981810160405281019062000037919062000318565b82600390805190602001906200004f9291906200008d565b508160049080519060200190620000689291906200008d565b5080600560006101000a81548160ff021916908360ff16021790555050505062000416565b8280546200009b90620003e1565b90600052602060002090601f016020900481019282620000bf57600085556200010b565b82601f10620000da57805160ff19168380011785556200010b565b828001600101855582156200010b579182015b828111156200010a578251825591602001919060010190620000ed565b5b5090506200011a91906200011e565b5090565b5b80821115620001395760008160009055506001016200011f565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001a6826200015b565b810181811067ffffffffffffffff82111715620001c857620001c76200016c565b5b80604052505050565b6000620001dd6200013d565b9050620001eb82826200019b565b919050565b600067ffffffffffffffff8211156200020e576200020d6200016c565b5b62000219826200015b565b9050602081019050919050565b60005b838110156200024657808201518184015260208101905062000229565b8381111562000256576000848401525b50505050565b6000620002736200026d84620001f0565b620001d1565b90508281526020810184848401111562000292576200029162000156565b5b6200029f84828562000226565b509392505050565b600082601f830112620002bf57620002be62000151565b5b8151620002d18482602086016200025c565b91505092915050565b600060ff82169050919050565b620002f281620002da565b8114620002fe57600080fd5b50565b6000815190506200031281620002e7565b92915050565b60008060006060848603121562000334576200033362000147565b5b600084015167ffffffffffffffff8111156200035557620003546200014c565b5b6200036386828701620002a7565b935050602084015167ffffffffffffffff8111156200038757620003866200014c565b5b6200039586828701620002a7565b9250506040620003a88682870162000301565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003fa57607f821691505b60208210810362000410576200040f620003b2565b5b50919050565b6113b380620004266000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610c48565b60405180910390f35b6100e660048036038101906100e19190610d03565b610308565b6040516100f39190610d5e565b60405180910390f35b610104610326565b6040516101119190610d88565b60405180910390f35b610134600480360381019061012f9190610da3565b610330565b6040516101419190610d5e565b60405180910390f35b610152610428565b60405161015f9190610e12565b60405180910390f35b610182600480360381019061017d9190610d03565b61043f565b60405161018f9190610d5e565b60405180910390f35b6101b260048036038101906101ad9190610e2d565b6104eb565b6040516101bf9190610d88565b60405180910390f35b6101d0610533565b6040516101dd9190610c48565b60405180910390f35b61020060048036038101906101fb9190610d03565b6105c5565b60405161020d9190610d5e565b60405180910390f35b610230600480360381019061022b9190610d03565b6106b0565b60405161023d9190610d5e565b60405180910390f35b610260600480360381019061025b9190610e5a565b6106ce565b60405161026d9190610d88565b60405180910390f35b60606003805461028590610ec9565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610ec9565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b600061031c610315610755565b848461075d565b6001905092915050565b6000600254905090565b600061033d848484610926565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610388610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90610f6c565b60405180910390fd5b61041c85610414610755565b85840361075d565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b60006104e161044c610755565b84846001600061045a610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104dc9190610fbb565b61075d565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461054290610ec9565b80601f016020809104026020016040519081016040528092919081815260200182805461056e90610ec9565b80156105bb5780601f10610590576101008083540402835291602001916105bb565b820191906000526020600020905b81548152906001019060200180831161059e57829003601f168201915b5050505050905090565b600080600160006105d4610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068890611083565b60405180910390fd5b6106a561069c610755565b8585840361075d565b600191505092915050565b60006106c46106bd610755565b8484610926565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c390611115565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361083b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610832906111a7565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109199190610d88565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098c90611239565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a04576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fb906112cb565b60405180910390fd5b610a0f838383610ba5565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8c9061135d565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b289190610fbb565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b8c9190610d88565b60405180910390a3610b9f848484610baa565b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610be9578082015181840152602081019050610bce565b83811115610bf8576000848401525b50505050565b6000601f19601f8301169050919050565b6000610c1a82610baf565b610c248185610bba565b9350610c34818560208601610bcb565b610c3d81610bfe565b840191505092915050565b60006020820190508181036000830152610c628184610c0f565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c9a82610c6f565b9050919050565b610caa81610c8f565b8114610cb557600080fd5b50565b600081359050610cc781610ca1565b92915050565b6000819050919050565b610ce081610ccd565b8114610ceb57600080fd5b50565b600081359050610cfd81610cd7565b92915050565b60008060408385031215610d1a57610d19610c6a565b5b6000610d2885828601610cb8565b9250506020610d3985828601610cee565b9150509250929050565b60008115159050919050565b610d5881610d43565b82525050565b6000602082019050610d736000830184610d4f565b92915050565b610d8281610ccd565b82525050565b6000602082019050610d9d6000830184610d79565b92915050565b600080600060608486031215610dbc57610dbb610c6a565b5b6000610dca86828701610cb8565b9350506020610ddb86828701610cb8565b9250506040610dec86828701610cee565b9150509250925092565b600060ff82169050919050565b610e0c81610df6565b82525050565b6000602082019050610e276000830184610e03565b92915050565b600060208284031215610e4357610e42610c6a565b5b6000610e5184828501610cb8565b91505092915050565b60008060408385031215610e7157610e70610c6a565b5b6000610e7f85828601610cb8565b9250506020610e9085828601610cb8565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ee157607f821691505b602082108103610ef457610ef3610e9a565b5b50919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b6000610f56602883610bba565b9150610f6182610efa565b604082019050919050565b60006020820190508181036000830152610f8581610f49565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610fc682610ccd565b9150610fd183610ccd565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561100657611005610f8c565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b600061106d602583610bba565b915061107882611011565b604082019050919050565b6000602082019050818103600083015261109c81611060565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006110ff602483610bba565b915061110a826110a3565b604082019050919050565b6000602082019050818103600083015261112e816110f2565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611191602283610bba565b915061119c82611135565b604082019050919050565b600060208201905081810360008301526111c081611184565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611223602583610bba565b915061122e826111c7565b604082019050919050565b6000602082019050818103600083015261125281611216565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006112b5602383610bba565b91506112c082611259565b604082019050919050565b600060208201905081810360008301526112e4816112a8565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611347602683610bba565b9150611352826112eb565b604082019050919050565b600060208201905081810360008301526113768161133a565b905091905056fea26469706673582212203e762aad7686d9d36c99b986746f231f447ea90fde82d5034d351049f5cba19064736f6c634300080e0033",
            "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610c48565b60405180910390f35b6100e660048036038101906100e19190610d03565b610308565b6040516100f39190610d5e565b60405180910390f35b610104610326565b6040516101119190610d88565b60405180910390f35b610134600480360381019061012f9190610da3565b610330565b6040516101419190610d5e565b60405180910390f35b610152610428565b60405161015f9190610e12565b60405180910390f35b610182600480360381019061017d9190610d03565b61043f565b60405161018f9190610d5e565b60405180910390f35b6101b260048036038101906101ad9190610e2d565b6104eb565b6040516101bf9190610d88565b60405180910390f35b6101d0610533565b6040516101dd9190610c48565b60405180910390f35b61020060048036038101906101fb9190610d03565b6105c5565b60405161020d9190610d5e565b60405180910390f35b610230600480360381019061022b9190610d03565b6106b0565b60405161023d9190610d5e565b60405180910390f35b610260600480360381019061025b9190610e5a565b6106ce565b60405161026d9190610d88565b60405180910390f35b60606003805461028590610ec9565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610ec9565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b600061031c610315610755565b848461075d565b6001905092915050565b6000600254905090565b600061033d848484610926565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610388610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90610f6c565b60405180910390fd5b61041c85610414610755565b85840361075d565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b60006104e161044c610755565b84846001600061045a610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104dc9190610fbb565b61075d565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461054290610ec9565b80601f016020809104026020016040519081016040528092919081815260200182805461056e90610ec9565b80156105bb5780601f10610590576101008083540402835291602001916105bb565b820191906000526020600020905b81548152906001019060200180831161059e57829003601f168201915b5050505050905090565b600080600160006105d4610755565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068890611083565b60405180910390fd5b6106a561069c610755565b8585840361075d565b600191505092915050565b60006106c46106bd610755565b8484610926565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c390611115565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361083b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610832906111a7565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109199190610d88565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098c90611239565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a04576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fb906112cb565b60405180910390fd5b610a0f838383610ba5565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8c9061135d565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b289190610fbb565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b8c9190610d88565b60405180910390a3610b9f848484610baa565b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610be9578082015181840152602081019050610bce565b83811115610bf8576000848401525b50505050565b6000601f19601f8301169050919050565b6000610c1a82610baf565b610c248185610bba565b9350610c34818560208601610bcb565b610c3d81610bfe565b840191505092915050565b60006020820190508181036000830152610c628184610c0f565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c9a82610c6f565b9050919050565b610caa81610c8f565b8114610cb557600080fd5b50565b600081359050610cc781610ca1565b92915050565b6000819050919050565b610ce081610ccd565b8114610ceb57600080fd5b50565b600081359050610cfd81610cd7565b92915050565b60008060408385031215610d1a57610d19610c6a565b5b6000610d2885828601610cb8565b9250506020610d3985828601610cee565b9150509250929050565b60008115159050919050565b610d5881610d43565b82525050565b6000602082019050610d736000830184610d4f565b92915050565b610d8281610ccd565b82525050565b6000602082019050610d9d6000830184610d79565b92915050565b600080600060608486031215610dbc57610dbb610c6a565b5b6000610dca86828701610cb8565b9350506020610ddb86828701610cb8565b9250506040610dec86828701610cee565b9150509250925092565b600060ff82169050919050565b610e0c81610df6565b82525050565b6000602082019050610e276000830184610e03565b92915050565b600060208284031215610e4357610e42610c6a565b5b6000610e5184828501610cb8565b91505092915050565b60008060408385031215610e7157610e70610c6a565b5b6000610e7f85828601610cb8565b9250506020610e9085828601610cb8565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ee157607f821691505b602082108103610ef457610ef3610e9a565b5b50919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b6000610f56602883610bba565b9150610f6182610efa565b604082019050919050565b60006020820190508181036000830152610f8581610f49565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610fc682610ccd565b9150610fd183610ccd565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561100657611005610f8c565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b600061106d602583610bba565b915061107882611011565b604082019050919050565b6000602082019050818103600083015261109c81611060565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006110ff602483610bba565b915061110a826110a3565b604082019050919050565b6000602082019050818103600083015261112e816110f2565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611191602283610bba565b915061119c82611135565b604082019050919050565b600060208201905081810360008301526111c081611184565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611223602583610bba565b915061122e826111c7565b604082019050919050565b6000602082019050818103600083015261125281611216565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006112b5602383610bba565b91506112c082611259565b604082019050919050565b600060208201905081810360008301526112e4816112a8565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611347602683610bba565b9150611352826112eb565b604082019050919050565b600060208201905081810360008301526113768161133a565b905091905056fea26469706673582212203e762aad7686d9d36c99b986746f231f447ea90fde82d5034d351049f5cba19064736f6c634300080e0033",
            "linkReferences": {},
            "deployedLinkReferences": {}
        };

        const daiAddress = '0xba1e292ef1e5f01b50745e49420bd0a078c30bd9';
        const erc20Contract = new ethers.Contract(daiAddress, erc20.abi, provider);

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
        const diamondAddress = '';

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


