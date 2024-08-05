#!/bin/bash

# Start the client:
start_client() {
    cd client
    npm start
}

# Start the server:
start_server() {
    cd server/src
    node index.js
}

start_server & start_client 

wait 

echo "All processes have ended"