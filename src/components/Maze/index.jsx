import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import data from '../../data/data';
import './style.css';
import { visualizeSolution, handleClick } from './helper';
import NavBar from '../Navbar';
import StartMaze from '../StartMaze';

export default class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMaze: true,
      resolveMaze: false,
      clearMaze: false,
      count: 0,
      finishNode: '',
    };
    this.handleSolucion = this.handleSolucion.bind(this);
    this.handleClearMaze = this.handleClearMaze.bind(this);
    this.handleStatusMaze = this.handleStatusMaze.bind(this);
  }

  handleSolucion() {
    visualizeSolution(data);
  }
  handleClearMaze() {
    window.location.reload(false);
  }
  handleStatusMaze() {
    this.setState({ statusMaze: !this.state.statusMaze });
  }

  handleClickCell(e) {
    const isGameCell = handleClick(e, data);
    // eslint-disable-next-line react/no-direct-mutation-state
    if (isGameCell) this.setState({ count: ++this.state.count });
  }

  render() {
    return (
      <div className="container">
        {this.state.statusMaze ? (
          <StartMaze
            statusMaze={this.state.statusMaze}
            handleStatusMaze={this.handleStatusMaze}
          />
        ) : (
          <div className="containerNavMaze">
            <NavBar
              resolveMaze={this.state.resolveMaze}
              handleSolucion={this.handleSolucion}
              clearMaze={this.state.resolveMaze}
              handleClearMaze={this.handleClearMaze}
              countMoves={this.state.count}
            />
            <section className="containerCells">
              {data.map((rowY, indexY) => (
                <Fragment key={`x-${indexY}`}>
                  {rowY.map((rowX) => (
                    <div
                      onClick={(e) => this.handleClickCell(e)}
                      className={`cell ${rowX.isWall ? 'barrer' : 'game'}`}
                      key={`cell-${rowX.column}-${rowX.row}`}
                      id={`cell-${rowX.column}-${rowX.row}`}
                    />
                  ))}
                </Fragment>
              ))}
            </section>
          </div>
        )}
      </div>
    );
  }
}

Maze.propTypes = {
  countMoves: PropTypes.number,
  statusMaze: PropTypes.bool,
  resolveMaze: PropTypes.bool,
  clearMaze: PropTypes.bool,
  count: PropTypes.number,
  finishNode: PropTypes.string,
};
