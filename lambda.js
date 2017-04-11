const AWS = require('aws-sdk');
const qs = require('querystring');
const sns = new AWS.SNS({});

exports.handler = function(event, context) {
    const body = qs.parse(event.body);
    sns.publish({
        Message: body.message,
        TopicArn: process.env.TOPIC_ARN
    }, function(err, data) {
        if (err) {
            context.done(err);
            return;
        }
        context.done(null, {"statusCode": 200, "body": JSON.stringify(data), headers: {}});  
    });
};