package app.goldersocial.donationserver.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "authors")
@Setter
@Getter
public class AuthorsModel {
    @DynamoDBHashKey(attributeName = "twitter_id")
    private Long twitterId;
    @DynamoDBAttribute(attributeName = "twitter_username")
    private String twitterUsername;
    @DynamoDBAttribute(attributeName = "wallet_address")
    private String walletAddress;
}
