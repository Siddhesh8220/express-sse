const EventEmitter = require('events');
const express = require('express');
const app = express();


// SSE only supports one way communications 
const Stream = new EventEmitter(); // my event emitter instance

app.get('/stream', function(request, response){
  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  Stream.on("push", function(event, data) {
    response.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
  });
});

setInterval(function(){
  Stream.emit("push", "test", { msg: "admit one", time: new Date().getTime()});
}, 10000)


app.listen(3000, ()=>{
    console.log("listening on port 3000.😊")
})