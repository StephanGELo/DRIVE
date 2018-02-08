
const data = require('../dataGeneration.js');
const Koa = require('koa');
//const bodyParser = require('koa-bodyparser');
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
    const k = helpers.getRandomNum(5);
    return [
    (Math.random() * (data.cities[k]['lattitudes'][1] - data.cities[k]['lattitudes'][0]) + data.cities[k]['lattitudes'][0]).toFixed(2) * 1,
    (Math.random() * (data.cities[k]['lattitudes'][1] - data.cities[k]['lattitudes'][0]) + data.cities[k]['lattitudes'][0]).toFixed(2) * 1
    ];
  },

  generateRandomTime: () => {
    (Math.random() * (data.timeFrame['jan02'] - data.timeFrame['jan01']) + data.timeFrame['jan01']).toFixed(0) * 1;
  },

  fetchData: () => {

  // check on data type - a possible way is to save the value to another variable.
    return {
      'riderid': this.getRandomNum(5000000),
      'time': this.generateRandomTime(),
      'drivers': [this.getRandomNum(i*0.25), this.getRandomNum(i),this.getRandomNum(i*0.75)],

      'end': getRandomLocation(),
      'start': getRandomLocation(),
    }
  },

} // end of helpers

const handlers = {

  GET: {
    // select a driver from the list randomly
    selectDriver: (rideOffer) => {
      let drivers = rideOffer.drivers;
      let newIndex = helpers.getRandomNum(drivers.length);
      console.log("In handlers @ line 15 newIndex=", newIndex);
      const aptDriver = drivers[newIndex];
    },

    getDriverToDispatch : (ctx, next) => {
      return db.getActiveDrivers(ctx.params.time).then(function(drivers) {
        if (drivers.length === 0) {
          return ctx.status = 404;
        } else {
          ctx.body = drivers;
        }
        next();
      });
    },

    getDriverStatusToPricing : (ctx, next) => {
      db.getDriverStatus(ctx.params.time).then(function(drivers) {
         if (drivers.length === 0) {
          return ctx.status = 404;
         } else {
          var status = {};

          ctx.body = drivers;
         }
      });
    },


  }, // end of GET

 POST: {
    postRideOffersToDrivers: (ctx, next) => {

    },

  }, // end of POST

  PUT: {
    updateDriverRecord: (ctx, next) => {

    }
  }

};

module.exports = {
  handlers,
  helpers,
}

// const riderid = 4379200;
//   const time = 151478600;
//   const drivers = [4941600];
//   const end = [39.72999954223633, 39.70000076293945];
//   const start = [40.66999816894531, 40.709999084472656];