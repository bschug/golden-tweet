package app.goldersocial.donationserver.service;

import app.goldersocial.donationserver.cloud.twitter.TwitterApiConfig;
import app.goldersocial.donationserver.controller.data.TweetUserIdResponse;
import app.goldersocial.donationserver.service.error.BadRequestException;
import app.goldersocial.donationserver.service.error.TwitterNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

@Service
@Slf4j
public class TwitterService {
    @Autowired
    private TwitterApiConfig twitterApiConfig;

    public TweetUserIdResponse findUserId(Long tweetId, Twitter twitterObject) throws TwitterException {
        if (twitterObject == null) {
            log.error("Session Twitter can not be null");
            throw new TwitterNotFoundException();
        }

        Status tweetStatus = twitterObject.tweets().showStatus(tweetId);

        if (tweetStatus == null) {
            log.error("Tweet is not exist. id=" + tweetId);
            throw new BadRequestException();
        }

        if (tweetStatus.getUser() == null) {
            log.error("User data of the tweet is not exist. id=" + tweetId);
            throw new TwitterNotFoundException();
        }

        return new TweetUserIdResponse(tweetStatus.getUser().getId());
    }
}
