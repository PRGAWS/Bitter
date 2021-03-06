// Libs
const dynamodb = require('aws-sdk/clients/dynamodb');

// Create a DocumentClient that represents the query to add an item
const docClient = new dynamodb.DocumentClient();
const localDocClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo:8000' });

// Get the DynamoDB table name from environment variables
const tableName = process.env.IMAGESMETADATA;

exports.handler = async (event) => {
	const record = event.Records[0];
	const object = record.s3.object;
	const bucket = record.s3.bucket.name;

    // DB config
    let db = docClient;
    if (process.env.AWS_SAM_LOCAL) {
        db = localDocClient;
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const id = decodeURIComponent(object.key);
    const size = object.size.toString();

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName: tableName,
        Item: {
            id: id,
            size: size
        }
    };

    return db.put(params).promise();

}
