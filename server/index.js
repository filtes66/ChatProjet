const express = require("express");
const app = express();
const jwt = require('express-jwt');
//const jsonwebtoken = require('jsonwebtoken');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

// Create a server that will serve both http and socket 
// connection using the app function of Express.js
const server = http.createServer(app);

//Pass the server to the socket.io to handle socket connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];
let users2 = [];
let messageList = {};
let users3 = [];
/*
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie.split("=")[1];
    await jwt.verify(token, process.env.SECRET, (err, decodedToken);
    next();
  } catch (err) {}

});*/

//app.use(cookieParser());
io.use(
  jwt({
    secret: 'secret123',
    getToken: req => req.cookies.token
  })
);

// This function will be executed every time a user 
// connect to the socket through the "/" express route
io.on("connection", (socket) => {
  // unique id for each user
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", async(data) => {
    socket.join(data.room.value);
    io.to(data.room.value).emit("join_room", data.username);
    users[data.username] = socket.id; 
    users3 = [...users];
    console.log("users3", users3);
    console.log("users", users);
    users2.push(data.username);
    console.log("users2", users2);
    socket.join(users[data.username]);
    io.to(users[data.username]).emit('users_room', users2);
  });

  // attach incoming listener for new user
  socket.on("user_connected", (username) => {
    // save in array
    users[username] = socket.id;
    users3 = [...users];
    console.log("users3", users3);
    console.log("users", users);
    // socket ID will be used to send message
    // to "admin" that a user has just connected
    socket.to(users["admin"]).emit("user_connected", username)

   // socket.to(users)

  });

  const listMessage = (sender, other, messageData) => {
    return !Object.keys(messageList).length ? (
      {...messageList,[other]:[{message:messageData.message, sender:sender, time:messageData.time}]} 
  ) : ( 
      {...messageList,[other]:[...messageList[other],{message:messageData.message, sender:sender, time:messageData.time}]}
  )
  }

  // listen from client inside IO "connection" event
  socket.on("send_message", (data) => {
    if (data.privateChat) {
     // allMessage.push(data)
      // send event to receiver
      let socketId = users[data.receiver]
      console.log("private_message 80",data)
      io.to(socketId).emit("private_message", data);
      console.log("data", data)
      io.to(users[data.sender]).emit("private_message", data);
    } else {
      let others = !!Object.keys(data.room) ? "room" : data.sender;
      io.to(data.room).emit("room_message", data);
      messageList = listMessage(data.sender,others, data);
    }
  });
/*
  socket.on("private_message", (data) => {
     // allMessage.push(data)
      // send event to receiver
      let socketId = users[data.receiver]
      console.log("private_message 80",data)
      io.to(socketId).emit("private_message", data);
  });
*/
 socket.on("all_message", (data)=> {
    let socketId = users[data];
    socket.emit('receive_all_message', messageList);
  })

  socket.on("disconnect", () => {
 /*   console.log("users3 ", users3);
    console.log("users3", users3)
    console.log("disconnected socket :",socket.id);
    const index1 = users3.indexOf(socket.id);
    console.log("index1 :",index1);
    const index2 = users2.indexOf(index1);
    console.log("index2 :", index2);
    users3 = users2.splice(index2, 1);
    console.log("users2 :", users2);*/
  });
});

// twilio requirements -- Texting API
const accountSid = '__YOUR__ACCOUNT__STD';
const authToken = '__YOUR__AUTHENTICATION__TOKEN';
const client = {accountSid, authToken};

app.use(express.json())

/*const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]*/

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

//set express routes
// Welcome Page to the Server
app.get('/', (req, res) => {
  res.send('Welcome to the Express Server')
})

//Twilio Text
app.get('send-text', (req, res) => {
  // GET variables passed by query string
  const { recipient, textmessage } = req.query;

  //Send Text
  client.messages.create({
    body: textmessage,
    to: recipient,
    from: '+....' //From twilio
  })
})

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});