export function resolveMaze(data, startNode, finishNode) {
  const orderVisited = [];
  startNode.distance = 0;
  const notVisited = getNodes(data);
  // eslint-disable-next-line no-extra-boolean-cast
  while (!!notVisited.length) {
    sortNodes(notVisited);
    const closestNode = notVisited.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return orderVisited;
    closestNode.isVisited = true;
    orderVisited.push(closestNode);
    if (closestNode === finishNode) return orderVisited;
    updateUnvisited(closestNode, data);
  }
}

export function getShortestPath(finishNode) {
  const nodesInOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInOrder;
}

function getNodes(maze) {
  const nodes = [];
  for (const row of maze) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisited(node, maze) {
  const unvisitedNear = getUnvisited(node, maze);
  for (const near of unvisitedNear) {
    near.distance = node.distance + 1;
    near.previousNode = node;
  }
}

function getUnvisited(node, maze) {
  const near = [];
  const { column, row } = node;
  if (column > 0) near.push(maze[column - 1][row]);
  if (column < maze.length - 1) near.push(maze[column + 1][row]);
  if (row > 0) near.push(maze[column][row - 1]);
  if (row < maze[0].length - 1) near.push(maze[column][row + 1]);
  return near.filter((near) => !near.isVisited);
}
