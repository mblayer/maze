import React, { Component } from 'react';
import './styles/App.css';
import Maze from './components/Maze';
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Maze />
      </div>
    );
  }
}
