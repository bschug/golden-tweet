package app.goldersocial.donationserver.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@DynamoDBTable(tableName = "authors")
@Setter
@Getter
public class AuthorsModel {
    @DynamoDBHashKey(attributeName = "twitter_id")
    private String tweeterId;
    @DynamoDBAttribute(attributeName = "user_id")
    private String userId;
    @DynamoDBAttribute(attributeName = "wallet_address")
    private String walletAddress;
}
