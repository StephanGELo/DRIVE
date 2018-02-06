const cassandra = require('cassandra-driver');
const Long = require('cassandra-driver').types.Long;
// var async = require('async');

const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'drivers'});
//tracing on;

const query = 'select * from activedrivers where time=1514784578 LIMIT 60';
let db =  client.execute(query, { prepare: true }).then((drivers) => {
var collection = [];

  drivers.rows.forEach((driver) => {
    console.log(typeof driver.driverid);
    let driverid = Long.fromNumber(driver.driverid);
    let time = Long.fromNumber(driver.time);

    let activeDriverObj = {
      'driverid': driverid,
      'time': time,
      'location': driver.start
    }
    collection.push(activeDriverObj);
  //console.log('data is', result, activeDriverObj);
  });

  console.log("collection is", collection);
});

module.exports.db = db;