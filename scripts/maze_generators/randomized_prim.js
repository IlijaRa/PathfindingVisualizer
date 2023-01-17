document.querySelector('a#buttonRandomizedPrim').addEventListener('click', function(e){
    ClearAll();
    let maze = construct2dArray();
    disablePointerActions();
    generateRandomizedPrim(maze);
    startNodeExists = false;
    goalNodeExists = false;
});

async function generateRandomizedPrim(grid){
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

    // store cell's frontier nodes in this array
    let frontierList = [];
    computeFrontierCells(grid,cell,frontierList,choices);
    while(frontierList.length){
        await sleep(SLEEP_VALUE);
        // choosing a random value from frontierList
        let rnd = Math.floor(Math.random() * frontierList.length);
        let batch = frontierList[rnd];
        frontierList.splice(rnd,1);
        let inBetween = batch[0];
        let frontier = batch[1];
        if(isNodeWall(frontier)){
            drawUnvisitedNode(frontier);
            drawUnvisitedNode(inBetween);
            computeFrontierCells(grid,frontier,frontierList,choices);
        }
    }
    enablePointerActions();
}
function computeFrontierCells(grid, cell, frontierList, choices){
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
            frontierList.push([inBetween, frontier]);
        }
    }
}