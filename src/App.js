import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas lineWidth="10" strokeStyle="#fff" />
    </div>
  );
}

export default App;
