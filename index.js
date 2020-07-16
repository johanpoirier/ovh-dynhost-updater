const config = require(__dirname + '/config.json');
const ovh = require('ovh')({
  appKey: config.appKey,
  appSecret: config.appSecret,
  consumerKey: config.consumerKey
});

ovh.requestPromised('GET', `/domain/zone/${config.zone}/dynHost/record/${config.homeHost}`, {}).then(async homeRecord => {
  console.log('Home record', homeRecord);
  const updates = config.dynHosts.map(id => {
    return ovh.requestPromised('PUT', `/domain/zone/${config.zone}/dynHost/record/${id}`, {
      ip: homeRecord.ip
    })
      .then(() => console.log(`Record ${id} updated with IP ${homeRecord.ip}`))
      .catch(error => console.log(`Unable to update record ${id} with IP ${homeRecord.ip}`, error));
  });

  await Promise.all(updates);
  ovh
    .requestPromised('POST', `/domain/zone/${config.zone}/refresh`, {})
    .then(() => console.log(`Zone ${config.zone} refreshed.`))
    .catch(error => console.log(`Unable to refresh zone ${config.zone}`, error));

}).catch(error => console.log('Unable to get home record', error));
