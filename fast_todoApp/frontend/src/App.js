import React from 'react';
import Auth from './components/Auth';
import Task from './components/Task';
import Notification from './components/Notification';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <Auth />
        <Task />
        <Notification />
      </main>
    </div>
  );
}

export default App;
