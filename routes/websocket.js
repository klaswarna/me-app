var url = require("url");

websocket = function (ws, req, wss){
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share
    // sessions or req.headers.cookie
    // (see http://stackoverflow.com/a/16395220/151312)

    // console.log("Connection received. Adding client.");
    // console.log("location...............");
    // console.log(location);
    // console.log("ws...............");
    // console.log(ws);
    // console.log("req...............");
    // console.log(req);

    //wss.broadcastExcept(ws, `New client connected (${wss.clients.size}).`); // här kan man skicka att ny ansluten

    // ws.on("message", (message) => {
    //     console.log("Received: %s", message);
    //     ws.send(message);
    // });

    ws.on("message", (message) => {
            console.log("Received: %s", message);
            wss.broadcastExcept(ws, message);
        });


    ws.on("error", (error) => {
        console.log(`Server error: ${error}`);
    });

    ws.on("close", (code, reason) => {
        console.log(`Closing connection: ${code} ${reason}`);
    });
    return
};


module.exports = {
    websocket: websocket
};
