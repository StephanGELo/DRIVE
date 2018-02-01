var cassandra = require('cassandra-driver');
var async = require('async');

//var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'drivers1'});
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:'],keyspace: 'drivers1' });
client.connect(function (err) {
  assert.ifError(err);
});



DROP KEYSPACE IF EXISTS drivers1;
CREATE KEYSPACE drivers1 with replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE drivers1;

DROP TABLE IF EXISTS activeDrivers;

CREATE TABLE activeDrivers (
  driverid int,
  start int,
  time int,
  PRIMARY KEY (driverId)
  );


INSERT INTO activeDrivers (driverid, start, time) VALUES(00000001, 100, 15000);
INSERT INTO activeDrivers (driverid, start, time) VALUES(00000002, 200, 35000);
