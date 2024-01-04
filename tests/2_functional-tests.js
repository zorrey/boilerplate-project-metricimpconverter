const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Integration tests with chai-http', function () {
    // #1
    test('Convert input 10L: GET request to /api/convert.', 
          function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input:'10L'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum,2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });
    // #2
    test('Convert invalid input 32g: GET request to /api/convert', 
          function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input:'32g'})        
        .end(function (err, res, body) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit' );
          done();
        });
    });
    // #3
    test('Convert invalid input 3/7.2/4kg: GET request to /api/convert', 
          function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input:'3/7.2/4kg'})        
        .end(function (err, res, body) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number' );
          done();
        });
    });
    // #4
    test('Convert invalid input 3/7.2/4kilomegagram: GET request to /api/convert', 
          function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input:'3/7.2/4kilomegagram'})        
        .end(function (err, res, body) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit' );
          done();
        });
    });
    // #5
    test('Convert invalid input kg: GET request to /api/convert', 
          function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input:'kg'})        
        .end(function (err, res, body) {
          //console.log("body-------",res.body, "text-----",res.text)
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1 );
          assert.equal(res.body.initUnit, 'kg' );
          assert.equal(res.body.returnUnit, 'lbs' );
          assert.approximately(res.body.returnNum, 2.20462, 0.01 );
          done();
        });
    });
  });
});
