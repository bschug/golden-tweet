awslocal dynamodb create-table \
    --table-name authors \
    --attribute-definitions \
    AttributeName=twitter_id,AttributeType=S \
    --key-schema \
    AttributeName=twitter_id,KeyType=HASH \
    --provisioned-throughput \
    ReadCapacityUnits=10,WriteCapacityUnits=10 \
    --endpoint-url http://localhost:4566