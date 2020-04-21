const http2 = require('http2')
var options = {
    path: '/stam.json',
    method: 'GET'
}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const client = http2.connect('http://18.156.7.41:443');

function reqJsonString(num) {
    let start = Date.now();
    const req = client.request({ ':method': 'GET', ':path': '/stam.json'})
    req.on('data', d => {
            //console.log(d.toString());
            alldata.push(d);
            const millis = Date.now() - start;
            console.log("time elapsed: " , millis)
            //process.stdout.write(d)
    });
    req.on('end', () => {
           const millis = Date.now() - start;
           console.log(millis);
	   //console.log("#",num,": time elapsed: " , millis)
    });
    
    req.on('error', error => {
        console.error(error);
    })

    req.end()
}

for (let i = 0; i < 1000; i++) {
    reqJsonString(i)
}


