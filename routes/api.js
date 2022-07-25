'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app .route('/api/convert/')
      .get((req, res)=>{
        console.log(req.query.input);

        let input = req.query.input;

        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);    
        console.log(initNum ," - ", initUnit);
        console.log(convertHandler.getNum(input));

        if(!initNum && !initUnit) res.send("invalid Number&Unit");
        if(!initNum)  res.send("invalid Number");
        if(!initUnit)  res.send("invalid Unit");

        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
          console.log(initNum ," - ", initUnit);
          console.log(returnString)
          if(!returnString) res.json("invalid input")
         else{
          res.send(returnString);
          res.json({
             initNum: initNum, 
             initUnit: initUnit, 
             returnNum: returnNum, 
             returnUnit: returnUnit, 
             string: returnString
          })
        }


      })


};
