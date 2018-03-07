
const redis = require('redis');
const redisClient = redis.createClient({host: 'localhost', port: 6379});
redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.on('error', () => {
  console.log('Error in Redis');
});

const setActiveRedDrivers = (time, activeDrivers) => {
  return redisClient.set(time, activeDrivers);
}

const getActiveRedDrivers = (time, cb) => {
  return redisClient.get(time, cb);
}




module.exports = {
  setActiveRedDrivers,
  getActiveRedDrivers
 };





// redisClient.on('connect', function() {
//   console.log('Connected to Redis...');
// })
// const setPMO = function(pMO) {
//   let saveArray = ['pMO'];
//   for (var key in pMO) {
//     saveArray.push(key);
//     saveArray.push(pMO[key]);
//   }
//   return redisClient.hset(saveArray);
// }
// const getPM = function(zone) {
//   return redisClient.hget('pMO', zone);
// }
// const login = function(riderId, loginRecord) {
//   return redisClient.set(riderId, loginRecord);
// }
// const acceptReply = function(riderId) {
//   return redisClient.get(riderId);
// }
// const deleteActiveRider = function(riderId) {
//   return redisClient.del(riderId);
// }
// module.exports = {
//   setPMO,
//   getPM,
//   login,
//   acceptReply,
//   deleteActiveRider
// }