import React, { useEffect, useState, useRef, useCallback } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../Styles/ChatMessages.css";

function ChatMessages({ socket, receiver, sender, room, privateChat, isPrivateMessage}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState({});

  const messageListUpdate = (sender, other, messageData) => {  
    setMessageList((messageList) => {
      console.log("other", other);
      console.log("messageList.other === undefined", messageList.hasOwnProperty(receiver));
      console.log("!Object.keys(messageList).length",!Object.keys(messageList).length)
      console.log("!Object.keys(messageList).length || messageList.hasOwnProperty(other)",!Object.keys(messageList).length || messageList.hasOwnProperty(other))
      return !Object.keys(messageList).length || !messageList.hasOwnProperty(other) ? (
          {...messageList,[other]:[{message:messageData.message, sender:sender, room: messageData.room.value, time:messageData.time}]} 
      ) : ( 
          {...messageList,[other]:[...messageList[other],{message:messageData.message, sender:sender, room: messageData.room.value, time:messageData.time}]}
      )
    })
  }

    const sendMessage = async () => {
    //  if (currentMessage !== "admin") {
        console.log("privatechat",privateChat)
        const messageData = {
          room: room,
          privateChat: privateChat,
          sender: sender,
          receiver: receiver,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        console.log("messageData", messageData)
      await socket.emit("send_message", messageData);
     // messageListUpdate(messageData.sender, messageData.receiver, messageData);
      setCurrentMessage("");
  }

  useEffect(() => {
    socket.on("room_message", (data) => {
      console.log("data", data)
      messageListUpdate(data.sender, "room", data);
      console.log("data.privateChat", data.privateChat)
    }
     )
     // listeners removed in the cleanedup step, in 
     // order to prevent multiple event registrations
     return (() => socket.off("room_message"))
  },[]);

  useEffect(() => {
    socket.on("private_message", (data) => {
      console.log("data", data)
      let other = data.sender === sender ? data.receiver : data.sender;
      messageListUpdate(data.sender, other, data);
      console.log("data.privateChat", data.privateChat)
      if (data.privateChat) {isPrivateMessage(data.receiver)};
    }
     )
     // listeners removed in the cleanedup step, in 
     // order to prevent multiple event registrations
     return (() => socket.off("private_message"))
  })

  useEffect(() => {
    const firstEmit = async() => {
     await socket.emit("all_message", sender);
     console.log("all message")
     await socket.on("receive_all_message", (data) => {
        console.log("all message", data)
        setMessageList((list) => {return {...list, ...data}});
      }
      )}
    firstEmit();
      
    return (() => socket.off("all_message"))
    },[])
  
  console.log("messagelist, !!Object.keys(messageList).length", messageList, !!Object.keys(messageList).length)
  console.log("receiver", receiver)
  return (
    <div className="main">
      <div className="chat-header">
        <h2>Chat with Vincent with {receiver}</h2>
      </div>
      <ul className="chat">
          {!!Object.keys(messageList).length && messageList.hasOwnProperty(receiver)  && messageList[receiver].map((messageContent, i) =>{
            return (
              <li
                key={i}
                className={messageContent.sender === sender ? "me" : "you"}
              >
            <div className="entete">
                <span className="status green"></span>
                <h2>{messageContent.sender}</h2>
                <h3>{messageContent.time}</h3>
            </div>        
                <div>
                  <div className="triangle"></div>
                  <div className="message">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="chat-footer">
        <textarea 
          value={currentMessage} 
          placeholder="Type your message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}>
          </textarea>
        <button onClick={sendMessage}>send</button>
		</div>
    </div>
  );
}

export default ChatMessages;