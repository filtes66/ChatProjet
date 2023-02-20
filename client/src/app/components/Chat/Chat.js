//import "./App.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import ChatUsers from "./ChatUsers";
import "../Styles/Chat.css";

const socket = io.connect("http://localhost:3001", {'force new connection': true});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function Chat() {
  const [receiver, setReceiver] = useState({usernameSelected:"room", privateChat:false});
  const [usersConnectedList, setUsersConnectedList] = useState([]);
  const [privateMessage, setPrivateMessage] = useState("");
  console.log("usersconnectedlist", usersConnectedList);
  const location = useLocation();
  console.log("location", location.state.username, location.state.room.value)

  useEffect(() => {
    const emitRec = async()=> {
      console.log("location", location.state.username, location.state.room.value)
      if (location.state.username !== "" && location.state.room.value !== "") {
        await socket.emit("join_room", location.state);
      }
    // listen from server
     await socket.on("join_room", (usernameReceived) => {
        console.log("join_room", usernameReceived)
        setUsersConnectedList((list) => [...list, usernameReceived])
      })

     await socket.on('users_room', (users) => {
        console.log('users_room', users);
        console.log("[...list, ...users]",[...usersConnectedList, ...users])
        setUsersConnectedList((list) => [...users])
      })

      await socket.on("user_connected", (usernameReceived) => {
        console.log("connected",usernameReceived)
        setUsersConnectedList((list) => [...list, usernameReceived])
      })
    }
    emitRec();
    return (() => {socket.off("join_room")})
  },[]);

  const onUserSelected = (usernameSelected) => {
    console.log("privateMessage, location.state.username :",privateMessage, location.state.username)
    if (location.state.username === "admin" || privateMessage === location.state.username /*&& usernameSelected === "admin"*/)
      { setReceiver({usernameSelected: usernameSelected, privateChat :true}) };
    if (usernameSelected === "room") {setReceiver({usernameSelected: "room", privateChat:false})}
  }

  const isPrivateMessage = (data) => {
    console.log("data", data)
    setPrivateMessage(data);
  }

  console.log("receiver ", receiver)

  return (
    <div className="container">
      <ChatUsers
        usersConnectedList={usersConnectedList}
        onUserSelected={onUserSelected}
        privateMessage={privateMessage}
       />
      <ChatMessages
        socket={socket}
        receiver={receiver.usernameSelected}
        sender={location.state.username}
        room={location.state.room.value}
        privateChat={receiver.privateChat}
        isPrivateMessage={isPrivateMessage}
      />
    </div>
  );
}

export default Chat;