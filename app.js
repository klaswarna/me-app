const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 8333;

const bodyParser = require("body-parser");

const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');
const webs = require('./routes/websocket');

//för websocket
const http = require("http");
const url = require("url");
const Websocket = require("ws");
const server = http.createServer(app);
const wss = new Websocket.Server({
    server: server,
    clientTracking: true,
    handleProtocols: handleProtocols
});

process.env.JWT_SECRET="armavirumquecanotroiaequiprimusaborisitaliamfatoprofuguslaviniaquevenit";

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}



// This is middleware called for all routes. Måste ligga högst i koden om man vill att den alltid skall anropas före alla andra
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', index);
app.use('/reports', reports);
app.use('/register', register);
app.use('/login', login);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//så det blir json utskrift av felmeddelandena
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

//Bestämma subprotokoll
/**
 * Select subprotocol to use for connection.
 *
 * @param {Array} protocols              Subprotocols to choose from, sent
 *                                        by client request.
 * @param {http.IncomingMessage} request The client HTTP GET request.
 *
 * @return {void}
 */
function handleProtocols(protocols , request) {
    console.log(`Incoming protocol requests '${protocols}'.`);
    for (var i=0; i < protocols.length; i++) {
        if (protocols[i] === "text") {
            return "text";
        } else if (protocols[i] === "json") {
            return "json";
        }
    }
    return false;
}


// Broadcast data to everyone except one self (ws).
wss.broadcastExcept = (ws, data) => {
    let clients = 0;


    wss.clients.forEach((client) => {
        //if (client !== ws && client.readyState === Websocket.OPEN) { // för att inte skicka till sig själv
        if (client.readyState === Websocket.OPEN) { // för att även skicka till sig själv
            clients++;

            if(ws.protocol === "json") {
                let msg = {
                    timestamp: Date(),
                    data: data
                }
                client.send(JSON.stringify(msg));
            } else {
                client.send(data);
            }

        }
    });
    console.log(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
};



// Handle websocket requests
wss.on("connection", (ws, req) => {webs.websocket(ws, req, wss)});

// Startup server (med websocket)
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});


module.exports = server;
