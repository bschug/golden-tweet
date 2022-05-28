import axios from 'axios';

const BACKEND_URL = '';

export async function userWallet() {
    return await axios.get(BACKEND_URL + '/userWallet');

    /*
 GET /userWallet
    returns [
        {"author":"58202349572", "wallet":"0xabd235812"},
        {"author":"42999288562", "wallet":"0x848282fe2b"}
    ]
 */
}

export async function userWalletByTwitterUserId(twitterUserId) {
    return await axios.get(BACKEND_URL + '/userWallet/' + twitterUserId);

    /*
 GET /userWallet/{twitterUserId}
    returns: {"wallet": "0xabc1234567"}
 */
}

export async function connectWallet() {
    return await axios.post(BACKEND_URL + '/connectWallet');

    /*
 POST /connectWallet
    data: {"wallet": "0xabc1234567"}
     - store this wallet address as the recipient for rewards of the currently logged in twitter user
 */
}

export async function tweetAuthor(tweetId) {
    return await axios.get(BACKEND_URL + '/tweet/' + tweetId + '/author');

    /*
  GET /tweetAuthor/?url=urlencoded-tweet-url
     returns: {"author":"283094285"}
  */
}

