// #region RANDOMIZED_PRIM_ALGORITHM
document.querySelector('a#buttonRandomizedPrim').addEventListener('click', function(e){
    // var nodes = findStartAndGoalNode(); 
    // if(nodes.length < 2){
    //     alert('You need to provide start and goal nodes!');
    //     return;
    // }
    // let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    // let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    generateRandomizedPrim();
});
async function generateRandomizedPrim(){
    let maze = construct2dArrayWithoutWalls();
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            document.getElementById('node' + maze[i][j]).style.backgroundColor = WALL_COLOR;
        }
    }

    // Set the start and end points of the maze
    const start = [0, 0];
    const end = [39, 59];
    // Add the start and end points to a list of visited cells
    let visited = [start];

    // Set the starting cell to be a path
    document.getElementById('node' + maze[start[0]][start[1]]).style.backgroundColor = WHITE_COLOR;
    // Set the directions in which we can move from a given cell
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    // While there are still cells to visit
    while (visited.length > 0) {
    // Choose a random cell from the list of visited cells
    let idx = Math.floor(Math.random() * visited.length);
    let cell = visited[idx];

    // Initialize an array to store the valid neighbors of the current cell
    let neighbors = [];

    // Check all the possible directions in which we can move from the current cell
    for (let dir of directions) {
        let row = cell[0] + dir[0];
        let col = cell[1] + dir[1];

        // If the new cell is within the bounds of the maze, is not a wall, and has not been visited yet,
        // add it to the list of valid neighbors
        if (row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH && document.getElementById('node' + maze[row][col]).style.backgroundColor == WALL_COLOR) {
            neighbors.push([row, col]);
        }
    }
    // If the current cell has any valid neighbors
    if (neighbors.length > 0) {
        // Choose a random valid neighbor
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

        // Set the neighbor to be a path
        await sleep(1);
        document.getElementById('node' + maze[neighbor[0]][neighbor[1]]).style.backgroundColor = WHITE_COLOR;
        // Add the neighbor to the list of visited cells
        visited.push(neighbor);
    } else {
        // If the current cell has no valid neighbors, remove it from the list of visited cells
        visited.splice(idx, 1);
    }
    }
    let maze_array = new Array(HEIGHT*WIDTH);
    let count = 0;
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            maze_array[count] = WALL_VALUE;
            count++;
        }
    }
}
// #endregion