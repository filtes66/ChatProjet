import React from 'react';
import "../Styles/ChatUsers.css";

function ChatUsers({usersConnectedList, onUserSelected, privateMessage}) {
  console.log("privatemessage", privateMessage)
  return (
      <div className="aside">
        <button onClick={() => onUserSelected("room")}><img src={require("../chat.png")} height="20px" alt="chatroom"/></button>
        <ul className="chat-users">
            {usersConnectedList.map((userConnected, j) => {
              return (
                <li key={j} className="user-connected" onClick={() => onUserSelected(userConnected)}>                
                  <img src={require("../avatar.png")} alt="user" />
                  <div>
                    <h2>{userConnected}</h2>
                    <h3>
                      <span className={userConnected==='admin' && privateMessage ? "status orange" : "status green"}></span>
                      online
                    </h3>
                  </div>
                </li>
              )
            }
            )}
        </ul>
      </div>
  );
}

export default ChatUsers;