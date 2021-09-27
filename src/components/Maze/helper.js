import { resolveMaze, getShortestPath } from './resolveMaze';

const animatePath = (nodesInOrder) => {
  const speedAnimationResolve = 200;
  for (let i = 0; i < nodesInOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInOrder[i];
      let cellObject = document.getElementById(`cell-${node.column}-${node.row}`);
      cellObject.className = `${cellObject.className} self-resolved`;
    }, speedAnimationResolve * i);
  }
};

export function visualizeSolution(data) {
  let finishCell = {};
  let cellPointA = document
    .getElementById('cell-0-1')
    .classList.contains('startNode');

  let cellPointB = document
    .getElementById('cell-10-11')
    .classList.contains('startNode');

  if (cellPointA) {
    finishCell = { column: 10, row: 11 };
  } else if (cellPointB) {
    finishCell = { column: 0, row: 1 };
  } else {
    resolveMaze(data, data[0][1], data[10][11]);
    finishCell = { column: 10, row: 11 };
  }

  const nodesInOrder = getShortestPath(data[finishCell.column][finishCell.row]);
  animatePath(nodesInOrder);
}

export function handleClick(e, data) {
  const [, currentNodeColumn, currentNodeRow] = e.target.id.split('-');

  const currenNode = document.getElementById(
    `cell-${data[currentNodeColumn][currentNodeRow].column}-${data[currentNodeColumn][currentNodeRow].row}`
  );

  const previusNode = document.getElementById(
    `cell-${data[currentNodeColumn][currentNodeRow].previousNode?.column}-${data[currentNodeColumn][currentNodeRow].previousNode?.row}`
  );

  if (currenNode.id === 'cell-0-1') {
    resolveMaze(data, data[0][1], data[10][11]);
    let finishCell = document.getElementById('cell-10-11');

    if (!finishCell.classList.contains('startNode')) {
      let cellObject = document.getElementById(e.target.id);
      cellObject.className = `${cellObject.className} active startNode`;
      finishCell.className = `${finishCell.className} finishNode`;
      return { isCellGame: false, type: 'startNode' };
    }
  } else if (currenNode.id === 'cell-10-11') {
    resolveMaze(data, data[10][11], data[0][1]);

    let finishCell = document.getElementById('cell-0-1');
    if (!finishCell.classList.contains('startNode')) {
      let cellObject = document.getElementById(e.target.id);
      cellObject.className = `${cellObject.className} active startNode`;
      finishCell.className = `${finishCell.className} finishNode`;
      return { isCellGame: false, type: 'startNode' };
    }
  }

  const isCellGame = e.target.classList.contains('game');
  if (!isCellGame) {
    let cellObject = document.getElementById(e.target.id);
    cellObject.className = `${cellObject.className} temblor`;
    setTimeout(() => {
      const classesOutPlayerClass = cellObject.className.replace('temblor', '');
      cellObject.className = `${classesOutPlayerClass}`;
    }, 200);
    return { isCellGame: false, type: 'wall' };
  }

  const isActivePreviusNode = previusNode?.classList.contains('active');
  const IsCurrentNodeFinish = currenNode?.classList.contains('finishNode');
  const IsCurrentNodeActive = currenNode?.classList.contains('active');

  if (isActivePreviusNode && !IsCurrentNodeActive) {
    if (IsCurrentNodeFinish) {
      return { isCellGame: false, type: 'finishNode' };
    }
    let cellObject = document.getElementById(e.target.id);
    cellObject.className = `${cellObject.className} active`;
    return { isCellGame: true, type: 'cellNode' };
  }
  return { isCellGame: false, type: 'null' };
}
