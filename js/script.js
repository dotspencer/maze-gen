const DIMENTION = 40;
const LINE_WIDTH = 10;

const start = 0;
const graph = [];
const tree = [];
const visited = {};

// add nodes to graph
for (let i = 0; i < DIMENTION * DIMENTION; i++) {
  graph.push({
    index: i,
    to: [],
  });
}

// add edges
for (let i = 0; i < DIMENTION * DIMENTION; i++) {
  const node = graph[i];
  const { up, down, left, right } = getNeighbors(i);
  const edges = [up, down, right, left].filter(e => e);
  node.edges = edges;
}

explore(start);
draw();

function explore(index) {
  visited[index] = true;
  const unvisited = getNeighbors(index);

  for (let i = 0; i < unvisited.length; i++) {
    const next = unvisited[i];
    if (!visited[next]) {
      tree.push([index, next]); // add pair to tree
      explore(next);
    }
  }
}

function getNeighbors(index) {
  const { row, column } = toRowColumn(index);
  const up = toIndex(row - 1, column);
  const down = toIndex(row + 1, column);
  const left = toIndex(row, column - 1);
  const right = toIndex(row, column + 1);
  return shuffle([up, down, left, right].filter(n => n));
}

function toRowColumn(index) {
  const row = Math.floor(index / DIMENTION);
  const column = index % DIMENTION;
  return { row, column };
}

function toIndex(row, column) {
  if (row < 0 || row >= DIMENTION) return null;
  if (column < 0 || column >= DIMENTION) return null;
  return (row * DIMENTION) + column;
}

function shuffle(array){
  for(let i = 0; i < array.length; i++){
    const randomIndex = Math.floor(Math.random() * array.length);
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

async function draw() {
  const canvas = document.querySelector('canvas');
  const width = canvas.getAttribute('width');
  const height = canvas.getAttribute('height');

  const xSpace = width / DIMENTION;
  const xStart = xSpace / 2;

  const ySpace = height / DIMENTION;
  const yStart = ySpace / 2;

  const ctx = canvas.getContext('2d');

  // fill background
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = 'white';

  for (let i = 0; i < tree.length; i++) {
    const pair = tree[i];
    const src = toRowColumn(pair[0]);
    src.x = xStart + src.row * xSpace;
    src.y = yStart + src.column * ySpace;
    const dest = toRowColumn(pair[1]);
    dest.x = xStart + dest.row * xSpace;
    dest.y = yStart + dest.column * ySpace;

    const adjust = LINE_WIDTH / 2; // used to make sharp corners
    ctx.beginPath();

    // vertical
    if (src.x === dest.x) {
      ctx.moveTo(src.x, Math.min(src.y, dest.y) - adjust);
      ctx.lineTo(dest.x, Math.max(src.y, dest.y) + adjust);
    }
    // horizontal
    else {
      ctx.moveTo(Math.min(src.x, dest.x) - adjust, src.y);
      ctx.lineTo(Math.max(src.x, dest.x) + adjust, dest.y);
    }

    ctx.stroke();
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}
