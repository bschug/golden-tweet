package app.goldersocial.donationserver.controller;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

import app.goldersocial.donationserver.controller.data.TweetUserIdResponse;
import app.goldersocial.donationserver.controller.data.UserWalletResponseData;
import app.goldersocial.donationserver.controller.data.WalletRequestData;
import app.goldersocial.donationserver.entity.AuthorsModel;
import app.goldersocial.donationserver.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import twitter4j.Twitter;
import twitter4j.TwitterException;

@RestController
public class AuthorsController {
    @Autowired
    private AuthorService authorService;
    @Autowired
    private RestOperations restTemplate;

    @PostMapping("/connectWallet")
    public void addFakeData(@RequestBody WalletRequestData wallet, HttpServletRequest request) {
        authorService.saveWallet(wallet.getWallet(), getTwitterObject(request));
    }

    @GetMapping("/userWallet/{twitterUserId}")
    public UserWalletResponseData getWallet(@PathVariable Long twitterUserId) {
        return authorService.getUserWalletData(twitterUserId);
    }

    @GetMapping("/userWallet")
    public List<AuthorsModel> getAllWallets(HttpServletRequest request) {
        return authorService.getAllItems();
    }


    @GetMapping("/google")
    public String callGoogle() {
        String url = "http://google.com";
        return this.restTemplate.getForObject(url, String.class);
    }

    @GetMapping("/string")
    public String findUserIdByTweetId() {
        return "Success";
    }

    private Twitter getTwitterObject(HttpServletRequest request) {
        return (Twitter) request.getSession().getAttribute("twitter");
    }
}
