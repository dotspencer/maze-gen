const DIMENTION = 10;

const start = 0;
const graph = [];
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
  const { row, column } = toRowColumn(i);

  const up = toIndex(row - 1, column);
  const down = toIndex(row + 1, column);
  const left = toIndex(row, column - 1);
  const right = toIndex(row, column + 1);

  const edges = [up, down, right, left].filter(e => e);
  node.edges = edges;
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
