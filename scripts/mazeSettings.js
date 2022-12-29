
/*WINDOW SETTINGS*/
WIDTH = 75;
HEIGHT = 50;

/*GLOBAL VARIABLES*/
var startNodeExists = false;
var goalNodeExists = false;
WALL_VALUE = -1;

/*COLORS*/
//from palete
WHITE_COLOR = 'rgb(255, 255, 255)';
YELLOW_COLOR = 'rgb(245, 193, 0)';
GREEN_COLOR = 'rgb(91, 177, 125)';
BLUE_COLOR = 'rgb(68, 139, 229)';
RED_COLOR = 'rgb(221, 34, 0)';
ORANGE_COLOR = 'rgb(240, 102, 40)';

//for maze entities
SEARCH_NODE_COLOR = 'rgb(51, 193, 228)';
EDGE_NODE_COLOR = 'rgb(245, 193, 0)';
WALL_COLOR = 'rgb(70, 72, 108)';
PATH_COLOR = 'rgb(245, 193, 0)';
START_NODE_COLOR = 'rgb(74, 145, 212)';
GOAL_NODE_COLOR = 'rgb(209, 42, 59)';
BORDER_COLOR = 'rgb(64, 206, 227);';

/*MOUSE BUTTON LISTENER*/
let mouseDown = 0;
document.onmousedown = () => {mouseDown = 1;}
document.onmouseup = () => {mouseDown = 0;}

/* Provides sleep*/
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}
/* Provides random color */
const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

function constructGrid(){
    var maze_container = document.querySelector('#maze_container');
    for(var i = 0; i < HEIGHT; i++){
        var row = document.createElement('div');
        row.className = 'row row' + (i + 1);
        row.id = 'row' + (i + 1);
        for(var j = 0; j < WIDTH; j++){
            var node = document.createElement('div');
            node.className = 'node node' + ((i * WIDTH) + (j + 1));
            node.id = 'node' + ((i * WIDTH) + (j + 1));
            node.style.backgroundColor = WHITE_COLOR;

            node.addEventListener('mouseover', function(e){
                if(mouseDown == 1){
                    if(startNodeExists == false){
                        e.target.style.backgroundColor = START_NODE_COLOR;
                        startNodeExists = true;
                    }
                    else if(goalNodeExists == false && e.target.style.backgroundColor != START_NODE_COLOR){
                        e.target.style.backgroundColor = GOAL_NODE_COLOR;
                        goalNodeExists = true;
                    }  
                    else if((startNodeExists == true && goalNodeExists == true) && 
                        (e.target.style.backgroundColor != START_NODE_COLOR) && 
                        (e.target.style.backgroundColor != GOAL_NODE_COLOR) &&
                        (e.target.style.backgroundColor != EDGE_NODE_COLOR) &&
                        (e.target.style.backgroundColor != SEARCH_NODE_COLOR) 
                        ){
                            e.target.style.backgroundColor = WALL_COLOR;
                            e.target.style.borderColor = WALL_COLOR;
                        } 
                }
            })

            node.addEventListener('click', function(e){
                if(startNodeExists == false){
                    e.target.style.backgroundColor = START_NODE_COLOR;
                    startNodeExists = true;
                }
                else if(goalNodeExists == false && e.target.style.backgroundColor != START_NODE_COLOR){
                    e.target.style.backgroundColor = GOAL_NODE_COLOR;
                    goalNodeExists = true;
                }
                else if((startNodeExists == true && goalNodeExists == true) && 
                        (e.target.style.backgroundColor != START_NODE_COLOR) && 
                        (e.target.style.backgroundColor != GOAL_NODE_COLOR) &&
                        (e.target.style.backgroundColor != EDGE_NODE_COLOR) &&
                        (e.target.style.backgroundColor != SEARCH_NODE_COLOR) 
                        ){
                    e.target.style.backgroundColor = WALL_COLOR;
                    e.target.style.borderColor = WALL_COLOR;
                } 
            })
            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
}
function construct2dArray(){
    var nodeCount = 0;
    let maze = [];
    
    /* Filling the a complete 2d array with zeros */
    for(i = 0; i < HEIGHT; i++){
        maze[i] = new Array(WIDTH).fill(0);
    }

    /* 
        Traverse through grid
        node value equals -1 if its a wall
        node value equals incrementing value of nodeCount if its not a wall
    */
    for(i = 0; i < HEIGHT; i++){
        for(j = 0; j < WIDTH; j++){
            nodeCount++;
            if(document.getElementById('node' + nodeCount).style.backgroundColor == WALL_COLOR){
                maze[i][j] = -1;
            }else{
                maze[i][j] = nodeCount;
            }
        }
    }
    // console.log('maze', maze);
    return maze;
}
// triggers a button for reset
document.querySelector('#buttonReset').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.style.backgroundColor = WHITE_COLOR;
        node.style.borderColor = BORDER_COLOR;
    })
    startNodeExists = false;
    goalNodeExists = false;
});

