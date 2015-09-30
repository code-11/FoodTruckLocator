Technologies Required (Cold startup)
    npm
    node
    mongoDB
    Google Maps API
    phonegap
    android sdk (and all associated platforms for the version you want)
    


How to run:
run python -m SimpleHTTPServer, 
    This starts server on port 8000

run main.js from /Documents/startupSystems/FoodTruckLocator/Server/scripts$ node main.js 
    This starts a node server on port 8080

MongoDB service needs to be started on the computer

The front end gets the location every 3 minutes, when it does
    Dislplays to the screen
    Makes a POST request to the node server

The node server relays the latitude longitude info to the Mongo DB

Can manually make POST requests to 8080 to see results via postman.
