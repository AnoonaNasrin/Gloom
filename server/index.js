const express = require("express");
const config = require("./config/app");
const router = require("./router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const SocketServer = require("./socket/socket");
const { ExpressPeerServer } = require("peer");

const app = express();

const server = require("http").Server(app);

//connect into database //
const uri = config.mongoUri;
mongoose.connect(uri, (err) => {
  if (err) throw err;
  console.log("database successfully connected");
});

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000000 })); // decoding data from url coming by post request //
app.use(bodyParser.json({ limit: "50mb" })); // json data will be transfer to req.body //
app.use(router);

SocketServer(server);
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/peerjs", peerServer);

const port = config.appPort;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
