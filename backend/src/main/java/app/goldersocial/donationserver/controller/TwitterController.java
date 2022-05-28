package app.goldersocial.donationserver.controller;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import app.goldersocial.donationserver.controller.data.TweetUserIdResponse;
import app.goldersocial.donationserver.entity.AuthorsModel;
import app.goldersocial.donationserver.service.TwitterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import twitter4j.Twitter;
import twitter4j.TwitterException;

@RestController
public class TwitterController {
    @Autowired
    private TwitterService twitterService;

    @GetMapping("/tweet/{tweetId}/author")
    public TweetUserIdResponse findUserIdByTweetId(@PathVariable Long tweetId, HttpServletRequest request)
        throws TwitterException {
        return twitterService.findUserId(tweetId, getTwitterObject(request));
    }

    private Twitter getTwitterObject(HttpServletRequest request) {
        return (Twitter) request.getSession().getAttribute("twitter");
    }
}
