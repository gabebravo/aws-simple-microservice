'use strict';
console.log('Loading function');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const TableName = "TodoTable";

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'Content-Type': 'application/json',
        }
    });


    if(event.id) {
        dynamo.getItem({ TableName, Key: {TodoId: event.id} }, done);
    } else {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
    
};