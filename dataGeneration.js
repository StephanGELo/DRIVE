var fs = require('fs');

var wstream = fs.createWriteStream('activeDriverData2.csv');

var cities = {
  'San Francisco' : {
    lattitudes: [37.73, 37.83],
    longitudes: [122.37, 122.47]
  },

  'Seattle' : {
    lattitudes: [47.56, 47.66],
    longitudes: [122.28, 122.38]
  },
  'Los Angeles' : {
    lattitudes: [34, 35],
    longitudes: [122.37, 122.47]
  },
  'Miami' : {
    lattitudes: [25.71, 25.81],
    longitudes: [80.14, 80.24]

  },
  'New York' : {
    lattitudes: [40.66, 40.76],
    longitudes: [73.96, 74.04]
  }
}

var timeFrame = {
  'jan01' : 1514764800,
  'jan02' : 1514851200
}

var driverId = 2500000;

var generateDriverIds = function() {
  return driverId += 1;
}

for (var k in cities) {
  for (var i = 0; i < 500000; i++) {
    var start = [(Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1, (Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1];
    var time = (Math.random() * (timeFrame['jan02'] - timeFrame['jan01']) + timeFrame['jan01']).toFixed(0) * 1;
    wstream.write(time + ';' + generateDriverIds() +';'+ JSON.stringify(start) + '\n');
  }
}

wstream.end();
