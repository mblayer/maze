import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleSolucion = this.handleSolucion.bind(this);
    this.handleClearMaze = this.handleClearMaze.bind(this);
  }

  handleSolucion() {
    // eslint-disable-next-line react/prop-types
    this.props.handleSolucion({ resolveMaze: false });
  }

  handleClearMaze() {
    // eslint-disable-next-line react/prop-types
    this.props.handleClearMaze({ clearMaze: true });
  }

  render() {
    return (
      <nav className={this.props.isMenuOpen ? 'NavVisible' : 'NavHidden'}>
        <section className="menu">
          <h1>Maze</h1>

          <p className="counter">{this.props.countMoves}</p>
          <p className="moves">Moves</p>

          <button
            id="solution"
            onClick={() => {
              this.handleSolucion();
            }}
          >
            Resolve
          </button>
          <button
            id="clear"
            onClick={() => {
              this.handleClearMaze();
            }}
          >
            Restart
          </button>
        </section>
        <section>
          <a href="https://github.com/mblayer/maze" target="_blank" rel="noreferrer">
            Github
          </a>
        </section>
      </nav>
    );
  }
}

NavBar.propTypes = {
  countMoves: PropTypes.number,
  isMenuOpen: PropTypes.bool,
};
