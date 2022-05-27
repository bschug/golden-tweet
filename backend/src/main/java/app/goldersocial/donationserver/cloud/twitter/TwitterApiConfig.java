package app.goldersocial.donationserver.cloud.twitter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

@Configuration
@Slf4j
public class TwitterApiConfig {
    @Value("${twitter.api.clientid}")
    private String twitterApiClientId;

    @Value("${twitter.api.secret}")
    private String twitterApiSecretKey;

    public Twitter getTwitter() {
        log.info("Key " + twitterApiClientId);
        log.info("Secret " + twitterApiSecretKey);
        Twitter twitter = null;

        //build the configuration
        ConfigurationBuilder builder = new ConfigurationBuilder();
        builder.setOAuthConsumerKey(twitterApiClientId);
        builder.setOAuthConsumerSecret(twitterApiSecretKey);
        twitter4j.conf.Configuration configuration = builder.build();

        //instantiate the Twitter object with the configuration
        TwitterFactory factory = new TwitterFactory(configuration);
        twitter = factory.getInstance();

        return twitter;
    }

}
