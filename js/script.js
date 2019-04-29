const DIMENTION = 10;

const start = 0;
const graph = [];
const tree = [];
const visited = {};

// fill graph
for (let i = 0; i < DIMENTION * DIMENTION; i++) {
  graph.push({
    index: i,
    to: [],
  });
}

// add connections
for (let i = 0; i < DIMENTION * DIMENTION; i++) {
  const node = graph[i];
  const { up, down, left, right } = getNeighbors(i);
  const edges = [up, down, right, left].filter(e => e);
  node.edges = edges;
}

explore(0);
console.log('tree:', tree);

function explore(index) {
  visited[index] = true;

  const { up, down, left, right } = getNeighbors(index);
  let unvisited = [up, down, right, left].filter(n => n && !visited[n]);

  while(unvisited.length > 0) {
    const randIndex = Math.floor(Math.random() * unvisited.length);
    const next = unvisited[randIndex];
    tree.push([index, next]); // add pair to tree
    explore(next);
    unvisited.splice(randIndex, 1); // remove from unvisited
  }
}

function getNeighbors(index) {
  const { row, column } = toRowColumn(index);
  const up = toIndex(row - 1, column);
  const down = toIndex(row + 1, column);
  const left = toIndex(row, column - 1);
  const right = toIndex(row, column + 1);
  return { up, down, left, right };
}

function toRowColumn(index) {
  const row = Math.floor(index / DIMENTION);
  const column = index % 10;
  return { row, column };
}

function toIndex(row, column) {
  if (row < 0 || row >= DIMENTION) return null;
  if (column < 0 || column >= DIMENTION) return null;
  return (row * DIMENTION) + column;
}
