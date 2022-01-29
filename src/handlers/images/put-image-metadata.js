// const AWS = require('aws-sdk');
// const s3 = new AWS.S3('2006-03-01');
// const dynamodb = new AWS.DynamoDB('2012-08-10');

// const INDEX_TABLE = process.env.INDEX_TABLE;
 
// exports.handler = async function(event) {
//     console.log(`Received event: ${JSON.stringify(event)}`);
//     try {
//         return handleEvent(event);
//     } catch(err) {
//         console.error("An error occured while processing the event");
//         console.error(err);
//     }
// };

// async function handleEvent(event) {
// 	const record = event.Records[0];
// 	const object = record.s3.object;
// 	const bucket = record.s3.bucket.name;
//     const key = decodeURIComponent(object.key);
    
//     console.log(`Indexing ${bucket}/${key}`);

//     const indexItem = {};
    
    
//     indexItem['Key'] = {S: key};
//     indexItem['Size'] = {N: object.size.toString()};

//     const s3HeadParams = {
//         Bucket: bucket,
//         Key: key
//     };

//     console.log("Fetching S3 metadata");
//     const s3Response = await s3.headObject(s3HeadParams).promise();

//     if(s3Response.Metadata.hastransaction === 'true') {
//         indexItem.HasTransaction = {S: 'true'};
//     }
    
//     console.log("Putting index item");
//     return putItem(indexItem);
// }

// function putItem(indexItem) {
//     var putParams = {
//         TableName: INDEX_TABLE,
//         Item: indexItem
//     };

//     return dynamodb.putItem(putParams).promise();
// }

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
