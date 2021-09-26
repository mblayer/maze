import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class StartMaze extends Component {
  constructor(props) {
    super(props);
    this.handleStatusMaze = this.handleStatusMaze.bind(this);
  }
  handleStatusMaze() {
    // eslint-disable-next-line react/prop-types
    this.props.handleStatusMaze({ statusMaze: false });
  }

  render() {
    return (
      <section className="startMaze">
        <section>
          <h1>The Incredible Maze</h1>
          <ul className="guide">
            <li>
              Click on one of the entry points and find the best way to the exit
            </li>

            <li>
              If you can&#39;t find your way, use the RESOLVE button and it will
              guide you to the exit.
            </li>

            <li>If you want to play again, select RESTART.</li>

            <li>Enjoy the game ....</li>
          </ul>
        </section>
        <button id="start" className="buttonStart" onClick={this.handleStatusMaze}>
          Press to start
        </button>
      </section>
    );
  }
}

StartMaze.propTypes = {
  statusMaze: PropTypes.bool,
};
