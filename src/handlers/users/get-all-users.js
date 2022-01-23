// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const localDocClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo:8000' });

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // DB config
    let db = docClient;
    if (process.env.AWS_SAM_LOCAL) {
        db = localDocClient;
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);
    // DB action
    var params = {
        TableName: tableName
    };
    const data = await db.scan(params).promise();
    const items = data.Items;
    // Send response
    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        }
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
