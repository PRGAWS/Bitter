// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const localDocClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo:8000' });

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`getMethod only accept DELETE method, you tried: ${event.httpMethod}`);
  }

  // DB config
  let db = docClient;
  if (process.env.AWS_SAM_LOCAL) {
    db = localDocClient;
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  const id = event.pathParameters.id;

  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  var params = {
    TableName: tableName,
    Key: { id: id },
  };
  const result = await db.delete(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({ result: result })
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
