// Libs
const uuid = require("uuid");
const dynamodb = require('aws-sdk/clients/dynamodb');

// Create a DocumentClient that represents the query to add an item
const docClient = new dynamodb.DocumentClient();
const localDocClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo:8000' });

// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS;

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // DB config
    let db = docClient;
    if (process.env.AWS_SAM_LOCAL) {
        db = localDocClient;
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);
    // Get id and name from the body of the request
    const body = JSON.parse(event.body)
    const firstname = body.firstname;
    const lastname = body.lastname;
    const email = body.email;
    const password = body.password;
    const beets = [];
    // DB action
    var params = {
        TableName: tableName,
        Item: {
            id: uuid.v4(),
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            beets: beets
        }
    };
    const result = await db.put(params).promise();
    // Send response
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        }
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
