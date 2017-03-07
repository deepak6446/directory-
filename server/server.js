'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
/*app.get('/', function(req, res){ 
    res.sendFile('/home/ubuntu/loopback/directory/directory-/client/index.html');
});*/
app.get('/', function(req, res){  
  console.log("in /");
  res.sendFile('/home/deepak/Desktop/loopbackex/directory/client/index.html');
});
/*app.get('/*', function(req, res){  
  console.log(req.url);
  var link=req.url;
  console.log(link.substring(1,4));
  if(link.substring(1,4)=='lib'){
    console.log('/home/deepak/Desktop/loopbackex/directory/client'+req.url)
    res.sendFile('/home/deepak/Desktop/loopbackex/directory/client'+req.url);
    app.use(express.static('/home/deepak/Desktop/loopbackex/directory/client'))
  }
  else if(link.substring(1,3)=='js'){
    console.log('/home/deepak/Desktop/loopbackex/directory/client'+req.url)
    //res.sendFile('/home/deepak/Desktop/loopbackex/directory/client'+req.url);
    app.use(express.static('/home/deepak/Desktop/loopbackex/directory/client'))


  }
  console.log("in /*");
  res.send("Hello");
})*/
/*app.use(function(req, res) {
    res.sendfile('/home/deepak/Desktop/loopbackex/directory/client/index.html');
});*/
console.log(__dirname - '/server');
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
