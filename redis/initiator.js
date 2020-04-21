// initiator is the conversation owner
// it creates the chat topic, and invites other parties
// it answers any message that is sent (just in this implementation) with a 10k json
const redis = require('redis');
const fs = require('fs');
const redisSub = redis.createClient(6379, "amit-redis.3ky19j.ng.0001.euc1.cache.amazonaws.com");
const redisPub = redis.createClient(6379, "amit-redis.3ky19j.ng.0001.euc1.cache.amazonaws.com");

const inChan = "topic-01";
const outChan = "topic-01";

//two options for reply content 10B / 10KB :
let content10k = fs.readFileSync('./stam.json');
let content10b = "1234567890"

redisPub.publish(outChan, "Initiator: welcome everyone!")
redisSub.subscribe(inChan,()=>{
    redisSub.on("message", (channel, message) => {
        //console.log("Initiator: Received data in " + channel + ": " + message);
        if (message.startsWith("hi")) {
            let number=message.substr(2,4);
            //console.log("Initiator: received #"+number);
	    let msg = "re" + number + "|" + content10k;
	    redisPub.publish(outChan, msg);
            //console.log("sending: "+msg);
        }
    });
});

