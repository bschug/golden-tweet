package app.goldersocial.donationserver.controller.twitter;

import javax.servlet.http.HttpServletRequest;

import app.goldersocial.donationserver.cloud.twitter.TwitterApiConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import twitter4j.Twitter;
import twitter4j.auth.RequestToken;

@RestController
@Slf4j
public class GetTokenController {
    @Autowired
    private TwitterApiConfig twitterApiConfig;

    @Value("${twitter.api.callback}")
    private String twitterApiCallbackUrl;

    @RequestMapping("/getToken")
    public RedirectView getToken(HttpServletRequest request, Model model) {
        //this will be the URL that we take the user to
        String twitterUrl = "";

        try {
            //get the Twitter object
            Twitter twitter = twitterApiConfig.getTwitter();

            //go get the request token from Twitter
            RequestToken requestToken = twitter.getOAuthRequestToken(twitterApiCallbackUrl);

            //put the token in the session because we'll need it later
            request.getSession().setAttribute("requestToken", requestToken);

            //let's put Twitter in the session as well
            request.getSession().setAttribute("twitter", twitter);

            //now get the authorization URL from the token
            twitterUrl = requestToken.getAuthorizationURL();

            log.info("Authorization url is " + twitterUrl);
        } catch (Exception e) {
            log.error("Problem logging in with Twitter!", e);
        }

        //redirect to the Twitter URL
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(twitterUrl);
        return redirectView;
    }
}
