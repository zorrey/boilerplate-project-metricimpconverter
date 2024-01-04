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
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    //#5
    test('error on a double-fraction', function(done){
      let input = "4/2/1kg";
      assert.equal(convertHandler.getNum(input), null);
      done();
    });
    //#6
    test('default to 1 when no num input is provided', function(done){
      let input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });  
    //done();
  });
  
   suite('Test convertHandler.getUnit(input)', function(){
      //#7
    test('correctly read each valid input unit', function(done){
      let input = [
                  {in : 'km', out: 'km'},
                   {in: 'mi', out: 'mi'},
                   {in:'gal', out:'gal'},
                   {in:'l', out:'L'},
                   {in:'kg', out:'kg'},
                   {in:'lbs', out:'lbs'}
                  ]; 
      input.forEach(el=>{
        assert.equal(convertHandler.getUnit(el.in), el.out);
        assert.equal(convertHandler.getUnit(el['in'].toUpperCase()), el.out);
      })      
      done();
    });
      //#8
    test('correctly read each valid input unit', function(done){
       let input = '6bukg'      
        assert.equal(convertHandler.getUnit(input), undefined);          
      done();
    });
   }); 
    suite('Test convertHandler.getReturnUnit(input)', function(){
      //#9
    test('correctly return each valid unit', function(done){
      let input = [
                  {in : 'km', out: 'mi'},
                   {in: 'mi', out: 'km'},
                   {in:'gal', out:'L'},
                   {in:'L', out:'gal'},
                   {in:'kg', out:'lbs'},
                   {in:'lbs', out:'kg'}
                  ]; 
      input.forEach(el=>{
        assert.equal(convertHandler.getReturnUnit(el.in), el.out); 
      });                 
      done();
    });
    });
   suite('Test convertHandler.spellOutUnit(input)', function(){
      //#10  
    test('correctly return each spell-out unit', function(done){
      let input = [
                  {in : 'km', spellout: 'kilometers'},
                   {in: 'mi', spellout: 'miles'},
                   {in:'gal', spellout:'gallons'},
                   {in:'L', spellout:'liters'},
                   {in:'kg', spellout:'kilograms'},
                   {in:'lbs', spellout:'pounds'}
                  ]; 
      input.forEach(el=>{
        assert.equal(convertHandler.spellOutUnit(el.in), el.spellout); 
      });                 
      done();
    });
   });

  suite('Test convertHandler.convert(input)',function(){
    // #11
    test('correctly convert gal to L', function(done){
      let input =  [5,'gal']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5*3.78541, 0.01);                      
      done();
    });
    // #12
    test('correctly convert L to gal', function(done){
      let input =  [5,'L']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5/3.78541, 0.01);                      
      done();
    });
    // #13
    test('correctly convert mi to km', function(done){
      let input =  [5,'mi']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5*1.60934, 0.01);                      
      done();
    });
    // #14
    test('correctly convert km to mi', function(done){
      let input =  [5,'km']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5/1.60934, 0.01);                      
      done();
    });
    // #15
    test('correctly convert lbs to kg', function(done){
      let input =  [5,'lbs']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5*0.453592, 0.01);                      
      done();
    });
    // #16
    test('correctly convert kg to lbs', function(done){
      let input =  [5,'kg']    
        assert.approximately(convertHandler.convert(input[0], input[1]), 5/0.453592, 0.01);                      
      done();
    });
  });

});