import React, { Component } from 'react';
import TodoApp from './components/TodoApp'
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <TodoApp/>
      </div>
    );
  }
}

export default App;