var request = require('request');
var expect = require('chai').expect;

describe('server', function() {

  describe('basic server', function() {
    it('Should respond', function(done) {
      request('http://127.0.0.1:3000/', function(error, response, body) {
        expect(error).to.not.exist;
        done();
      });
    });
  });

  describe('GET requests to /driverToDispatch/1514784536', function() {
    it('should respond with a 200 status code', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        // console.log("in spec @ line 40",response.statusCode);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should indicate what type of data the response body contains', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        expect(response.headers).to.have.own.property('content-type', 'application/json');
        done();
      });
    });

    it('should send back parsable stringified JSON', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        expect(JSON.parse.bind(this, body)).to.not.throw();
        done();
      });
    });

    it('should send back an array', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(parsedBody).to.be.an('array');
        done();
      });
    });

    it('should send an array containing driver objects', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(parsedBody).to.be.an('array');
       // console.log("here in test",parsedBody);
        expect(parsedBody[0]).to.be.an('object');
        done();
      });
    });

    it('should send an array containing driver objects that have time, driverid, start', function(done) {
      request('http://127.0.0.1:3000/driverToDispatch/1514784536', function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(parsedBody).to.be.an('array');
        expect(parsedBody[0]).to.be.an('object');
        expect(parsedBody[0]).to.have.keys('time', 'driverid', 'start');
        done();
      });
    });
  });
});