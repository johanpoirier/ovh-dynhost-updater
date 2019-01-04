const config = require(__dirname + '/config.json');
const ovh = require('ovh')({
  endpoint: config.endPoint,
  appKey: config.appKey,
  appSecret: config.appSecret
});

ovh.request('POST', '/auth/credential', {
  'accessRules': [
    { 'method': 'GET', 'path': '/*'},
    { 'method': 'POST', 'path': '/*'},
    { 'method': 'PUT', 'path': '/*'}
  ]
}, function (error, credential) {
  console.log(error || credential);
});
