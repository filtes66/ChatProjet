//import "./App.css";
import io from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [receiver, setReceiver] = useState("");
  
  const [userConnectedList, setUserConnectedList] = useState([]);
  console.log("app");

  //const receiver = useRef();

  useEffect(() => {
    // listen from server
     socket.on("user_connected", (usernameReceived) => {
      console.log("userconnected", usernameReceived);
       setUserConnectedList((list) => [...list, usernameReceived])
  })},[]);

  const onUserSelected = (usernameSelected) => {
    // save selected user in global variable
   // receiver.current = usernameSelected;
   setReceiver(usernameSelected);
  }

  const enterName = () => {
    if (username !== "") {
      socket.emit("user_connected", username);
      console.log("entername")
     // sender = username;
      setShowChat(true);
    }
  };

  return (
    <>
    <ul className="chat-users">
	     {userConnectedList.map((userConnected, j) => {
          return (
            <li key={j}  className="user-connected">
	          	<button onClick={() => onUserSelected(userConnected)}>
           			{userConnected}
		          </button>
	          </li>
          )
        }
        )};
      </ul>
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={enterName}>Enter name</button>
        </div>
      ) : (
        
        <Chat socket={socket} username={username} userConnectedList={userConnectedList} receiver={receiver} />
      )}

    </div>
  </>
  );
}

export default App;