/* --------------------BFS algorithm---------------------------*/
// triggers a button for BFS algorithm trying new approach
document.querySelector('#buttonBFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    
    let shortestPath = solveBfs(startNodeNumber, goalNodeNumber);
    // console.log('ShortestPath from solveBfs: ', shortestPath);
    // reconstructPathForBfs.apply(...shortestPath);
})
async function solveBfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let queue = [];
    let solved = false;

    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    queue.push(startNodeNumber);

    while(queue.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // await sleep(1);
        var currentNode = queue.shift();

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

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;

                queue.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if(maze[n[0]][n[1]] == goalNodeNumber){
                    solved = true;
                    break;
                }
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
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }
    // return prev;
}
async function reconstructPathForBfs(prev){
    // TODO: Implement it
}
/* ------------------------------------------------------------*/

/* --------------------DFS algorithm---------------------------*/
document.querySelector('#buttonDFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    // solveDfs(startNodeNumber, goalNodeNumber);
    solveDfs(startNodeNumber, goalNodeNumber);
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

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;

                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if(maze[n[0]][n[1]] == goalNodeNumber){
                    solved = true;
                    break;
                }
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
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }

}
async function reconstructPathForDfs(prev){
    // TODO: Implement it
}
/* ------------------------------------------------------------*/

/* --------------------A* algorithm---------------------------*/
document.querySelector('#buttonAstar').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    solveAstar(startNodeNumber, goalNodeNumber);
});
async function solveAstar(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    count = 0;
    queue = new Array();
    queueSet = new Set();
    queue.push({'fScore': 0, 'count': count, 'nodeNumber': startNodeNumber});
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let visited = [];
    let solved = false;
    gScore = {};
    fScore = {};

    for(let i = 0; i < HEIGHT; i++){ visited[i] = new Array(WIDTH).fill(false); }
    for(let i = 0; i < HEIGHT * WIDTH; i++) { gScore[i] = Number.MAX_VALUE; }
    for(let i = 0; i < HEIGHT * WIDTH; i++) { gScore[i] = Number.MAX_VALUE; }
    
    gScore[startNodeNumber] = 0;
    fScore[startNodeNumber] = heuristicFunction(getNodeCoordinates(startNodeNumber), 
                                                getNodeCoordinates(goalNodeNumber));                                            
    

    visited[startNodeNumber] = true;
    queueSet.add(startNodeNumber);

    while(queue.length > 0){
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);

        // let currentNode = queue.shift(); // shift() is used for the queue to remove items in order 
        
        // searching for a min value inside a queue
        var currentNode = queue.reduce(function(prev, curr) {
            return prev.fScore < curr.fScore ? prev : curr;
        });
        
        // deleting current min value from the queue
        var index = queue.indexOf(currentNode);
        if (index > -1) { // only splice queue when item is found
            queue.splice(index, 1); // 2nd parameter means remove one item only
        }

        queueSet.delete(currentNode.nodeNumber);
        
        let coordinate = getNodeCoordinates(currentNode.nodeNumber);
        visited[coordinate[0]][coordinate[1]] = true;

        if(currentNode.nodeNumber == goalNodeNumber){
            //TODO: make path
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            solved = true;
            break;
        }

        var adj = adjacentsDict[currentNode.nodeNumber];
        for(count = 0; count < adj.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            tempGScore = gScore[currentNode.nodeNumber] + 1;

            if(tempGScore < gScore[maze[n[0]][n[1]]]){
                prev[maze[n[0]][n[1]] - 1] = currentNode.nodeNumber - 1;
                gScore[maze[n[0]][n[1]]] = tempGScore;
                fScore[maze[n[0]][n[1]]] = tempGScore + heuristicFunction(n, getNodeCoordinates(goalNodeNumber));
                // console.log('heuristicFunction(n, getNodeCoordinates(goalNodeNumber)): ', heuristicFunction(n, getNodeCoordinates(goalNodeNumber)));
                if(!queueSet.has(maze[n[0]][n[1]]) && visited[n[0]][n[1]] == false){
                    visited[n[0]][n[1]] = true;
                    count += 1;
                    queue.push({'fScore': fScore[maze[n[0]][n[1]]], 'count': count, 'nodeNumber': maze[n[0]][n[1]]});
                    queueSet.add(maze[n[0]][n[1]]);

                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                    await sleep(0.1);
                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
                
                    if(maze[n[0]][n[1]] == goalNodeNumber){
                        solved = true;
                        break;
                    }
                }
            }
            if(solved){
                break;
            }
        }
    }
    if(!solved){
        alert('Impossible to solve! I will reset it.');
        return;
    }

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
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }

}
function heuristicFunction(a, b) {
    // return Math.abs(a[0] - a[1]) + Math.abs(b[0] - b[1]);
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
        .reduce((sum, now) => sum + now) // sum
        ** (1/2)
}
/* ------------------------------------------------------------*/

