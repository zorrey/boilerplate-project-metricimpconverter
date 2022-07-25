function getNumUnit(info){
  const regex = /([^\d*\.?\d+]|[^\d+\.?\d*]+)([a-zL]+)/;
  let answer = info.match(regex);
  let num = answer[0];
  let unit = answer[1];
  console.log(`num = ${number}; unit = ${unit}`);
  return answer;
}


function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = (getNumUnit(input))[0];
    
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result = (getNumUnit(input))[1].toLowerCase();
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {

    let result = initUnit == "km" ?  "mi" : 
                  initUnit == "mi" ? "km"  :
                  initUnit == "l"   ? "gal" :
                  initUnit == "gal"  ? "L" :
                  initUnit == "lbs" ? "kg":
                  initUnit == "kg" ? "lbs" : undefined;
    
    return result;
  };

  this.spellOutUnit = function(initUnit) {
    let result =  initUnit == "km" ?  "kilometers" : 
                  initUnit == "mi" ? "miles"  :
                  initUnit == "l"   ? "liters" :
                  initUnit == "gal"  ? "gallons" :
                  initUnit == "lbs" ? "kilograms":
                  initUnit == "kg" ? "pounds" : "not sure";;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit){
      case "km": result = initNum / miToKm; break; 
      case "mi": result = initNum * miToKm; break;
      case "l": result = initNum / galToL; break;
      case "gal": result = initNum * galToL; break;
      case "lbs": result = initNum * lbsToKg; break;
      case "kg": result = initNum / lbsToKg; break;
      default: undefined;
      
    }
    
    
    return parseFloat(result).toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {


    let result = `${initNum} ${this.spellOutUnit(initUnit)} convert to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
