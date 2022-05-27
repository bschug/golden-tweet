Run the following command to build local dynamoDb
```
docker-compose up
```

When dynamoDb is up and running, run the following command to create the tables
```
./generate-db.sh
```
Install awscli-local to be able monitor the db tables


Helper commands:

```
awslocal dynamodb describe-table --table-name authors --endpoint-url http://localhost:4566
awslocal dynamodb list-tables --endpoint-url http://localhost:4566
awslocal dynamodb scan --table-name authors --endpoint-url http://localhost:4566
```


