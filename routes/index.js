var express = require('express')
var router = express.Router()
var view = require('../views')

router.get('/', async (req, res, next) => {
	// sendNotification(message);
  res.json(view([]))
})

var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic Y2E5ZjliNDctZmYzOC00NDVmLWIzODItYmZmNGMxYjAwMzZh"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};

var message = { 
  app_id: "bed7e669-3057-4f11-b27a-0586250aa0f1",
  contents: {"en": "English Message"},
  subtitle: {"en": "ini subtitle"},
  included_segments: ["All"]
};


module.exports = router