/* --------------------Dijkstra algorithm---------------------------*/
document.querySelector('#buttonDijkstra').addEventListener('click', function(e){
    const problem = {
        start: {A: 5, B: 2},
        A: {C: 4, D: 2},
        B: {A: 8, D: 7},
        C: {D: 6, finish: 3},
        D: {finish: 1},
        finish: {}
      };

      const lowestCostNode = (costs, processed) => {
        return Object.keys(costs).reduce((lowest, node) => {
          if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
              lowest = node;
            }
          }
          return lowest;
        }, null);
      };
      
      // function that returns the minimum cost and path to reach Finish
      const dijkstra = (graph) => {
      
        // track lowest cost to reach each node
        const costs = Object.assign({finish: Infinity}, graph.start);
      
        // track paths
        const parents = {finish: null};
        for (let child in graph.start) {
          parents[child] = 'start';
        }
      
        // track nodes that have already been processed
        const processed = [];
      
        let node = lowestCostNode(costs, processed);
      
        while (node) {
          let cost = costs[node];
          let children = graph[node];
          for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n]) {
              costs[n] = newCost;
              parents[n] = node;
            }
            if (costs[n] > newCost) {
              costs[n] = newCost;
              parents[n] = node;
            }
          }
          processed.push(node);
          node = lowestCostNode(costs, processed);
        }
      
        let optimalPath = ['finish'];
        let parent = parents.finish;
        while (parent) {
          optimalPath.push(parent);
          parent = parents[parent];
        }
        optimalPath.reverse();
      
        const results = {
          distance: costs.finish,
          path: optimalPath
        };
      
        return results;
      };
      
      console.log(dijkstra(problem));
});
/* ------------------------------------------------------------*/

//radi donekle, ostavi je 
// function dfs(v, goalNodeNumber, visited, stack, solved, maze, adjacentsDict) {
//     // var maze = construct2dArray();
//     // var adjacentsDict = findAdjacents(maze);
//     visited[v] = true;

//     stack.push(v);

//     for (let i = 0; i < adjacentsDict[v].length; i++){
//         let n = adjacentsDict[v][i];
        
//         // console.log('', );

//         if(maze[n[0]][n[1]] == goalNodeNumber){
//             solved = true;
//             // console.log('maze[n[0]][n[1]]', maze[n[0]][n[1]]);
//             // console.log('goalNodeNumber', goalNodeNumber);
//             // console.log('Done!',);
//             // break;
//         }
        
//         if(!visited[maze[n[0]][n[1]]] && solved == false){
//             dfs(maze[n[0]][n[1]], goalNodeNumber, visited, stack, solved, maze, adjacentsDict);
//         }
//     }

//     return;
// }

// async function visualizeSearching(startNodeNumber, stack){
//     for(let i = 0; i < stack.length; i++){
//         document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR; // prevent algorithm to overlap start node backgroundColor
//         document.getElementById('node' + stack[i]).style.backgroundColor = EDGE_NODE_COLOR;
//         await sleep(1);
//         document.getElementById('node' + stack[i]).style.backgroundColor = SEARCH_NODE_COLOR;
//     }
// }

// class Graph {
//     maze;
//     solved = false;

//     constructor() {
//         this.vertices = [];
//         this.adjacent = {};
//         this.stack = [];
//     }

//     set SetMaze(newMaze){
//         this.maze = newMaze; 
//     }

//     addVertex(v) {
//         this.vertices.push(v);
//         this.adjacent[v] = [];
//     }

//     addEdge(v, w) {
//         this.adjacent[v].push(w);
//         this.adjacent[w].push(v);
//     }

//     dfs(v, goalNodeNumber, visited) {
//         let adj = this.adjacent;
//         visited[v] = true;
        
//         if(document.getElementById('node' + v).style.backgroundColor == WALL_COLOR){
//             return;
//         }

