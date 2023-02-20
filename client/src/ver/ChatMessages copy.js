import React, { useEffect, useState, useRef, useCallback } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Styles/Chat/ChatMessages.css";

function ChatMessages({ socket, receiver }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState({});

  const userN=useRef();
  const enableRender=useRef();

  const count = useRef(0);
  const isRegistered = useRef(false);

  const messageListUpdate = (messageList, sender, other, messageData) => {
    console.log("messageList", messageList)
   
  setMessageList((messageList) => {
   return !messageList[other]?.length ? (
        {...messageList,[other]:[{message:messageData.message, sender:sender, time:messageData.time}]} 
    ) : ( 
        {...messageList,[other]:[...messageList[other],{message:messageData.message, sender:sender, time:messageData.time}]}
    )
   })
  }

  // with hammer
    const sendMessage = async () => {
      if (currentMessage !== "admin") {
        console.log("currentmessage",currentMessage)
        const messageData = {
        sender: userN.current,
        receiver: receiver,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      messageListUpdate(messageList, messageData.sender, messageData.receiver, messageData)
      setCurrentMessage("");
  }};

  useEffect (() => {
    count.current++;
    if (count.current > 5) {
      const firstRegister = async () => {
      if (currentMessage == "admin" && !isRegistered.current) {
        await socket.emit("user_connected", "admin");
        isRegistered.current=true;
        userN.current="admin"
        count.current=0;
        enableRender.current=false;
      } 
      else if (!isRegistered.current) {
        const username= `user${Math.floor(Math.random() * 100000)}`;
        await socket.emit("user_connected",username);
        isRegistered.current=true;
        userN.current=username;
        count.current=0;
        enableRender.current=true;
      }}
      firstRegister();
    };
  },[currentMessage]);

  useEffect(() => {
    socket.on("new_message", (data) => {
      messageListUpdate(messageList, data.sender, data.sender, data);}
     )
     // listeners removed in the cleanedup step, in 
     // order to prevent multiple event registrations
     return (() =>socket.off("new_message"))
  },[]);
  
  return (
    <div className="main">
      <div className="chat-header">
        <h2>Chat with Vincent Porter</h2>
      </div>
      <ul className="chat">
          {!!Object.keys(messageList).length && (userN.current == "admin" && receiver != "admin" || userN.current != "admin") && messageList[receiver].map((messageContent, i) =>{
            return (
              <li
                key={i}
                className={messageContent.sender === userN.current ? "me" : "you"}
              >
            <div className="entete">
                <span className="status green"></span>
                <h2>{messageContent.author}</h2>
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
        <button onClick={currentMessage !== "admin" ? sendMessage : undefined}>send</button>
		</div>
    </div>
  );
}

export default ChatMessages;