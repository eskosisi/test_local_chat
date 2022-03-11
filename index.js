const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(3000);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

connections = [];

io.sockets.on("connection", function (socket) {
  console.log("Successfull connection!");
  connections.push(socket);

  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected!");
  });

  socket.on("send mess", function (data) {
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
      className: data.className,
    });
  });
});
