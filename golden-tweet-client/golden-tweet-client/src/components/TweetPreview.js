/*import React, { useState, useEffect, forceUpdate } from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

export default function Timer(props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (props.tweetId) {
            console.log(props.tweetId);
            setValue(value => value + 1);
        }

    }, [props.tweetId]);

    return <TwitterTweetEmbed tweetId={props.tweetId} />;
}*/