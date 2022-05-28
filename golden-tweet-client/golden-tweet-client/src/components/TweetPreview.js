import React from 'react';
import { Tweet } from 'react-twitter-widgets'

export default function TweetPreview(props) {
    if (props.tweetId) {
        return <Tweet tweetId={props.tweetId} />;
    }
    else {
        return <span></span>
    }
}