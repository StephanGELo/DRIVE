
DROP KEYSPACE IF EXISTS drivers;

CREATE KEYSPACE drivers with replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE drivers;

DROP TABLE IF EXISTS activeDrivers;

CREATE TABLE activeDrivers (
  time bigint,
  driverid bigint,
  start list<float>,
  PRIMARY KEY (time, driverid)
);

CREATE TABLE inActiveDrivers (
  time bigint,
  driverid bigint,
  end list<float>,
  PRIMARY KEY (time, driverid)
  );


// ////////***** Data injection into the Database 'drivers';*******////////
// /*
//  copy activedrivers from '/Users/Blackeagle/Desktop/DRIVE/driversData/activeDriverData2.csv' with delimiter =';';

//  activeDriverData1.csv = 4 minutes - 2.5M rows
//  activeDriverData2.csv = 4 minutes - 2.5M rows
//  inActiveDriverData1.csv = 4 minutes - 2.5M rows
//  inActiveDriverData2.csv = 4 minutes - 2.5M rows



//Possible Query
// select driverid from activedrivers where time= 1514784575 ALLOW FILTERING


//module.exports.db = db;