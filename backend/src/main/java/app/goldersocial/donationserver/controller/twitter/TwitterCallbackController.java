package app.goldersocial.donationserver.controller.twitter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import twitter4j.Twitter;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;

@RestController
@Slf4j
public class TwitterCallbackController {
    @RequestMapping("/twitterCallback")
    public RedirectView twitterCallback(@RequestParam(value="oauth_verifier", required=false) String oauthVerifier,
                                        @RequestParam(value="denied", required=false) String denied,
                                        HttpServletRequest request, HttpServletResponse response, Model model) {

        if (denied != null) {
            //if we get here, the user didn't authorize the app
            return new RedirectView("error.html");
        }

        //get the objects from the session
        Twitter twitter = (Twitter) request.getSession().getAttribute("twitter");
        RequestToken requestToken = (RequestToken) request.getSession().getAttribute("requestToken");

        try {
            //get the access token
            AccessToken token = twitter.getOAuthAccessToken(requestToken, oauthVerifier);

            //take the request token out of the session
            request.getSession().removeAttribute("requestToken");

            //store the user name so we can display it on the web page
            model.addAttribute("username", twitter.getScreenName());
            //twitter.getOAuthAccessToken().userId -- unique ID
            return new RedirectView("index.html");
        } catch (Exception e) {
            log.error("Problem getting token!",e);
            return new RedirectView("error.html");
        }
    }
}
