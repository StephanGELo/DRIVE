const newrelic = require('newrelic');
const Koa = require('koa');
//const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const http = require('http');
const handler = require('./handler.js');
const db = require('../db-Cassandra/index.js');
const request = require('request-promise');
const rawBody = require('raw-body');
const bodyParser = require('koa-body-parser');



const app = new Koa();
const router = new Router();
app.use(bodyParser());

// send list of active drivers to dispatch service
router.get('/driverToDispatch/:time', handler.handlers.GET.getDriverToDispatch);

// send list of active and inactive drivers to pricing service every one minute
router.get('/driverStatusToPricing/:time', handler.handlers.GET.getDriverStatusToPricing);

// get rideOffers from dispatch office for selecting driver and save the offer to db
// send both active and inactive drivers
router.post('/rideOffersToDrivers', handler.handlers.POST.postRideOffersToDrivers);

// update driver location & time if already exists or add as new driver if not in database (as per Fred's comments)
router.put('/driverlogin',handler.handlers.PUT.addToActiveDrivers);

// check if driver is in db as active, Delete from db if it is. Add driver as inactive.
router.put('/driverlogOff',handler.handlers.PUT.addToInactiveDrivers);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () =>  {
  console.log("Listening on port 3000")
});