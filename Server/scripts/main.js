var MongoClient = require('mongodb')//.MongoClient;
var assert = require('assert');
var http = require('http');
var fs = require('fs');

var ObjectId = require('mongodb').ObjectID;
var url = process.env.MONGOLAB_URI

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
			console.log("Found Document");

			if (callback!=null){
				callback(db,doc);
			}
		}
	});
};

function innerWorkings(db,req){
	console.log("In inner Workings");
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	var regex=/lon=([\-0-9\.]*)&lat=([\-0-9\.]*)/
        var res = body.match(regex);
        updateLocation(db,res[1],res[2], function(db){
        		console.log("After UpdateLocation");
        	findDocuments(db, function(db,doc){
        		console.log(doc);
        	});
        });
    });
}

function handleRequest(req, res){
	if (req.method == 'POST') {
		console.log("Got a POST");
		db=DB;
		innerWorkings(db,req);
		res.setHeader("Access-Control-Allow-Origin", "*");
	    res.end('It Works!! Path Hit: ' + req.url);
	}
	else if (req.method == 'GET') {
	    res.end('It Works!! Path Hit: ' + req.url);
	}
	else{
		console.log("Got a something else!");
	}
}

module.exports={
	updateLocation: updateLocation,
	findDocuments: findDocuments
};

MongoClient.connect(url,{}, function(err, db) {
	DB=db;
	assert.equal(null, err);
	console.log("Connected correctly to server.");

	const PORT=process.env.PORT || 8080; 

		//Create a server
	var server = http.createServer(handleRequest);

	//Lets start our server
	server.listen(PORT, function(){
	    //Callback triggered when server is successfully listening. Hurray!
	    console.log("Server listening on: http://localhost:%s", PORT);

	});

});