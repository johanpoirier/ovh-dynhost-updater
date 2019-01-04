const config = require(__dirname + '/config.json');
const ovh = require('ovh')({
  appKey: config.appKey,
  appSecret: config.appSecret,
  consumerKey: config.consumerKey
});

ovh.requestPromised('GET', `/domain/zone/jops-dev.com/dynHost/record/${config.homeHost}`).then(async homeRecord => {
  console.log('Home record', homeRecord);
  config.dynHosts.forEach(id => {
    ovh.requestPromised('PUT', `/domain/zone/jops-dev.com/dynHost/record/${id}`, {
      ip: homeRecord.ip
    })
      .then(() => console.log(`Record ${id} updated with IP ${homeRecord.ip}`))
      .catch(error => console.log(`Unable to update record ${id} with IP ${homeRecord.ip}`, error));
  });
}).catch(error => console.log('Unable to get home record', error));
