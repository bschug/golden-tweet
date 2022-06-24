package app.goldersocial.donationserver.service;

import java.util.ArrayList;
import java.util.List;

import app.goldersocial.donationserver.controller.data.UserWalletResponseData;
import app.goldersocial.donationserver.entity.AuthorsModel;
import app.goldersocial.donationserver.repository.AuthorsRepository;
import app.goldersocial.donationserver.service.error.BadRequestException;
import app.goldersocial.donationserver.service.error.TwitterNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.auth.AccessToken;

@Service
@Slf4j
public class AuthorService {
    @Autowired
    private AuthorsRepository authorsRepository;

    public void saveWallet(String wallet, Twitter twitter) {
        if (twitter == null) {
            throw new TwitterNotFoundException();
        }

        if (wallet.isEmpty()) {
            throw new BadRequestException();
        }

        authorsRepository.saveAuthor(wallet, getTwitterUserData(twitter));
    }

    private AccessToken getTwitterUserData(Twitter twitter) {
        try {
            return twitter.getOAuthAccessToken();
        } catch (TwitterException e) {
            log.error("Twitter Exception: Can not take user data!" , e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<AuthorsModel> getAllItems() {
        return authorsRepository.fetchAll();
    }

    public UserWalletResponseData getUserWalletData(Long twitterUserId) {

        AuthorsModel authorsModel = authorsRepository.fetchWalletByUserId(twitterUserId);

        if (authorsModel == null || authorsModel.getTwitterId() == null) {
            throw new BadRequestException();
        }

        return new UserWalletResponseData(authorsModel.getWalletAddress());
    }
}
