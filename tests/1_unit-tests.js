const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  //#1 - #6
  suite('Test convertHandler.getNum(input)', function(){
    test('whole number', function(done){
      let input = "13mi";
      assert.equal(convertHandler.getNum(input), 13);
      done();
    });
    //#2
    test('decimal number', function(done){
      let input = "62.8km";
      assert.equal(convertHandler.getNum(input), 62.8);
      done();
    });
    //#3
    test('fractional input', function(done){
      let input = "5/2km";
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    });
    //#4
    test('fractional input with a decimal', function(done){
      let input = "4.2/2.1km";
      console.log(convertHandler.getNum(input));
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    //#5
    test('error on a double-fraction', function(done){
      let input = "4/2/1kg";
      assert.equal(convertHandler.getNum(input), null);
      done();
    });
    //done();
  })

});