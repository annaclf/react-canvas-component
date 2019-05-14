import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas lineWidth="5" background="#000"/>
    </div>
  );
}

export default App;
