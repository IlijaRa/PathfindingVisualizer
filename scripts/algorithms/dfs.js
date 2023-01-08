// #region DFS_ALGORITHM 
/* --------------------DFS algorithm---------------------------*/
document.querySelector('a#buttonDFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    solveDfs(startNodeNumber, goalNodeNumber);
    // solveD(startNodeNumber, goalNodeNumber);
})
// async function solveDfs(startNodeNumber, goalNodeNumber){
//     var maze = construct2dArray();
//     var adjacentsDict = findAdjacents(maze);
//     var visited = new Array(HEIGHT * WIDTH).fill(false);
//     var stack = [];
//     var solved = false;
    
//     // dfs(startNodeNumber, goalNodeNumber, visited, stack, solved, maze, adjacentsDict);
//     // visualizeSearching(startNodeNumber, stack);

//     var nodes = document.querySelectorAll('.node');

//     const g = new Graph();
    
//     // We need to set the fields in Graph class
//     g.SetMaze = maze;

//     // adding vertexes
//     for(let node of nodes){
//         g.addVertex(Node.GetNodeNumber(node.id));
//     }

//     // adding adjacents to declarated vertexes
//     for(let node of nodes){
//         if(node.style.backgroundColor == WALL_COLOR){
//             continue;
//         }
//         var adj = adjacentsDict[Node.GetNodeNumber(node.id)];
//         for(let i = 0; i < adj.length; i++){
//             var n = adj[i]; //form of n is [15, 20] which means 15th row and 20th column
//             g.addEdge(Node.GetNodeNumber(node.id), maze[n[0]][n[1]]);
//         } 
//     }

//     g.visualizeSearching(startNodeNumber, g.dfs(startNodeNumber, goalNodeNumber, visited));    

// }
async function solveDfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;

    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    stack.push(startNodeNumber);
    
    console.log('prev', prev);
    while (stack.length > 0) {
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // await sleep(1);
        var currentNode = stack.pop();

        let i_save = 0;
        let j_save = 0;

        //nadji elegantnije resenje za pronalazenje currentNode u 2d nizu maze!!!
        for(i = 0; i < HEIGHT; i++){
            for(j = 0; j < WIDTH; j++){
                if(maze[i][j] == currentNode){
                    i_save = i;
                    j_save = j;
                    break;
                }
            }
        }

        visited[i_save][j_save] = true;

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + currentNode).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + currentNode).style.backgroundColor = SEARCH_NODE_COLOR;

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;

                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if(maze[n[0]][n[1]] == goalNodeNumber){
                    solved = true;
                    break;
                }
                // document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                // await sleep(1);
                // document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
            }
        }
        if(solved){
            break;
        }
    }
    if(!solved){
        alert('Impossible to solve! I will reset it.');
        return;
    }
    // prev[0] = 2
    console.log('prev', prev);
    let loopControl = false;
    goalToStart = []; // gathers nodes from goal to start node by grabbing the previous nodes
    previous = goalNodeNumber - 1;
    goalToStart.push(previous);
    
    while(true){
        let node = prev[previous];
        goalToStart.push(node);
        if(node == 0) loopControl = true;
        else previous = node;
    
        if(loopControl){
            break;
        }
    }
    console.log('goalToStart', goalToStart);
    // return;
    for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
        await sleep(25);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node + 1));
                n.style.backgroundColor = RED_COLOR
                await sleep(1);
                n.style.backgroundColor = ORANGE_COLOR;
                await sleep(1);
                n.style.backgroundColor = PATH_COLOR;
            }
            // if(node == 1){
            //     let n = document.getElementById('node' + node);
            //     n.style.backgroundColor = RED_COLOR
            //     await sleep(1);
            //     n.style.backgroundColor = ORANGE_COLOR;
            //     await sleep(1);
            //     n.style.backgroundColor = PATH_COLOR;
            // }
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }

}
async function solveD(startNodeNumber, goalNodeNumber){
    // Create a maze filled with walls
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;

    let visitedCells = [];
    for (let i = 0; i < HEIGHT; i++) {
    visitedCells[i] = [];
    for (let j = 0; j < WIDTH; j++) {
        visitedCells[i][j] = false;
    }
    }
    stack.push(startNodeNumber);

    // While there are cells in the stack
    while (stack.length > 0) {
        // Get the last cell in the stack
        currentCell = stack[stack.length - 1];
        console.log('grabbed node: ', currentCell);

        
        let currentCellCoord = getNodeCoordinates(currentCell);
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
        if (currentCellCoord[0] < HEIGHT - 1 && !visitedCells[currentCellCoord[0] + 1][currentCellCoord[1]]) {
            // neighbors.push([currentCellCoord[0] + 1, currentCellCoord[1]]);
            neighbors.push(currentCell + WIDTH);
        }
        if (currentCellCoord[1] < WIDTH - 1 && !visitedCells[currentCellCoord[0]][currentCellCoord[1] + 1]) {
            // neighbors.push([currentCellCoord[0], currentCellCoord[1] + 1]);
            neighbors.push(currentCell + 1);
        }
        console.log('neighbors:', neighbors);
        console.log('neighbors length:', neighbors.length);
        if (neighbors.length > 0) {
            document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
            // Choose a random neighbor
            let nextCell = neighbors[0];//neighbors[Math.floor(Math.random() * neighbors.length)];
            console.log('nextCell:', nextCell);
            // Calculates coordinates of the next cell
            let nextCellCoord = getNodeCoordinates(nextCell);
            console.log('nextCellCoord:', nextCellCoord);
            // Remove the wall between the current cell and the next cell
            maze[currentCellCoord[0]][currentCellCoord[1]] = 0;
            maze[nextCellCoord[0]][nextCellCoord[1]] = 0;
            // Mark the next cell as visited and add it to the stack
            visitedCells[nextCellCoord[0]][nextCellCoord[1]] = true;
            stack.push(nextCell);
            document.getElementById('node' + nextCell).style.backgroundColor = EDGE_NODE_COLOR;
            await sleep(1);
            document.getElementById('node' + nextCell).style.backgroundColor = SEARCH_NODE_COLOR;
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
async function reconstructPathForDfs(prev){
    // TODO: Implement it
}
/* ------------------------------------------------------------*/
// #endregion