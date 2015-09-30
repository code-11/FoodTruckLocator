var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var fs = require('fs');

var ObjectId = require('mongodb').ObjectID;
var url = process.env.DATABASE_URL;

var DB=null;

var updateLocation=function(db,lat,lon,callback){
	db.collection('locations').update( 
		{"name":"xxx"},	
		{
			"name" : "xxx",
			"lat": parseFloat(lat),
			"lon": parseFloat(lon)
		},
		{upsert:true},
	 function(err, result) {
	    assert.equal(err, null);
	    console.log("Updated xxx in the locations collection.");
	    if (callback!=null){
	    	callback(db);
		}
	    //findDocuments(db);
	    // db.close();
  	});
}


var findDocuments = function(db,callback) {
	var cursor =db.collection('locations').find(
		{"name":"xxx"}
	);
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			if (callback!=null){
				callback(db,doc);
			}
		}
	});
};

function innerWorkings(db,req){
	if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
        	var regex=/lon=([\-0-9\.]*)&lat=([\-0-9\.]*)/
            var res = body.match(regex);
            updateLocation(db,res[1],res[2], function(db){
            	findDocuments(db, function(db,doc){
            		console.log(doc);
            	});
            });
        });
    }
}

function handleRequest(req, res){
	if (req.method == 'POST') {
		db=DB;
		innerWorkings(db,req);
		res.setHeader("Access-Control-Allow-Origin", "*");
	    res.end('It Works!! Path Hit: ' + req.url);
	}
	// if (req.method == 'GET') {
	// 	var html = fs.readFileSync('../../Foodinator/www/index.html');
 //        res.writeHead(200, {'Content-Type': 'text/plain'});
 //        res.end(html);
	// }
}

module.exports={
	updateLocation: updateLocation,
	findDocuments: findDocuments
};

MongoClient.connect(url, function(err, db) {
	DB=db;
	assert.equal(null, err);
	console.log("Connected correctly to server.");

	const PORT=8080; 

		//Create a server
	var server = http.createServer(handleRequest);

	//Lets start our server
	server.listen(PORT, function(){
	    //Callback triggered when server is successfully listening. Hurray!
	    console.log("Server listening on: http://localhost:%s", PORT);

	});

});