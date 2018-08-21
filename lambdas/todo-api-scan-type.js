'use strict';
console.log('Loading function');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const TableName = "TodoTable";

exports.handler = (event, context, callback) => {
    // console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'Content-Type': 'application/json',
        }
    });


    if(event.type === 'all') {
        dynamo.scan({ TableName }, done);
    } else if (event.type === 'completed') {
        const params = {
            TableName : "TodoTable",
            ProjectionExpression: "TodoId, #comp, todo",
            FilterExpression: "#comp = :todo_status",
            ExpressionAttributeNames: {
                "#comp": "completed",
            },
            ExpressionAttributeValues: {
                 ":todo_status": true
            }
        };
        dynamo.scan(params, done);
    } else if (event.type === 'active') {
        const params = {
            TableName : "TodoTable",
            ProjectionExpression: "TodoId, #comp, todo",
            FilterExpression: "#comp = :todo_status",
            ExpressionAttributeNames: {
                "#comp": "completed",
            },
            ExpressionAttributeValues: {
                 ":todo_status": false
            }
        };
        dynamo.scan(params, done);
    } else {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

