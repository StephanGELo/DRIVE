
const data = require('../dataGeneration.js');
const Koa = require('koa');
const bodyParser = require('koa-body-parser');

// app.use(bodyParser());
const Router = require('koa-router');
const http = require('http');
const handler = require('./handler.js');
const db = require('../db-Cassandra/index.js');
const request = require('request-promise');
const rawBody = require('raw-body');

const helpers = {
  getRandomNum : (max) => {
     return Math.floor(Math.random() * Math.floor(max));
  },

  getRandomLocation: () => {
    const cities =
    [ {
        'San Francisco' : { lattitudes: [37.73, 37.83],longitudes: [122.37, 122.47] }
      },
      {
        'Seattle' : { lattitudes: [47.56, 47.66],longitudes: [122.28, 122.38] }
      },
      {
        'Los Angeles' : { lattitudes: [34, 35],longitudes: [122.37, 122.47] }
      },
      {
         'Miami' : { lattitudes: [25.71, 25.81],longitudes: [80.14, 80.24] }
      },
      {
        'New York' : { lattitudes: [40.66, 40.76],longitudes: [73.96, 74.04] }
      }
    ];

    const k = helpers.getRandomNum();
    return [
    (Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1,
    (Math.random() * (cities[k]['longitudes'][1] - cities[k]['longitudes'][0]) + cities[k]['longitudes'][0]).toFixed(2) * 1
    ];
  },

  generateRandomTime: () => {
    (Math.random() * (data.timeFrame['jan02'] - data.timeFrame['jan01']) + data.timeFrame['jan01']).toFixed(0) * 1;
  },

  fetchData: () => {
    const offers = [];
    let id = 10000000;

  // check on data type - a possible way is to save the value to another variable.
    let match = {
      'riderid': helpers.getRandomNum(5000000),
      'time': helpers.generateRandomTime(),
      'drivers': [helpers.getRandomNum(id*0.25), helpers.getRandomNum(id), helpers.getRandomNum(id*0.75)],

      'end': helpers.getRandomLocation(),
      'start': helpers.getRandomLocation(),
    }

    for (let i = 0; i < 10; i++) {
      offers.push(match);
    }

    return offers;
  },

} // end of helpers

const handlers = {

  GET: {
    // select a driver from the list randomly
    selectDriver: (rideOffers) => {
      return rideOffers.map((rideOffer) => {
        let drivers = rideOffer.drivers;
        let newIndex = helpers.getRandomNum(drivers.length);
        console.log("In handlers @ line 15 newIndex=", newIndex);
        const aptDriver = drivers[newIndex];
        rideOffer.drivers = [aptDriver];
      return rideOffer;
      });
    },

    // every 3600 seconds send a list of drivers to dispatch service
    getDriverToDispatch : async (ctx, next) => {
      // console.log("you are in handler @ line 57 time=", ctx.params.time, ctx);
      return db.getActiveDrivers(ctx.params.time).then((drivers) => {
        if (drivers.length === 0) {
        } else {
          ctx.set('content-type', 'application/json');
          ctx.response.statusCode = 200;
          ctx.body = JSON.stringify(drivers);


        }
        next();
      });
    },

    // every 3600 seconds send pricing a list of active and inactive drivers
    getDriverStatusToPricing : async (ctx, next) => {
      let time = ctx.params.time;
      try {
        let activeDrivers = await db.getActiveDrivers(time);
        let inactiveDrivers = await db.getInactiveDrivers(time);
        ctx.body = JSON.stringify([activeDrivers, inactiveDrivers]);
      } catch (err) {
        console.log('There is an error:', err.message);
      };
    },


  }, // end of GET

 POST: {
    postRideOffersToDrivers: (ctx, next) => {
      const rideOffers = handlers.GET.selectDriver(ctx.request.body);

      console.log("on line 119", rideOffers);

      try {
        rideOffers.forEach((rideOffer) => {
          db.saveRiderOffers(rideOffer);
        });

      } catch (err) {
        console.log('There is an error:', err.message);
      };
    },

  }, // end of POST

  PUT: {
    updateDriverRecord: (ctx, next) => {

    }
  }


}

module.exports = {
  handlers,
  helpers,
}