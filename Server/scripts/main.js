var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var ObjectId = require('mongodb').ObjectID;


var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	insertDocument(db, function() {
	      findDocuments(db);
	      // db.close();
	});
});

var findDocuments = function(db) {
	console.log("Finding");
	var cursor =db.collection('locations').find();
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
		 console.dir(doc);
		} else{
			console.log("null!");
			db.close();
		}
	});
};

var insertDocument = function(db, callback) {
	var rnd=Math.round(Math.random()*10);
	db.collection('locations').update( 
		{"name":"locations"},	
		{
			"name" : "locations",
			"a_location": rnd
		},
		{upsert:true},
	 function(err, result) {
	    assert.equal(err, null);
	    console.log("Updated a_location in the locations collection.");
	    callback(result);
  	});
};


//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});