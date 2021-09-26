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
        <button id="start" className="buttonStart" onClick={this.handleStatusMaze}>
          Press to start
        </button>
        <section>
          <ul className="guide">
            <li>Select with the mouse any of the 2 possible entries</li>
            <li>Then you can only select the box after one already selected.</li>
            <li>Follow the path to be able to solve the maze.</li>
            <li>
              If you cannot solve it, you can request the answer with the Resolve
              button.
            </li>
            <li>If you want to play again, select restart.</li>
            <p>Enjoy the game....</p>
          </ul>
        </section>
      </section>
    );
  }
}

StartMaze.propTypes = {
  statusMaze: PropTypes.bool,
};
