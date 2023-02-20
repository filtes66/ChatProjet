import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home';
import Chat from './components/Chat/Chat';
import "./components/Styles/App.css";

function App() {
  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={Register} />
          <Route path='/Chat' element={<Chat />} />
        </Routes>
      </div>
  );
}

export default App;