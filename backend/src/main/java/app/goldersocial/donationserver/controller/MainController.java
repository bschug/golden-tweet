package app.goldersocial.donationserver.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestOperations;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class MainController {
    @Autowired
    private RestOperations restTemplate;

    @Value("${twitter.api.token.request}")
    private String twitterTokenRequestUrl;

    @Value("${spring.application.url}")
    private String springUrl;

    @GetMapping("/")
    public RedirectView index(HttpServletRequest request) {
        if (request.getSession() == null || request.getSession().getAttribute("twitter") == null) {
            return new RedirectView(twitterTokenRequestUrl);
        }
        return new RedirectView(springUrl + "index.html");
    }

}
