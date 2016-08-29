var express = require('express');
var app = express();
var path    = require("path");


app.use(express.static(path.join(__dirname, 'public')));
/*
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
*/


var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
   Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
   Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
   Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
   North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
   South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
   Wisconsin, Wyoming_';

var aState = allStates.split(/, +/g).map( function (state) {
   return {
      name: state,
      value: state.toLowerCase(),
      visible: true
   };
});
 


app.get('/state', function (req, res) {
  if(!req.query.state) {
    res.send("Hali, enter a state, please!");    
  } else {
    var pat = new RegExp('^' + req.query.state, "i");

    setTimeout( function() {  
        res.send(aState.filter(function(item) { 
            return pat.test(item.value); 
          })
        );
    }, 500);
  }

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});