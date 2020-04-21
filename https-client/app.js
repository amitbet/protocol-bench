const https = require('https')
const options = {
    hostname: '18.156.7.41',
    port: 443,
    path: '/stam.json',
    method: 'GET'
}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function reqJsonString() {
    let start = Date.now();
    const req = https.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`)
        let alldata = []
        res.on('data', d => {
            let end = Date.now()
            //console.log(d.toString());
            alldata.push(d);
            const millis = Date.now() - start;
            console.log(millis)
            //process.stdout.write(d)
        })
        req.on('end', () => {


            //JSON.parse(alldata);
        })
    })

    req.on('error', error => {
        console.error(error);
    })

    req.end()
}

for (let i = 0; i < 10; i++) {
    reqJsonString()
}
