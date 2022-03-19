import React from 'react';
import Button from './components/Button';
import './index.css';

function App() {
  return (
    <>
      <h1 className="bg-slate-800 text-yellow-200">Welcome to React Vite Micro App!</h1>
      <p className="test">Hard to get more minimal than this React app.</p>
      <Button>Hello, world</Button>
    </>
  );
}

export default App;