//         this.stack.push(v);

//         for (let i = 0; i < adj[v].length; i++){
//             let w = adj[v][i];
            
//             if(w == goalNodeNumber){
//                 this.solved = true;
//                 return;
//             }

//             if (!visited[w] && this.solved == false) {
//                 this.dfs(w, goalNodeNumber, visited);
//             }
//         }
//         return this.stack;
//     }

//     async visualizeSearching(startNodeNumber, stack){
//         for(let i = 0; i < stack.length; i++){
//             document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR; // prevent algorithm to overlap start node backgroundColor
//             document.getElementById('node' + stack[i]).style.backgroundColor = EDGE_NODE_COLOR;
//             await sleep(1);
//             document.getElementById('node' + stack[i]).style.backgroundColor = SEARCH_NODE_COLOR;
//         }
//     }

//     async visualizeSearching(startNodeNumber, stack){
//         for(let i = 0; i < stack.length; i++){
//             document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR; // prevent algorithm to overlap start node backgroundColor
//             document.getElementById('node' + stack[i]).style.backgroundColor = EDGE_NODE_COLOR;
//             await sleep(1);
//             document.getElementById('node' + stack[i]).style.backgroundColor = SEARCH_NODE_COLOR;
//         }
//     }

// }

/* General purpose methods */

// Returns start and goal nodes in DIV form
function findStartAndGoalNode(){
    let maze_container = document.querySelector('#maze_container');
    let nodes = [];
    for(i = 0; i < HEIGHT; i++){
        for(j = 0; j < WIDTH; j++){
            let node = maze_container.children[i].children[j];
            if(node.style.backgroundColor == START_NODE_COLOR){
                nodes[0] = node;
            }
            if(node.style.backgroundColor == GOAL_NODE_COLOR){
                nodes[1] = node;
            }
        }
    }
    /* nodes[0] - start node , nodes[1] - end node*/
    return nodes;
}
// Returns adjancents for every node
function findAdjacents(maze){
    var adjacentDictionary = {};
    var possibleMoves = [
        [-1, 0], //left
        [1, 0],  //right
        [0, 1],  //down
        [0, -1]  //up
    ];

    for(row = 0; row < HEIGHT; row++){
        for(col = 0; col < WIDTH; col++){
            if(maze[row][col] == -1){
                continue;
            }
            var currentNode = maze[row][col];
            var neighbours = [];
            
            for(count = 0; count < possibleMoves.length; count++){
                var nRow = possibleMoves[count][0] + row;
                var nCol = possibleMoves[count][1] + col;

                if((nRow >= 0 && nRow < maze.length) && (nCol >= 0 && nCol < maze[0].length)){
                    if(maze[nRow][nCol] != WALL_VALUE){
                        neighbours.push([nRow, nCol]);
                    }
                }
            }
            adjacentDictionary[currentNode] = neighbours;
        }
    }
    // console.log('adjacentDictionary', adjacentDictionary);

    return adjacentDictionary;
}
// Returns node coordinates 
function getNodeCoordinates(nodeNumber){
    let maze = construct2dArray();
    let coordinate = []

    //nadji elegantnije resenje za pronalazenje currentNode u 2d nizu maze!!!
    for(i = 0; i < HEIGHT; i++){
        for(j = 0; j < WIDTH; j++){
            if(maze[i][j] == nodeNumber){
                coordinate[0] = i;
                coordinate[1] = j;
                break;
            }
        }
    }
    return coordinate;
}
class Node{
    constructor(nodeId, color, neighbours, parent, visited){
        this.nodeId = nodeId;
        this.color = color;
        this.neighbours = neighbours;
        this.parent = parent;
        this.visited = visited;
    }
    /*Returns just the number of the node*/
    static GetNodeNumber(node_id){
        let nodeNumber = parseInt(node_id.replace('node', ''));
        return nodeNumber; 
    }
    /*Returns just the number of the nodes neighbours*/
    static GetNeighboursNumbers(neighbours_param){
        let neighboursNumbers = [];
        neighbours_param.forEach(function(neighbour){
            neighboursNumbers.push(parseInt(neighbour.replace('node', '')));
        })
        return neighboursNumbers;
    }

    get GetNode(){
        return this.nodeId; 
    }

    get GetColor(){
        return this.color;
    }

    get GetNeighbours(){
        return this.neighbours;
    }

    get GetParent(){
        return this.parent;
    }

    get GetParentNumber(){
        let parentNumber = parseInt(this.parent.replace('node', ''));
        return parentNumber; 
    }

    get GetVisitStatus(){
        return this.visited;
    }
}