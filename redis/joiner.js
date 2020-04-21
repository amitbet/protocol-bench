// Joiner joins the conversation, sending a short message and getting a reply from the initiator
// it is assumed that the joiner knows about the topic from another source.
// since it is the tester, it will send the request and read the reply multiple times, timing the operation
const redis = require('redis');

const redisSub = redis.createClient(6379, "amit-redis.3ky19j.ng.0001.euc1.cache.amazonaws.com");
const redisPub = redis.createClient(6379, "amit-redis.3ky19j.ng.0001.euc1.cache.amazonaws.com");

const inChan = "topic-01";
const outChan = "topic-01" 

var startTimes = []

redisSub.subscribe(inChan,()=>{
    redisSub.on("message", (channel, message) => {
        //console.log("Joiner: Received data in " + channel + ": " + message);
        // filter out our own messages (in real life there will be some uuid per message)
        if (message.startsWith("re")) {
            let text = message.substr(2, 4);
            var num = parseInt(text, 10);
            //console.log("Joiner: text num:"+text);
            const millis = Date.now() -  startTimes[num];
            console.log("Joiner: #", num, ": time elapsed: ", millis)
        }
    });
    
    run();
});

function run() {
    for (let i = 0; i < 10; i++) {
        startTimes[i] = Date.now();
        redisPub.publish(outChan, "hi" + i.toString().padStart(4, "0"));
    }
}

