import React from 'react';
import './App.css';
import Todo from './Components/Todo';


function App() {
  return (
      <div className="App">
          <h2 className="logoToDo">
              <i>To Do List - React JS / Functional</i>
          </h2>
          <Todo />
      </div>
  );
}

export default App;