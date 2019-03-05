var url = require("url");

// för mongo db
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/chatboard"; // vet ej om detta korrekt

async function insertChatboard(dsn, message) {
    const client = await mongo.client(dsn);
    const db = await client.db();
    const col = await db.collection("chat");
    await col.insertOne(message)
    await client.close();
}


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
            //insertChatboard("mongodb://localhost:27017/chatboard", JSON.parse(message) );
            insertChatboard("mongodb://localhost:27017/chatboard", "{ name: 'Buggaren'}" );
            //skicka meddelandet till databasen oxå!
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
