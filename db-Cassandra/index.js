const cassandra = require('cassandra-driver');
// const async = require('async');

const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'drivers'});

/***************DB WORKERS *********************/
// const queryActiveDrId = 'SELECT * FROM activedrivers WHERE driverid= ?';

const getActiveDrivers = (time) => {
  const param =  [ parseInt(time) ];
  const query = `SELECT * from activedrivers WHERE time=${time}`;
  return client.execute(query).then((drivers) => {
    return drivers.rows;
  });
}

const getInactiveDrivers = (time) => {
  const param = parseInt(time);
  // console.log("on line 19 param is =", param);
  return client.execute(`SELECT * from inActiveDrivers WHERE time=${time}`).then((drivers) => {
    return drivers.rows;
  });
}

const saveRiderOffers = (rideOffer) => {
  const { riderid, time, drivers, end, start } = rideOffer;
  const query = 'INSERT INTO rideoffers (riderid, time, drivers, end, start) VALUES (?, ?, ?, ?, ?) IF NOT EXISTS;'
  const params = [riderid, time, drivers, end, start]
  client.execute(query, params, {prepare : true})
}

const deleteRecord = (driverid, table) => {
  console.log(table);
  const queryToDelete = `DELETE FROM ${table} WHERE driverid=? IF EXISTS`;
  const params = [ driverid ];
  client.execute(queryToDelete, params, { prepare : true });
}

const createRecord = (driverObj, table) => {
  const { time, driverid, start } = driverObj;
  const query = `INSERT INTO ${table} (time, driverid, start) VALUES (?, ?, ?) IF NOT EXISTS;`
  const params = [ time, driverid, start ];
  client.execute(query, params, { prepare : true });
}

module.exports = {
  saveRiderOffers,
  getActiveDrivers,
  getInactiveDrivers,
  deleteRecord,
  createRecord,
}


























//var query = 'UPDATE table SET columnName=? WHERE key=?';
//var query2 = 'INSERT INTO user_track (key, text, date) VALUES (?, ?, ?)';
// var query2 = 'INSERT INTO rideoffers\
//                  (riderid, time, drivers, end, start)\
//                  VALUES (4379169, 1514784578, [4941657],\
//                          [ 40.72999954223633, 40.70000076293945 ], [ 40.66999816894531, 40.709999084472656 ])\
//                  IF NOT EXISTS;  '
// var queries = [
//   { query: query1, params: [emailAddress, 'hendrix'] },
//   { query: query2, params: ['hendrix', 'Changed email', new Date()] }
// ];

// client.batch(queries, { prepare: true}, function (err) {
//   //all queries have been executed successfully
//   //or none of the changes have been applied (err)
// });


// const saveRiderOffers = function(rideOffer) {
//   const { riderid, time, drivers, end, start } = rideOffer;

//   client.execute('INSERT INTO rideoffers\
//                  (riderid, time, drivers, end, start)\
//                  VALUES (4379169, 1514784578, [4941657],\
//                          [ 40.72999954223633, 40.70000076293945 ], [ 40.66999816894531, 40.709999084472656 ])\
//                  IF NOT EXISTS;  ',). then()
// }


// const getInActiveDrivers = client.execute(queryToInActDrivers, { prepare: true }).then((drivers) => {
//   return drivers.rows;
// });

// client.execute('INSERT INTO rideoffers\
//                  (riderid, time, drivers, end, start)\
//                  VALUES (4379169, 1514784578, [4941657],\
//                          [ 40.72999954223633, 40.70000076293945 ], [ 40.66999816894531, 40.709999084472656 ])\
//                  IF NOT EXISTS;  ',). then()


// const queryToActDrivers = "SELECT count(*) FROM activedrivers WHERE time=? LIMIT 60";
// // const queryToInActDrivers = 'SELECT * FROM InActiveDrivers WHERE time=1514784578 LIMIT 60';
// // const queryB = 'SELECT * FROM activedrivers WHERE start[0] >= '?' && start[0] <'?'';
// // const queryByZone = 'SELECT * FROM inActiveDrivers WHERE start[0] >= '?' && start[0] <'?''

// // const getInactiveDrivers = client.execute(queryToInActDrivers, { prepare: true }).then((drivers) => {

// }