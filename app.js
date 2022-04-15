var request = require('request');

let data = require('./data.json');
const INDEX = "test";

let elastic_data = [];
for (const item of data) {
    elastic_data.push(JSON.stringify({ "index": { "_index": INDEX, "_type": INDEX } }));
    elastic_data.push(JSON.stringify(item));
}

console.log(elastic_data.join('\n'));


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
request({
    method: 'POST',
    url: 'https://localhost:9200/_bulk',
    headers: {
        'Content-Type': 'application/json'
    },
    body: elastic_data.join('\n') + '\n'
}, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
