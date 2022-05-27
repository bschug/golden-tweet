package app.goldersocial.donationserver.repository;

import java.util.List;
import java.util.UUID;

import app.goldersocial.donationserver.entity.AuthorsModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import twitter4j.auth.AccessToken;

@Repository
public class AuthorsRepository {
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public void saveAuthor(String walletAddress, AccessToken twitterAccessToken) {
        dynamoDBMapper.save(new AuthorsModel(
            twitterAccessToken.getUserId(),
            twitterAccessToken.getScreenName(),
            walletAddress)
        );
    }

    public AuthorsModel fetchWalletByUserId(Long userId) {
        return dynamoDBMapper.load(AuthorsModel.class, userId);
    }

    public List<AuthorsModel> fetchAll() {
        return dynamoDBMapper.scan(AuthorsModel.class, new DynamoDBScanExpression());
    }
}
