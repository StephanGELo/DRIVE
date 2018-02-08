
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


CREATE TABLE drivers.rideoffers (
    riderid bigint,
    time bigint,
    drivers list<bigint>,
    end list<float>,
    start list<float>,
    PRIMARY KEY (riderid, time)
    );

INSERT INTO rideoffers (riderid, time, drivers, end, start) VALUES (4379169, 1514784578, [4941657], [ 40.72999954223633, 40.70000076293945 ], [ 40.66999816894531, 40.709999084472656 ]) IF NOT EXISTS;



// ////////***** Data injection into the Database 'drivers';*******////////
// /*
// copy activedrivers from '/Users/Blackeagle/Desktop/DRIVE/driversData/activeDriverData2.csv' with delimiter =';';//
// copy activedrivers from '/Users/Blackeagle/Desktop/DRIVE/driversData/activeDriverData2.csv' with delimiter =';';
// copy activedrivers from '/Users/Blackeagle/Desktop/DRIVE/driversData/inActiveDriverData1.csv' with delimiter =';';
// copy activedrivers from '/Users/Blackeagle/Desktop/DRIVE/driversData/inActiveDriverData2.csv' with delimiter =';';


//  activeDriverData1.csv = 4 minutes - 2.5M rows
//  activeDriverData2.csv = 4 minutes - 2.5M rows
//  inActiveDriverData1.csv = 4 minutes - 2.5M rows
//  inActiveDriverData2.csv = 4 minutes - 2.5M rows



//Possible Query
// select driverid from activedrivers where time= 1514784575 ALLOW FILTERING


//module.exports.db = db;