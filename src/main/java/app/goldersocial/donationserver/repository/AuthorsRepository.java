package app.goldersocial.donationserver.repository;

import java.util.UUID;

import app.goldersocial.donationserver.entity.AuthorsModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthorsRepository {
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public void saveAuthor() {
        dynamoDBMapper.save(new AuthorsModel(UUID.randomUUID().toString(), "userId","wallerAddress"));
        //return customer;
    }
}
