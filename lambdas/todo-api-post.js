'use strict';
console.log('Loading function');

const doc = require('dynamodb-doc');
const uuidv4 = require('uuid/v4')
const dynamo = new doc.DynamoDB();
const TableName = "TodoTable";
 
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : params.Item,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    const item = {
        "TodoId": uuidv4(),
        "todo": event.todo, 
        "completed": event.completed
    };

    const params = {
        TableName: "TodoTable",
        Item: item,
        ReturnValues: "ALL_OLD"
    };

    dynamo.putItem(params, done);
   // done(new Error(`Unsupported method "${event.httpMethod}"`));
};