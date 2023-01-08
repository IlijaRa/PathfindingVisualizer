// #region RANDOMIZED_DFS_MAZE
document.querySelector('a#buttonDFS_Maze').addEventListener('click', function(e){
    var maze = generateDfsMaze(HEIGHT, WIDTH);
    console.log('generated maze:', maze);
});
async function generateDfsMaze(height, width/*, cellSize*/) {
    // Create a maze filled with walls
    let maze = [];
    let count = 0;
    for (let i = 0; i < height; i++) {
        maze[i] = new Array(width).fill(WALL_VALUE);
    }

    for (let i = 0; i < height * width; i++) {
        count++;
        document.getElementById('node' + count).style.backgroundColor = WALL_COLOR;
    }

    console.log('generateDfsMaze: ', maze);
    // return;
    // Start the maze from a random cell
    let currentCell = (Math.floor(Math.random() * (HEIGHT * WIDTH)) + 1);
    document.getElementById('node' + currentCell).style.backgroundColor = WHITE_COLOR;
    console.log('currentCell: ', currentCell);
    let visitedCells = [];
    for (let i = 0; i < height; i++) {
      visitedCells[i] = [];
      for (let j = 0; j < width; j++) {
        visitedCells[i][j] = false;
      }
    }
    // Create a stack to store the cells that need to be visited
    let stack = [];
    let currentCellCoord = getNodeCoordinatesWithoutWalls(currentCell);
    // Mark the current cell as visited and add it to the stack
    visitedCells[currentCellCoord[0]][currentCellCoord[1]] = true;
    stack.push(currentCell);

    console.log('visitedCells: ', visitedCells);
    console.log('stack: ', stack);
    
    // While there are cells in the stack
    while (stack.length > 0) {
        // Get the last cell in the stack
        currentCell = stack[stack.length - 1];
        console.log('grabbed node: ', currentCell);

        
        let currentCellCoord = getNodeCoordinatesWithoutWalls(currentCell);
        console.log('grabbed node coords: ', currentCellCoord);
        // Find a random unvisited neighbor
        let neighbors = [];

        if (currentCellCoord[0] > 0 && !visitedCells[currentCellCoord[0] - 1][currentCellCoord[1]]) {
            // neighbors.push([currentCellCoord[0] - 1, currentCellCoord[1]]);
            neighbors.push(currentCell - WIDTH);
        }
        if (currentCellCoord[1] > 0 && !visitedCells[currentCellCoord[0]][currentCellCoord[1] - 1]) {
            // neighbors.push([currentCellCoord[0], currentCellCoord[1] - 1]);
            neighbors.push(currentCell - 1);
        }
        if (currentCellCoord[0] < height - 1 && !visitedCells[currentCellCoord[0] + 1][currentCellCoord[1]]) {
            // neighbors.push([currentCellCoord[0] + 1, currentCellCoord[1]]);
            neighbors.push(currentCell + WIDTH);
        }
        if (currentCellCoord[1] < width - 1 && !visitedCells[currentCellCoord[0]][currentCellCoord[1] + 1]) {
            // neighbors.push([currentCellCoord[0], currentCellCoord[1] + 1]);
            neighbors.push(currentCell + 1);
        }
        console.log('neighbors:', neighbors);
        console.log('neighbors length:', neighbors.length);
        if (neighbors.length > 0) {
            // Choose a random neighbor
            let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
            console.log('nextCell:', nextCell);
            // Calculates coordinates of the next cell
            let nextCellCoord = getNodeCoordinatesWithoutWalls(nextCell);
            console.log('nextCellCoord:', nextCellCoord);
            // Remove the wall between the current cell and the next cell
            maze[currentCellCoord[0]][currentCellCoord[1]] = 0;
            maze[nextCellCoord[0]][nextCellCoord[1]] = 0;
            // Mark the next cell as visited and add it to the stack
            visitedCells[nextCellCoord[0]][nextCellCoord[1]] = true;
            stack.push(nextCell);
            await sleep(1);
            document.getElementById('node' + nextCell).style.backgroundColor = WHITE_COLOR;
        } else {
            // If there are no unvisited neighbors, remove the current cell from the stack
            stack.pop();
        }
        console.log('generateDfsMaze: ', maze);
        console.log('visitedCells: ', visitedCells);
        console.log('stack: ', stack);
        console.log('---------------------------------------');
    }
    return maze;
}
function RemoveItem(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
// #endregion