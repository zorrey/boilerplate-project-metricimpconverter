'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const GetNumUnit = require('../controllers/getNumUnit.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  let getNumUnit = new GetNumUnit();

  app .route('/api/convert/')
      .get((req, res) => {        
        console.log("input: ", req.query.input);  
        console.log("query: ", req.query);  
        
        let input = req.query.input;
        
         console.log("check unit: ", getNumUnit.checkUnit(input));
         console.log("check num: ", getNumUnit.checkNum(input));  
        console.log(convertHandler.getNum('2/5/1km'));
        
               // console.log(convertHandler.getNum(input));  
               // console.log(convertHandler.getUnit(input));  
        if(getNumUnit.checkNum(input) && getNumUnit.checkUnit(input)){
            let initNum = convertHandler.getNum(input);     
            let initUnit = convertHandler.getUnit(input); 
       
            console.log("?????",convertHandler.getReturnUnit(initUnit))
        
            console.log(initNum ," - ", initUnit);
            console.log("convertHandler : ", convertHandler.getNum(input));

            let returnNum = convertHandler.convert(initNum, initUnit);
            let returnUnit = convertHandler.getReturnUnit(initUnit);
   
   
            let returnString = 
     convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        
              console.log(initNum ," - ", initUnit);
              console.log("return string: ", returnString)
              //  if(!returnString) res.json("invalid input")
                
              //res.json(returnString);
           /*    console.log("result", {
                initNum: initNum, 
                initUnit: initUnit, 
                returnNum: returnNum, 
                returnUnit: returnUnit, 
                string: returnString
              }) */
              res.json( {
                initNum: initNum, 
                initUnit: initUnit == 'l' ? 'L':initUnit, 
                returnNum: parseFloat(returnNum), 
                returnUnit: returnUnit, 
                string: returnString
              })   
         } else {
           if(!getNumUnit.checkNum(input) && !getNumUnit.checkUnit(input))
             res.send("invalid number and unit");
           else if(!getNumUnit.checkUnit(input))  
             res.send("invalid unit");
              else res.send("invalid number");             
         }                 

      } )           
  
}
