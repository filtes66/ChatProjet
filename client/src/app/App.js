import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home';
import Chat from './components/Chat/Chat';
import "./components/Layout";
import "./components/Styles/App.css";

function LayoutComponent({ component: Component, layout: Layout }) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LayoutComponent component={Home} layout={Layout} />} />
        <Route path='/Login' element={<LayoutComponent component={Login} layout={Layout} />} />
        <Route path='/Register' element={<LayoutComponent component={Register} layout={Layout} />} />
        <Route path='/Chat' element={<LayoutComponent component={Chat} layout={Layout} />} />
      </Routes>
    </div>
  );
}

export default App;