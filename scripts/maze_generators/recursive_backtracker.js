document.querySelector('a#buttonRecursiveBacktracker').addEventListener('click', function(e){
    ClearAll();
    let maze = construct2dArray();
    disablePointerActions();
    generateRecursiveBacktracker(maze);
    startNodeExists = false;
    goalNodeExists = false;
});
async function generateRecursiveBacktracker(grid){
    // Populate canvas with wall nodes
    for(let i = 0 ; i < HEIGHT ; i++){
        for(let j = 0 ; j < WIDTH ; j++){
            drawWallNode(grid[i][j]);
        }
    }
    // possible choices for algorithm to move
    let choices = [[-2,0],[0,2],[2,0],[0,-2]];

    // picking random cell and making it a passage
    let cell = grid[Math.floor(Math.random() * HEIGHT)][Math.floor(Math.random() * WIDTH)];
    drawUnvisitedNode(cell);

    s = [];
    let neighbours = computeFrontierCellsRBT(grid,cell,choices);
    let rnd = Math.floor(Math.random () * neighbours.length);
    s.push(neighbours[rnd]);
    while(s.length){
        await sleep(SLEEP_VALUE);
        let batch = s[s.length - 1];
        let frontier = batch[1];
        let inBetween = batch[0];
        drawUnvisitedNode(frontier);
        drawUnvisitedNode(inBetween);
        neighbours = computeFrontierCellsRBT(grid,frontier,choices);
        if(neighbours.length){
            rnd = Math.floor(Math.random () * neighbours.length);
            s.push(neighbours[rnd]);
        }else{
            s.pop();
        }
    }
    enablePointerActions();
}
function computeFrontierCellsRBT(grid, cell, choices){
    // list of current cell neighbours
    let neighbours = [];
    // coordinates contains coordinates of the current cell
    let coordinates = getNodeCoordinates(cell);
    // checking all possible moves
    for(let i = 0 ; i < choices.length ; ++i){
        let row = coordinates[0] + choices[i][0];
        let col = coordinates[1] + choices[i][1];
        // checking to see if cell is inside canvas borders
        if((row >= 0 && row < HEIGHT) && (col >= 0 && col < WIDTH) && (isNodeWall(grid[row][col]))){
            let frontier = grid[row][col];
            let inBetween = null;
            if(choices[i][0] === -2){
                inBetween = grid[coordinates[0] - 1][coordinates[1]];
            }else if(choices[i][0] === 2){
                inBetween = grid[coordinates[0]+1][coordinates[1]];
            }else if(choices[i][1] === -2){
                inBetween = grid[coordinates[0]][coordinates[1] - 1];
            }else if(choices[i][1] === 2){
                inBetween = grid[coordinates[0]][coordinates[1] + 1];
            }
            neighbours.push([inBetween, frontier]);
        }
    }
    return neighbours;
  }