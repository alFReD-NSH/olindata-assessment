# Problem

Make a page that serves a link that launches a lambda that posts to an SNS
topic. Then create a daemon I can run on my laptop/server that polls for
messages on that topic and notifies when a new message is posted. 

# How I implemented it

I created a bucket and uploaded the index.html in AWS S3 and made it avaialbe publicly.

It's only function was to pass the message to the AWS Lambda.

At the same time I set up the API gateaway and Lambda.
    
The code there(lambda.js) will basically just pushed the received message to SNS.

Then I wrote a http server(index.js) that can be subscribed to message from SNS and
display them in the command line.

# Challenges

 - It was my first time working with these services. Mostly I was figuring out
   things.

 - The server initially couldn't get the HTTP POST request body from AWS SNS
   and took me a while to figure it out. AWS SNS was actually sending
   text/plain content-type with JSON body, but the koa-bodyparser expected json
   content-type instead. I fixed with with adding that as a exception.

# Weaknesses

 - To get this working quickly I didn't put any authentication or verification.
   The S3 page can be accessed by anyone. The lambda can be executed without
   any api keys and the server doesn't do any validation that the messages are
   from amazon SNS. 
 
 - The server subscription must be added manually. The reason I didn't add it
   was that, if I add that, I would also need to come up with a way to clean it
   up which is tricky.


# How to run the server

You need to have node.js v7.0 first.

Install the modules with npm or yarn:

    npm install

and then start the server:

    node index.js

It will be listening on port 9000.

To use that with SNS, you have to expose it publicly so SNS can reach it. 
You can use [localtunnel](https://github.com/localtunnel/localtunnel) to help
you if you are behind NAT.

Once you have that on, you can add that as a subscription to SNS.
