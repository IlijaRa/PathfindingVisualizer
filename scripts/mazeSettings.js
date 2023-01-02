// #region CONSTANTS
/*WINDOW SETTINGS*/
WIDTH = 60;
HEIGHT = 40;

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
GOAL_SEARCH_NODE_COLOR = 'rgb(240, 128, 128)';
EDGE_NODE_COLOR = 'rgb(245, 193, 0)';
GOAL_EDGE_NODE_COLOR = 'rgb(68, 139, 229)';
WALL_COLOR = 'rgb(119, 120, 122)';
PATH_COLOR = 'rgb(245, 193, 0)';
START_NODE_COLOR = 'rgb(74, 145, 212)';
GOAL_NODE_COLOR = 'rgb(209, 42, 59)';
INTERSECT_NODE_COLOR = 'rgb(240, 102, 40)';
BORDER_COLOR = 'rgb(64, 206, 227);';
// #endregion
// #region GENERAL_PURPOSE_METHODS

// Mouse button listener
let mouseDown = 0;
document.onmousedown = () => {mouseDown = 1;}
document.onmouseup = () => {mouseDown = 0;}

// Provides sleep
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}
// Provides random color
const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
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
// Generate walls for maze
function generateWalls() {
    var scheme_array = new Array(HEIGHT * WIDTH).fill(0);
    for (let i = 0; i < HEIGHT * WIDTH; i++) {
        let x = Math.floor((Math.random() * 5) - 1); // arbitrary formula for generating WALL_VALUE
        if (x == -1) {
            scheme_array[i] = -1;
        } else {
            scheme_array[i] = i + 1;
        }

    }
    return scheme_array;
}

// Generate maze with forwarded array as a parameter
async function generateMaze(scheme_array){
    for(let i = 0; i < HEIGHT * WIDTH; i++){
        if(scheme_array[i] == WALL_VALUE){
            document.getElementById('node' + (i + 1)).style.backgroundColor = ORANGE_COLOR;
            await sleep(5);
            document.getElementById('node' + (i + 1)).style.backgroundColor = WALL_COLOR;
        }else{
            document.getElementById('node' + (i + 1)).style.backgroundColor = WHITE_COLOR;
        }
    }
}

// Node class with useful methods
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
class PriorityQueue {
    constructor(maxSize) {
       // Set default max size if not provided
       if (isNaN(maxSize)) {
          maxSize = 10;
        }
       this.maxSize = maxSize;
       // Init an array that'll contain the queue values.
       this.container = [];
    }
    // Helper function to display all values while developing
    display() {
       console.log(this.container);
    }
    // Checks if queue is empty
    isEmpty() {
       return this.container.length === 0;
    }
    // checks if queue is full
    isFull() {
       return this.container.length >= this.maxSize;
    }
    enqueue(nodeNumber, priority) {
       // Check if Queue is full
       if (this.isFull()) {
          console.log("Queue Overflow!");
          return;
       }
       let currElem = new this.Element(nodeNumber, priority);
       let addedFlag = false;
       // Since we want to add elements to end, we'll just push them.
       for (let i = 0; i < this.container.length; i++) {
          if (currElem.priority < this.container[i].priority) {
             this.container.splice(i, 0, currElem);
             addedFlag = true; break;
          }
       }
       if (!addedFlag) {
          this.container.push(currElem);
       }
    }
    dequeue() {
    // Check if empty
    if (this.isEmpty()) {
       console.log("Queue Underflow!");
       return;
    }
    return this.container.pop();
 }
 peek() {
    if (isEmpty()) {
       console.log("Queue Underflow!");
       return;
    }
    return this.container[this.container.length - 1];
 }
 clear() {
    this.container = [];
    }
}
 // Create an inner class that we'll use to create new nodes in the queue
 // Each element has nodeNumber and a priority
 PriorityQueue.prototype.Element = class {
    constructor(nodeNumber, priority) {
       this.nodeNumber = nodeNumber;
       this.priority = priority;
    }
 };
// #endregion
// #region GRID_CONSTRUCTION
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
                    e.target.style.backgroundColor = WHITE_COLOR;
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
    return maze;
}
// #endregion
// #region RESET_BUTTON
document.querySelector('#buttonReset').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.style.backgroundColor = WHITE_COLOR;
        node.style.borderColor = BORDER_COLOR;
    })
    startNodeExists = false;
    goalNodeExists = false;
});
// #endregion
// #region ALGORITHMS
// #region BFS_ALGORITHM 
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
// #endregion
// #region BIDIRECTIONAL_BFS_ALGORITHM 
/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('#buttonBD_BFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    
    let shortestPath = solveBidirectionalBfs(startNodeNumber, goalNodeNumber);
})
async function solveBidirectionalBfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var intersectNodeNumber = undefined;
    // Initialize the two queues for the bidirectional search
    let queueStart = [];
    let queueGoal = [];
    let visited = [];
    let solved = false;
    let prevA = new Array(HEIGHT * WIDTH).fill(0);
    let prevB = new Array(HEIGHT * WIDTH).fill(0);
    // Initialize a map to store the previous element for each element in the path
    // let previous = new Map();

    for(i = 0; i < HEIGHT; i++){ visited[i] = new Array(WIDTH).fill(false); }

    queueStart.push(startNodeNumber);
    queueGoal.push(goalNodeNumber);
    
     // Set up a loop to continue until one of the queues is empty
    while(queueStart.length > 0 || queueStart.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        let currentA = queueStart.shift();

        if(document.getElementById('node' + currentA).style.backgroundColor == GOAL_SEARCH_NODE_COLOR ||
           document.getElementById('node' + currentA).style.backgroundColor == GOAL_EDGE_NODE_COLOR){
            intersectNodeNumber = currentA;
            document.getElementById('node' + currentA).style.backgroundColor = INTERSECT_NODE_COLOR;
            solved = true;
            break;
        }

        let coordinateA = getNodeCoordinates(currentA);
        visited[coordinateA[0]][coordinateA[1]] = true;

        var adjA = adjacentsDict[currentA];
        for(count = 0; count < adjA.length; count++){
            document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
            var n = adjA[count];
            if(document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_SEARCH_NODE_COLOR ||
                   document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_EDGE_NODE_COLOR){
                    intersectNodeNumber = maze[n[0]][n[1]];
                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = INTERSECT_NODE_COLOR;
                    solved = true;
                    break;
                }
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                // previous.set(maze[n[0]][n[1]], currentA);

                

                
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
            }
            
        }

        let currentB = queueGoal.shift();

        if(document.getElementById('node' + currentB).style.backgroundColor == SEARCH_NODE_COLOR ||
            document.getElementById('node' + currentB).style.backgroundColor == EDGE_NODE_COLOR){
            intersectNodeNumber = currentB;
            document.getElementById('node' + currentB).style.backgroundColor = INTERSECT_NODE_COLOR;
            solved = true;
            break;
        }
        let coordinateB = getNodeCoordinates(currentB);
        visited[coordinateB[0]][coordinateB[1]] = true;

        var adjB = adjacentsDict[currentB];
        for(count = 0; count < adjB.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
            var n = adjB[count];
            if( document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == SEARCH_NODE_COLOR ||
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == EDGE_NODE_COLOR){
                    intersectNodeNumber = maze[n[0]][n[1]];
                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = INTERSECT_NODE_COLOR;
                    solved = true;
                    break;
                }
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                // previous.set(maze[n[0]][n[1]], currentB);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;

                

                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_SEARCH_NODE_COLOR;
            }
        }

        if(solved){
            break;
        }
    }

    if(!solved || intersectNodeNumber == undefined){
        alert('Impossible to solve! I will reset it.');
        return;
    }

    let loopControlA = false;
    intersectToStart = []; // gathers nodes from intersect to start node by grabbing the previous nodes
    previous = intersectNodeNumber - 1;
    intersectToStart.push(previous);
    
    while(true){
        let node = prevA[previous];
        intersectToStart.push(node);

        if(node == 0) loopControlA = true;
        else previous = node;

        if(loopControlA){
            break;
        }
    }

    for(node of intersectToStart.reverse()){ //intersectToStart.reverse() gives nodes sorted from start to node
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
            loopControlA = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }

    // if(prevB.includes(intersectNodeNumber - 1)){
    //     console.log('prevA contains intersectNodeNumber: ', intersectNodeNumber);
    // }else{
    //     console.log('prevA does not contains intersectNodeNumber: ', intersectNodeNumber);
    // }
    // console.log('prevA: ', prevA);
    // return;
    let loopControlB = false;
    intersectToGoal = []; // gathers nodes from intersect to start node by grabbing the previous nodes
    pre = intersectNodeNumber - 1;
    intersectToGoal.push(pre);
    
    while(true){
        let node = prevB[pre];
        intersectToGoal.push(node);

        if(node == 0) loopControlB = true;
        else pre = node;

        if(loopControlB){
            break;
        }
    }

    for(node of intersectToGoal.reverse()){ //intersectToGoal.reverse() gives nodes sorted from start to node
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
            loopControlB = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
    }
}

// function solveBidirectionalBfs(startNodeNumber, goalNodeNumber){
//     window.intersectNodeBfs = null;
//     window.visited = [];
//     for(i = 0; i < HEIGHT; i++){
//         window.visited[i] = new Array(WIDTH).fill(false);
//     }
//     solveFromStartNodeBfs(startNodeNumber);
//     solveFromGoalNodeBfs(goalNodeNumber);
// }
// async function solveFromStartNodeBfs(startNodeNumber){
//     var maze = construct2dArray();
//     var adjacentsDict = findAdjacents(maze);
//     // let visited = [];
//     let prev = new Array(HEIGHT * WIDTH).fill(0);
//     let queue = [];
//     let solved = false;
//     let goalNodeNumber = undefined;
    
//     // for(i = 0; i < HEIGHT; i++){
//     //     visited[i] = new Array(WIDTH).fill(false);
//     // }
//     queue.push(startNodeNumber);

//     while(queue.length > 0){
//         //Defining maze and adjacentsDict again and again enables wall changement in real time
//         var maze = construct2dArray();
//         var adjacentsDict = findAdjacents(maze);
//         var currentNode = queue.shift();
//         var coordinate = getNodeCoordinates(currentNode);
//         window.visited[coordinate[0]][coordinate[1]] = true;

//         if((document.getElementById('node' + currentNode).style.backgroundColor == GOAL_SEARCH_NODE_COLOR) ||
//            (document.getElementById('node' + currentNode).style.backgroundColor == GOAL_EDGE_NODE_COLOR)   ||
//            window.intersectNodeBfs != null){
//             window.intersectNodeBfs = currentNode;
//             goalNodeNumber = currentNode;
//             console.log('goalNodeNumber', goalNodeNumber);
//             solved = true;
//             break;
//         }

//         var adj = adjacentsDict[currentNode];
//         for(count = 0; count < adj.length; count++){
//             // document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
//             var n = adj[count];
//             if(!window.visited[n[0]][n[1]]){
//                 window.visited[n[0]][n[1]] = true;
//                 queue.push(maze[n[0]][n[1]]);
//                 prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
//                 if( (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_SEARCH_NODE_COLOR) ||
//                     (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_EDGE_NODE_COLOR)   ||
//                     window.intersectNodeBfs != null){
//                         window.intersectNodeBfs = currentNode;
//                         goalNodeNumber = maze[n[0]][n[1]];
//                         console.log('goalNodeNumber', goalNodeNumber);
//                         solved = true;
//                         break;
//                     }
                
//                 document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
//                 await sleep(1);
//                 document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
//             }
//         }

//         if(solved){
//             break;
//         }
//     }

//     if(!solved){
//         alert('Impossible to solve! I will reset it.');
//         return;
//     }

//     let loopControl = false;
//     goalToStart = []; // gathers nodes from goal to start node by grabbing the previous nodes
//     if(window.intersectNodeBfs != null){
//         previous = window.intersectNodeBfs - 1;
//         goalToStart.push(previous);
//     }else{
//         previous = goalNodeNumber - 1;
//         goalToStart.push(previous);
//     }

//     while(true){
//         let node = prev[previous];
//         goalToStart.push(node);

//         if(node == 0) loopControl = true;
//         else previous = node;

//         if(loopControl){
//             break;
//         }
//     }

//     for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
//         await sleep(25);
//         try{
//             if(node != 0){
//                 let n = document.getElementById('node' + (node + 1));
//                 n.style.backgroundColor = RED_COLOR
//                 await sleep(1);
//                 n.style.backgroundColor = ORANGE_COLOR;
//                 await sleep(1);
//                 n.style.backgroundColor = PATH_COLOR;
//             }
//         }catch(err){
//             loopControl = true;
//         }
//         document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
//         if(window.intersectNodeBfs != null){
//             document.getElementById('node' + window.intersectNodeBfs).style.backgroundColor = INTERSECT_NODE_COLOR;
//         }
//     }
// }
// async function solveFromGoalNodeBfs(startNodeNumber){ 
//     var maze = construct2dArray();
//     var adjacentsDict = findAdjacents(maze);
//     // let visited = [];
//     let prev = new Array(HEIGHT * WIDTH).fill(0);
//     let queue = [];
//     let solved = false;
//     let goalNodeNumber = undefined;
//     // for(i = 0; i < HEIGHT; i++){
//     //     visited[i] = new Array(WIDTH).fill(false);
//     // }
//     queue.push(startNodeNumber);

//     while(queue.length > 0){
//         //Defining maze and adjacentsDict again and again enables wall changement in real time
//         var maze = construct2dArray();
//         var adjacentsDict = findAdjacents(maze);
//         var currentNode = queue.shift();
//         var coordinate = getNodeCoordinates(currentNode);
//         window.visited[coordinate[0]][coordinate[1]] = true;
        
//         if((document.getElementById('node' + currentNode).style.backgroundColor == SEARCH_NODE_COLOR) ||
//            (document.getElementById('node' + currentNode).style.backgroundColor == EDGE_NODE_COLOR)   ||
//            window.intersectNodeBfs != null){
//             window.intersectNodeBfs = currentNode;
//             goalNodeNumber = currentNode;
//             console.log('goalNodeNumber', goalNodeNumber);
//             solved = true;
//             break;
//         }

//         var adj = adjacentsDict[currentNode];
//         for(count = 0; count < adj.length; count++){
//             // document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
//             var n = adj[count];
//             if(!window.visited[n[0]][n[1]]){
//                 window.visited[n[0]][n[1]] = true;
//                 queue.push(maze[n[0]][n[1]]);
//                 prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
//                 if( (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == SEARCH_NODE_COLOR) ||
//                     (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == EDGE_NODE_COLOR)   ||
//                     window.intersectNodeBfs != null){
//                         window.intersectNodeBfs = currentNode;
//                         goalNodeNumber = maze[n[0]][n[1]];
//                         console.log('goalNodeNumber', goalNodeNumber);
//                         solved = true;
//                         break;
//                     }
                
//                 document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_EDGE_NODE_COLOR;
//                 await sleep(1);
//                 document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_SEARCH_NODE_COLOR;
//             }
//         }
//         if(solved){
//             break;
//         }
//     }
//     if(!solved){
//         alert('Impossible to solve! I will reset it.');
//         return;
//     }

//     let loopControl = false;
//     goalToStart = []; // gathers nodes from goal to start node by grabbing the previous nodes
//     if(window.intersectNodeBfs != null){
//         previous = window.intersectNodeBfs - 1;
//         goalToStart.push(previous);
//     }else{
//         previous = goalNodeNumber - 1;
//         goalToStart.push(previous);
//     }
    
//     while(true){
//         let node = prev[previous];
//         goalToStart.push(node);

//         if(node == 0) loopControl = true;
//         else previous = node;

//         if(loopControl){
//             break;
//         }
//     }
//     for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
//         await sleep(25);
//         try{
//             if(node != 0){
//                 let n = document.getElementById('node' + (node + 1));
//                 n.style.backgroundColor = RED_COLOR
//                 await sleep(1);
//                 n.style.backgroundColor = ORANGE_COLOR;
//                 await sleep(1);
//                 n.style.backgroundColor = PATH_COLOR;
//             }
//         }catch(err){
//             loopControl = true;
//         }
//         document.getElementById('node' + startNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
//         if(window.intersectNodeBfs != null){
//             document.getElementById('node' + window.intersectNodeBfs).style.backgroundColor = INTERSECT_NODE_COLOR;
//         }
//     }
// }
/* ------------------------------------------------------------*/
// #endregion
// #region DFS_ALGORITHM 
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
// #endregion
// #region BIDIRECTIONAL_DFS_ALGORITHM 
/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('#buttonBD_DFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    
    let shortestPath = solveBidirectionalDfs(startNodeNumber, goalNodeNumber);
    // console.log('ShortestPath from solveBfs: ', shortestPath);
    // reconstructPathForBfs.apply(...shortestPath);
})
function solveBidirectionalDfs(startNodeNumber, goalNodeNumber){
    window.intersectionHappened = false;
    solveFromStartNodeDfs(startNodeNumber);
    solveFromGoalNodeDfs(goalNodeNumber);
}
async function solveFromStartNodeDfs(startNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;
    let goalNodeNumber = undefined;
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
        var coordinate = getNodeCoordinates(currentNode);
        visited[coordinate[0]][coordinate[1]] = true;

        if(document.getElementById('node' + currentNode).style.backgroundColor == GOAL_SEARCH_NODE_COLOR ||
           document.getElementById('node' + currentNode).style.backgroundColor == GOAL_EDGE_NODE_COLOR){
            goalNodeNumber = currentNode;
            solved = true;
            break;
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            // document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;

                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if( document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_SEARCH_NODE_COLOR ||
                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_EDGE_NODE_COLOR){
                        goalNodeNumber = maze[n[0]][n[1]];
                        solved = true;
                        break;
                    }
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
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
async function solveFromGoalNodeDfs(startNodeNumber){ 
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;
    let goalNodeNumber = undefined;
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
        var coordinate = getNodeCoordinates(currentNode);
        visited[coordinate[0]][coordinate[1]] = true;

        if(document.getElementById('node' + currentNode).style.backgroundColor == SEARCH_NODE_COLOR ||
           document.getElementById('node' + currentNode).style.backgroundColor == EDGE_NODE_COLOR){
            goalNodeNumber = currentNode;
            solved = true;
            break;
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            // document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                
                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if( document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == SEARCH_NODE_COLOR ||
                    document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == EDGE_NODE_COLOR){
                        goalNodeNumber = maze[n[0]][n[1]];
                        solved = true;
                        break;
                    }

                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_SEARCH_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = GOAL_EDGE_NODE_COLOR;
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
        document.getElementById('node' + startNodeNumber).style.backgroundColor = GOAL_NODE_COLOR;
        document.getElementById('node' + goalNodeNumber).style.backgroundColor = INTERSECT_NODE_COLOR;
    }
}
/* ------------------------------------------------------------*/
// #endregion
// #region A_STAR_ALGORITHM 
/* --------------------A* algorithm---------------------------*/
document.querySelector('#buttonA_star').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    aStar(startNodeNumber, goalNodeNumber);
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
async function aStar(start, goal) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    // var prev = new Map();
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    // Set of unvisited nodes
    const unvisitedNodes = new Set();
  
    // Set initial distance to infinity for all nodes except the starting node
    const distances = {};

    for(let i = 0; i < HEIGHT * WIDTH; i++){
        distances[i] = Number.POSITIVE_INFINITY;
        unvisitedNodes.add(i + 1);
    }
    distances[start] = 0;
  
    // Set of visited nodes
    const visitedNodes = new Set();
  
    // Set the heuristic distance to the goal for all nodes
    const heuristicDistances = {};
    for (const node of unvisitedNodes) {
      heuristicDistances[node] = Number.POSITIVE_INFINITY;
    }
    heuristicDistances[goal] = 0;
    heuristicDistances[start] = heuristicFunction(getNodeCoordinates(start), getNodeCoordinates(goal));
    // While there are unvisited nodes
    while (unvisitedNodes.size > 0) {
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // Select the unvisited node with the smallest distance + heuristic distance
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] + heuristicDistances[a] - distances[b] - heuristicDistances[b])[0];
    
        // Check if we have reached the goal
        if(currentNode == goal){
            solved = true;
            break;
        }
    
        // Mark the current node as visited
        visitedNodes.add(currentNode);
        unvisitedNodes.delete(currentNode);

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            //   document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
              
            // prev.set(maze[n[0]][n[1]], currentNode);
            if(visitedNodes.has(maze[n[0]][n[1]])){
                continue;
            }
            // (Math.floor(Math.random() * 5) + 1) generates value between 1 and 5, but more realistic is that the weight is always 1
            const newDistance = distances[currentNode] + 1;//(Math.floor(Math.random() * 5) + 1); 
            if (newDistance < distances[maze[n[0]][n[1]]]) {
                distances[maze[n[0]][n[1]]] = newDistance;
                heuristicDistances[maze[n[0]][n[1]]] = heuristicFunction(getNodeCoordinates(maze[n[0]][n[1]]), getNodeCoordinates(goal));
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if(maze[n[0]][n[1]] == goal){
                    solved = true;
                    break;
                }
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
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
    previous = goal - 1;
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
        document.getElementById('node' + start).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + goal).style.backgroundColor = GOAL_NODE_COLOR;
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
// #endregion
// #region DIJKSTRA
document.querySelector('#buttonDijkstra').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    
    solveDijkstra(startNodeNumber, goalNodeNumber);
});
async function solveDijkstra(startNodeNumber, goalNodeNumber) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var solved = false;
    // var prev = new Map();
    var prev = new Array(HEIGHT * WIDTH).fill(0);
    // Set of unvisited nodes
    const unvisitedNodes = new Set();

    // Set initial distance to infinity for all nodes except the starting node
    const distances = {};

    for(let i = 0; i < HEIGHT * WIDTH; i++){
        distances[i] = Number.POSITIVE_INFINITY;
        unvisitedNodes.add(i + 1);
    }
    distances[startNodeNumber] = 0;
  
    // Set of visited nodes
    const visitedNodes = new Set();
  
    // While there are unvisited nodes
    while (unvisitedNodes.size > 0) {
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // Select the unvisited node with the smallest distance
        const currentNode = [...unvisitedNodes].sort((a, b) => distances[a] - distances[b])[0];

        // Mark the current node as visited
        visitedNodes.add(currentNode);
        unvisitedNodes.delete(currentNode);

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            //   document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
              
            // prev.set(maze[n[0]][n[1]], currentNode);
            if(visitedNodes.has(maze[n[0]][n[1]])){
                continue;
            }
            // (Math.floor(Math.random() * 5) + 1) generates value between 1 and 5, but more realistic is that the weight is always 1
            const newDistance = distances[currentNode] + (Math.floor(Math.random() * 5) + 1); 
            if (newDistance < distances[maze[n[0]][n[1]]]) {
                distances[maze[n[0]][n[1]]] = newDistance;
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if(maze[n[0]][n[1]] == goalNodeNumber){
                    solved = true;
                    break;
                }
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
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
// #endregion
// #endregion
// #region MAZE_GENERATORS
// #region RANDOM_MAZE
document.querySelector('#buttonRandomMaze').addEventListener('click', function(e){
    // var scheme_array = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, 62, -1, 64, 65, 66, 67, 68, 69, 70, -1, 72, 73, 74, 75, 76, 77, 78, -1, 80, 81, 82, 83, -1, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, -1, 102, -1, 104, 105, 106, 107, 108, 109, 110, -1, 112, 113, 114, 115, 116, 117, 118, 119, -1,
    //     -1, 122, -1, 124, -1, -1, 127, -1, 129, -1, -1, 132, -1, 134, -1, -1, -1, 138, -1, 140, -1, -1, -1, -1, 145, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 158, -1, 160, -1, 162, -1, 164, -1, -1, 167, -1, 169, -1, -1, 172, -1, 174, -1, -1, -1, 178, -1, -1,
    //     -1, 182, -1, 184, -1, 186, 187, -1, 189, 190, -1, 192, -1, 194, 195, 196, -1, 198, 199, 200, -1, 202, 203, 204, 205, 206, -1, 208, 209, 210, 211, 212, -1, 214, -1, 216, 217, 218, -1, 220, -1, 222, -1, 224, -1, 226, 227, -1, 229, 230, -1, 232, -1, 234, 235, 236, -1, 238, 239, -1,
    //     -1, 242, 243, 244, -1, 246, -1, -1, 249, -1, -1, 252, -1, -1, -1, 256, -1, -1, -1, -1, -1, 262, -1, -1, -1, 266, -1, 268, -1, -1, -1, 272, -1, 274, -1, 276, -1, 278, -1, 280, -1, 282, 283, 284, -1, 286, -1, -1, 289, -1, -1, 292, -1, -1, -1, 296, -1, 298, -1, -1,
    //     -1, -1, -1, -1, -1, 306, -1, 308, 309, 310, -1, 312, -1, 314, -1, 316, -1, 318, 319, 320, -1, 322, 323, 324, -1, 326, -1, 328, 329, 330, -1, 332, 333, 334, -1, 336, -1, 338, -1, 340, -1, -1, -1, -1, -1, 346, -1, 348, 349, 350, -1, 352, -1, 354, -1, 356, -1, 358, 359, -1,
    //     -1, 362, 363, 364, 365, 366, -1, 368, -1, 370, -1, 372, -1, 374, -1, 376, -1, 378, -1, 380, -1, -1, -1, 384, -1, 386, -1, -1, -1, 390, -1, -1, -1, -1, -1, 396, -1, -1, -1, 400, -1, 402, 403, 404, 405, 406, -1, 408, -1, 410, -1, 412, -1, 414, -1, 416, -1, 418, -1, -1,
    //     -1, 422, -1, -1, -1, -1, -1, 428, -1, 430, -1, 432, -1, 434, -1, 436, -1, 438, -1, 440, -1, 442, 443, 444, -1, 446, 447, 448, -1, 450, 451, 452, 453, 454, -1, 456, -1, 458, 459, 460, -1, 462, -1, -1, -1, -1, -1, 468, -1, 470, -1, 472, -1, 474, -1, 476, -1, 478, 479, -1,
    //     -1, 482, -1, 484, 485, 486, -1, 488, -1, 490, -1, 492, -1, 494, -1, 496, -1, -1, -1, 500, -1, 502, -1, -1, -1, -1, -1, 508, -1, -1, -1, 512, -1, 514, -1, 516, -1, 518, -1, -1, -1, 522, -1, 524, 525, 526, -1, 528, -1, 530, -1, 532, -1, 534, -1, 536, -1, -1, -1, -1,
    //     -1, 542, 543, 544, -1, 546, -1, -1, -1, -1, -1, 552, 553, 554, -1, 556, 557, 558, -1, 560, 561, 562, 563, 564, -1, 566, 567, 568, -1, 570, 571, 572, -1, 574, -1, 576, -1, 578, -1, 580, 581, 582, 583, 584, -1, 586, -1, -1, -1, -1, -1, 592, 593, 594, -1, 596, 597, 598, 599, -1,
    //     -1, 602, -1, 604, -1, 606, -1, 608, 609, 610, -1, -1, -1, -1, -1, 616, -1, 618, -1, -1, -1, -1, -1, -1, -1, 626, -1, -1, -1, -1, -1, -1, -1, 634, -1, 636, -1, 638, -1, 640, -1, 642, -1, 644, -1, 646, -1, 648, 649, 650, -1, -1, -1, -1, -1, 656, -1, 658, -1, -1,
    //     -1, 662, -1, 664, -1, 666, -1, 668, -1, 670, -1, 672, 673, 674, 675, 676, -1, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, -1, 690, 691, 692, -1, 694, 695, 696, -1, 698, 699, 700, -1, 702, -1, 704, -1, 706, -1, 708, -1, 710, -1, 712, 713, 714, 715, 716, -1, 718, 719, -1,
    //     -1, 722, -1, -1, -1, 726, -1, 728, -1, -1, -1, 732, -1, -1, -1, 736, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 748, -1, 750, -1, 752, -1, -1, -1, -1, -1, -1, -1, 760, -1, 762, -1, -1, -1, 766, -1, 768, -1, -1, -1, 772, -1, -1, -1, 776, -1, -1, -1, -1,
    //     -1, 782, -1, 784, 785, 786, -1, 788, -1, 790, 791, 792, -1, 794, -1, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, -1, 808, -1, 810, -1, 812, -1, 814, 815, 816, 817, 818, -1, 820, -1, -1, -1, 824, 825, 826, -1, 828, -1, 830, 831, 832, -1, 834, -1, 836, 837, 838, 839, -1,
    //     -1, 842, -1, 844, -1, -1, -1, 848, -1, 850, -1, -1, -1, 854, -1, 856, -1, -1, -1, -1, -1, -1, -1, -1, -1, 866, -1, 868, -1, 870, -1, 872, -1, 874, -1, -1, -1, 878, -1, 880, 881, 882, -1, 884, -1, -1, -1, 888, -1, 890, -1, -1, -1, 894, -1, 896, -1, -1, -1, -1,
    //     -1, 902, -1, 904, 905, 906, -1, 908, 909, 910, 911, 912, -1, 914, 915, 916, -1, 918, 919, 920, -1, 922, -1, 924, -1, 926, -1, 928, -1, 930, -1, 932, 933, 934, -1, 936, -1, 938, -1, 940, -1, -1, -1, 944, 945, 946, -1, 948, 949, 950, 951, 952, -1, 954, 955, 956, -1, 958, 959, -1,
    //     -1, 962, -1, -1, -1, 966, -1, -1, -1, -1, -1, 972, -1, 974, -1, -1, -1, 978, -1, 980, -1, 982, 983, 984, -1, 986, -1, -1, -1, 990, -1, -1, -1, -1, -1, 996, -1, 998, -1, 1000, 1001, 1002, -1, -1, -1, 1006, -1, -1, -1, -1, -1, 1012, -1, 1014, -1, -1, -1, 1018, -1, -1,
    //     -1, 1022, 1023, 1024, -1, 1026, -1, 1028, 1029, 1030, 1031, 1032, -1, 1034, 1035, 1036, -1, 1038, -1, -1, -1, -1, -1, 1044, -1, 1046, 1047, 1048, 1049, 1050, -1, 1052, 1053, 1054, 1055, 1056, -1, 1058, -1, 1060, -1, 1062, 1063, 1064, -1, 1066, -1, 1068, 1069, 1070, 1071, 1072, -1, 1074, 1075, 1076, 1077, 1078, 1079, -1,
    //     -1, 1082, -1, 1084, -1, -1, -1, 1088, -1, 1090, -1, -1, -1, -1, -1, -1, -1, 1098, -1, 1100, 1101, 1102, 1103, 1104, -1, -1, -1, 1108, -1, -1, -1, 1112, -1, -1, -1, 1116, -1, 1118, -1, 1120, -1, -1, -1, 1124, -1, -1, -1, 1128, -1, 1130, -1, -1, -1, -1, -1, -1, -1, -1, 1139, -1,
    //     -1, 1142, -1, 1144, 1145, 1146, -1, 1148, -1, 1150, 1151, 1152, -1, 1154, 1155, 1156, 1157, 1158, -1, 1160, -1, -1, -1, 1164, 1165, 1166, -1, 1168, 1169, 1170, 1171, 1172, -1, 1174, 1175, 1176, -1, 1178, -1, 1180, -1, 1182, -1, 1184, 1185, 1186, -1, 1188, -1, 1190, 1191, 1192, -1, 1194, 1195, 1196, 1197, 1198, 1199, -1,
    //     -1, -1, -1, -1, -1, 1206, -1, 1208, -1, -1, -1, -1, -1, 1214, -1, -1, -1, -1, -1, 1220, 1221, 1222, -1, -1, -1, 1226, -1, -1, -1, -1, -1, -1, -1, 1234, -1, 1236, -1, 1238, -1, 1240, -1, 1242, -1, -1, -1, 1246, -1, 1248, -1, -1, -1, -1, -1, 1254, -1, -1, -1, -1, -1, -1,
    //     -1, 1262, 1263, 1264, -1, 1266, -1, 1268, -1, 1270, 1271, 1272, -1, 1274, 1275, 1276, 1277, 1278, -1, -1, -1, 1282, -1, 1284, 1285, 1286, -1, 1288, 1289, 1290, 1291, 1292, 1293, 1294, -1, 1296, -1, 1298, -1, 1300, -1, 1302, -1, 1304, -1, 1306, -1, 1308, -1, 1310, 1311, 1312, -1, 1314, 1315, 1316, 1317, 1318, 1319, -1,
    //     -1, 1322, -1, 1324, 1325, 1326, -1, 1328, 1329, 1330, -1, 1332, -1, -1, -1, -1, -1, 1338, -1, 1340, 1341, 1342, -1, 1344, -1, 1346, -1, 1348, -1, -1, -1, -1, -1, 1354, -1, -1, -1, 1358, -1, 1360, 1361, 1362, -1, 1364, -1, 1366, -1, 1368, 1369, 1370, -1, 1372, -1, 1374, -1, -1, 1377, -1, -1, -1,
    //     -1, 1382, -1, -1, -1, -1, -1, -1, 1389, -1, -1, 1392, -1, 1394, 1395, 1396, -1, 1398, -1, -1, -1, 1402, -1, 1404, -1, 1406, -1, 1408, -1, 1410, 1411, 1412, -1, 1414, -1, 1416, 1417, 1418, -1, 1420, -1, 1422, 1423, 1424, 1425, 1426, -1, -1, 1429, -1, -1, 1432, -1, 1434, 1435, 1436, 1437, -1, 1439, -1,
    //     -1, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, -1, 1452, 1453, 1454, -1, 1456, -1, 1458, -1, 1460, -1, 1462, 1463, 1464, -1, 1466, -1, 1468, -1, -1, -1, 1472, -1, 1474, -1, 1476, -1, -1, -1, -1, -1, 1482, -1, -1, -1, 1486, 1487, 1488, 1489, 1490, -1, 1492, 1493, 1494, 1495, -1, -1, -1, 1499, -1,
    //     -1, 1502, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1514, -1, -1, -1, 1518, -1, 1520, -1, -1, -1, -1, -1, 1526, 1527, 1528, 1529, 1530, 1531, 1532, -1, 1534, -1, 1536, 1537, 1538, 1539, 1540, -1, 1542, -1, 1544, 1545, 1546, -1, -1, -1, -1, -1, -1, -1, -1, 1555, 1556, 1557, 1558, 1559, -1,
    //     -1, 1562, -1, 1564, 1565, 1566, -1, 1568, 1569, 1570, -1, 1572, 1573, 1574, 1575, 1576, -1, 1578, -1, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, -1, -1, -1, -1, -1, -1, 1594, -1, -1, -1, 1598, -1, 1600, -1, 1602, -1, 1604, -1, 1606, 1607, 1608, 1609, 1610, -1, 1612, 1613, -1, 1615, -1, -1, -1, 1619, -1,
    //     -1, 1622, 1623, 1624, -1, -1, -1, 1628, -1, 1630, -1, -1, -1, -1, -1, 1636, -1, 1638, -1, 1640, -1, -1, -1, -1, -1, -1, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, -1, 1656, 1657, 1658, -1, 1660, -1, 1662, 1663, 1664, -1, 1666, -1, -1, -1, -1, -1, 1672, 1673, -1, 1675, -1, 1677, 1678, 1679, -1,
    //     -1, -1, -1, -1, -1, 1686, 1687, 1688, -1, 1690, 1691, 1692, 1693, -1, 1695, 1696, -1, 1698, -1, 1700, -1, 1702, 1703, 1704, 1705, -1, 1707, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1720, -1, -1, -1, -1, -1, 1726, -1, 1728, 1729, 1730, -1, 1732, -1, -1, 1735, -1, -1, -1, 1739, -1,
    //     -1, 1742, 1743, 1744, -1, 1746, -1, -1, -1, -1, -1, -1, 1753, -1, -1, 1756, -1, 1758, -1, 1760, -1, 1762, -1, -1, 1765, -1, 1767, -1, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, -1, 1780, -1, 1782, 1783, 1784, -1, 1786, -1, -1, -1, 1790, -1, 1792, -1, 1794, 1795, 1796, 1797, -1, 1799, -1,
    //     -1, 1802, -1, 1804, -1, 1806, 1807, 1808, -1, 1810, 1811, 1812, 1813, -1, 1815, 1816, 1817, 1818, -1, 1820, 1821, 1822, -1, 1824, 1825, -1, 1827, -1, 1829, -1, -1, -1, -1, -1, -1, -1, -1, 1838, -1, 1840, -1, 1842, -1, 1844, -1, 1846, 1847, 1848, -1, 1850, 1851, 1852, -1, 1854, -1, 1856, -1, -1, 1859, -1,
    //     -1, 1862, -1, 1864, -1, -1, -1, -1, -1, 1870, -1, -1, 1873, -1, -1, -1, -1, 1878, -1, 1880, -1, -1, -1, 1884, -1, -1, 1887, -1, 1889, 1890, 1891, -1, 1893, 1894, 1895, 1896, -1, 1898, -1, 1900, -1, 1902, -1, 1904, -1, 1906, -1, -1, -1, 1910, -1, -1, -1, -1, -1, 1916, 1917, 1918, 1919, -1,
    //     -1, 1922, -1, 1924, -1, 1926, 1927, 1928, -1, 1930, -1, 1932, 1933, 1934, 1935, 1936, -1, 1938, -1, 1940, 1941, 1942, -1, 1944, 1945, 1946, 1947, -1, -1, -1, 1951, -1, 1953, -1, 1955, 1956, -1, 1958, 1959, 1960, -1, 1962, -1, 1964, -1, 1966, -1, 1968, 1969, 1970, 1971, 1972, -1, 1974, 1975, 1976, -1, -1, -1, -1,
    //     -1, 1982, -1, 1984, -1, 1986, -1, 1988, -1, 1990, -1, -1, -1, 1994, -1, -1, -1, 1998, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2009, 2010, 2011, -1, 2013, -1, 2015, -1, -1, -1, -1, 2020, -1, 2022, -1, 2024, -1, 2026, -1, 2028, -1, -1, 2031, -1, -1, -1, -1, 2036, 2037, 2038, 2039, -1,
    //     -1, 2042, -1, 2044, -1, 2046, -1, 2048, 2049, 2050, 2051, 2052, -1, 2054, 2055, 2056, -1, 2058, -1, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, -1, -1, -1, 2073, -1, 2075, 2076, 2077, 2078, 2079, 2080, -1, 2082, -1, 2084, -1, 2086, -1, 2088, -1, 2090, 2091, 2092, -1, 2094, -1, 2096, -1, -1, -1, -1,
    //     -1, 2102, -1, 2104, -1, 2106, -1, -1, -1, -1, -1, 2112, -1, -1, -1, -1, -1, 2118, -1, 2120, -1, -1, -1, -1, -1, 2126, -1, -1, -1, -1, 2131, 2132, 2133, -1, 2135, -1, 2137, -1, -1, -1, -1, 2142, -1, 2144, -1, -1, -1, 2148, -1, 2150, -1, -1, -1, 2154, -1, 2156, -1, 2158, 2159, -1,
    //     -1, 2162, -1, 2164, 2165, 2166, -1, 2168, 2169, 2170, -1, 2172, 2173, 2174, -1, 2176, 2177, 2178, -1, 2180, 2181, 2182, 2183, 2184, -1, 2186, 2187, 2188, 2189, -1, 2191, -1, 2193, -1, 2195, -1, 2197, 2198, 2199, 2200, -1, 2202, -1, 2204, 2205, 2206, 2207, 2208, 2209, 2210, -1, 2212, 2213, 2214, -1, 2216, -1, 2218, -1, -1,
    //     -1, 2222, -1, -1, -1, -1, -1, -1, -1, 2230, -1, -1, -1, 2234, -1, 2236, -1, -1, -1, -1, -1, -1, -1, 2244, -1, -1, -1, -1, 2249, -1, 2251, -1, -1, -1, 2255, -1, 2257, -1, -1, 2260, 2261, 2262, -1, -1, -1, -1, -1, -1, -1, 2270, -1, 2272, -1, 2274, -1, 2276, 2277, 2278, 2279, -1,
    //     -1, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, -1, 2294, 2295, 2296, 2297, 2298, -1, 2300, 2301, 2302, 2303, 2304, -1, 2306, 2307, 2308, 2309, -1, 2311, 2312, 2313, 2314, 2315, -1, 2317, 2318, 2319, 2320, -1, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, -1, 2332, -1, 2334, 2335, 2336, -1, 2338, 2339, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    generateMaze(generateWalls());
})
// #endregion
// #region VERTICAL_BAES__MAZE
document.querySelector('#buttonVerticalBaesMaze').addEventListener('click', function(e){
    var scheme_array = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 62, 63, 64, -1, 66, 67, 68, -1, 70, -1, 72, -1, 74, -1, 76, -1, 78, -1, 80, 81, 82, 83, 84, 85, 86, -1, 88, -1, 90, -1, 92, -1, 94, -1, 96, 97, 98, -1, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, -1,
        -1, 122, -1, 124, -1, 126, -1, 128, -1, 130, -1, 132, -1, 134, -1, 136, -1, 138, -1, 140, -1, 142, -1, 144, -1, 146, -1, 148, -1, 150, -1, 152, -1, 154, -1, -1, -1, 158, -1, -1, -1, 162, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 174, -1, -1, -1, 178, -1, -1,
        -1, 182, -1, 184, -1, 186, -1, 188, 189, 190, 191, 192, -1, 194, 195, 196, 197, 198, -1, 200, -1, 202, -1, 204, -1, 206, 207, 208, -1, 210, -1, 212, -1, 214, -1, 216, 217, 218, -1, 220, -1, 222, -1, 224, 225, 226, -1, 228, -1, 230, 231, 232, -1, 234, -1, 236, -1, 238, 239, -1,
        -1, 242, -1, 244, -1, -1, -1, -1, -1, -1, -1, 252, -1, -1, -1, 256, -1, -1, -1, 260, -1, -1, -1, 264, -1, 266, -1, -1, -1, 270, -1, 272, -1, 274, -1, 276, -1, 278, -1, 280, -1, 282, -1, 284, -1, 286, -1, 288, -1, 290, -1, 292, -1, 294, -1, 296, -1, 298, 299, -1,
        -1, 302, -1, 304, -1, 306, 307, 308, -1, 310, 311, 312, -1, 314, -1, 316, -1, 318, -1, 320, -1, 322, -1, 324, 325, 326, -1, 328, 329, 330, -1, 332, -1, 334, -1, 336, -1, 338, -1, 340, -1, 342, -1, 344, -1, 346, 347, 348, 349, 350, -1, 352, -1, 354, -1, 356, 357, 358, 359, -1,
        -1, 362, -1, 364, -1, 366, -1, 368, -1, -1, -1, 372, -1, 374, -1, 376, -1, 378, -1, 380, -1, 382, -1, 384, -1, 386, -1, 388, -1, 390, -1, 392, -1, 394, -1, 396, -1, 398, -1, 400, -1, 402, -1, -1, -1, -1, -1, -1, -1, 410, -1, -1, -1, 414, -1, -1, -1, -1, -1, -1,
        -1, 422, -1, 424, -1, 426, -1, 428, -1, 430, 431, 432, -1, 434, -1, 436, 437, 438, -1, 440, -1, 442, -1, 444, -1, 446, -1, 448, -1, 450, -1, 452, -1, 454, -1, 456, -1, 458, -1, 460, -1, 462, 463, 464, 465, 466, -1, 468, -1, 470, 471, 472, -1, 474, -1, 476, 477, -1, 479, -1,
        -1, 482, -1, 484, -1, 486, -1, 488, -1, 490, -1, 492, -1, 494, -1, -1, -1, 498, -1, 500, -1, 502, -1, 504, -1, 506, -1, 508, -1, 510, -1, 512, -1, 514, -1, 516, -1, 518, -1, 520, -1, 522, -1, 524, -1, 526, -1, 528, -1, -1, -1, 532, -1, 534, -1, -1, 537, -1, 539, -1,
        -1, 542, -1, 544, -1, 546, -1, 548, 549, 550, -1, 552, -1, 554, 555, 556, -1, 558, -1, 560, 561, 562, -1, 564, -1, 566, -1, 568, -1, 570, -1, 572, -1, 574, -1, 576, -1, 578, -1, 580, -1, 582, -1, 584, -1, 586, 587, 588, -1, 590, -1, 592, -1, 594, 595, -1, 597, -1, 599, -1,
        -1, 602, -1, 604, -1, 606, -1, 608, -1, -1, -1, -1, -1, 614, -1, 616, -1, 618, -1, 620, -1, 622, -1, 624, -1, 626, -1, 628, -1, 630, -1, 632, -1, 634, 635, 636, -1, 638, -1, 640, -1, 642, -1, 644, -1, 646, -1, 648, -1, 650, -1, 652, -1, -1, 655, -1, 657, -1, 659, -1,
        -1, 662, -1, 664, -1, 666, -1, 668, -1, 670, -1, 672, -1, 674, -1, 676, 677, 678, -1, 680, -1, 682, -1, 684, -1, 686, -1, 688, -1, 690, -1, 692, -1, 694, -1, 696, -1, 698, -1, 700, -1, 702, -1, 704, -1, 706, -1, 708, -1, 710, -1, 712, -1, 714, 715, -1, 717, -1, 719, -1,
        -1, 722, -1, 724, -1, 726, -1, 728, -1, 730, -1, 732, -1, 734, -1, 736, -1, 738, -1, 740, -1, 742, -1, 744, -1, 746, -1, 748, -1, 750, -1, 752, -1, 754, -1, 756, -1, -1, -1, 760, -1, 762, -1, 764, -1, 766, -1, 768, -1, 770, -1, 772, -1, -1, 775, -1, 777, -1, 779, -1,
        -1, 782, -1, 784, -1, 786, -1, 788, -1, 790, -1, 792, -1, 794, -1, 796, -1, 798, -1, 800, -1, 802, -1, 804, -1, 806, 807, 808, -1, 810, -1, 812, -1, 814, -1, 816, 817, 818, -1, 820, -1, 822, -1, 824, -1, 826, -1, 828, -1, 830, -1, 832, -1, 834, 835, -1, 837, -1, 839, -1,
        -1, 842, -1, 844, -1, 846, -1, 848, -1, 850, -1, 852, -1, -1, -1, 856, -1, -1, -1, 860, -1, 862, -1, 864, -1, 866, -1, 868, -1, 870, -1, 872, -1, 874, -1, 876, -1, 878, -1, 880, -1, 882, -1, 884, -1, 886, -1, 888, -1, 890, 891, 892, -1, -1, 895, -1, 897, -1, 899, -1,
        -1, 902, -1, 904, -1, 906, -1, 908, -1, 910, -1, 912, -1, 914, -1, 916, 917, 918, 919, 920, -1, 922, -1, 924, -1, 926, -1, 928, -1, 930, -1, 932, -1, 934, -1, 936, -1, 938, -1, 940, -1, 942, -1, 944, -1, 946, -1, 948, -1, 950, -1, -1, -1, 954, 955, -1, 957, -1, 959, -1,
        -1, 962, -1, 964, -1, -1, -1, 968, -1, 970, -1, 972, -1, 974, -1, 976, -1, 978, -1, 980, -1, 982, -1, 984, -1, 986, -1, 988, -1, 990, -1, 992, -1, 994, -1, 996, -1, 998, -1, 1000, -1, 1002, -1, 1004, -1, -1, -1, 1008, -1, 1010, -1, 1012, -1, -1, 1015, -1, 1017, -1, 1019, -1,
        -1, 1022, -1, 1024, -1, 1026, -1, 1028, -1, 1030, -1, 1032, -1, 1034, -1, 1036, -1, 1038, -1, 1040, -1, 1042, -1, 1044, -1, 1046, -1, 1048, -1, 1050, -1, 1052, -1, 1054, -1, 1056, -1, 1058, -1, 1060, -1, 1062, -1, 1064, -1, 1066, 1067, 1068, -1, 1070, -1, 1072, -1, 1074, 1075, 1076, 1077, 1078, 1079, -1,
        -1, 1082, -1, 1084, -1, 1086, -1, 1088, -1, 1090, -1, 1092, -1, 1094, -1, 1096, -1, 1098, 1099, 1100, -1, 1102, -1, 1104, -1, 1106, -1, 1108, -1, 1110, -1, 1112, -1, 1114, -1, 1116, -1, 1118, -1, 1120, -1, 1122, -1, 1124, -1, 1126, -1, 1128, -1, 1130, -1, 1132, -1, 1134, -1, 1136, 1137, 1138, 1139, -1,
        -1, 1142, -1, 1144, 1145, 1146, -1, 1148, -1, 1150, -1, 1152, -1, 1154, -1, 1156, -1, 1158, -1, 1160, -1, 1162, -1, 1164, -1, 1166, -1, 1168, -1, 1170, -1, 1172, -1, 1174, -1, 1176, -1, 1178, -1, 1180, -1, 1182, -1, 1184, -1, 1186, -1, 1188, -1, 1190, -1, 1192, -1, 1194, -1, -1, -1, -1, 1199, -1,
        -1, 1202, -1, 1204, -1, 1206, -1, 1208, -1, 1210, -1, 1212, -1, 1214, -1, 1216, -1, 1218, -1, 1220, -1, 1222, -1, 1224, -1, 1226, -1, 1228, -1, 1230, -1, 1232, -1, 1234, -1, 1236, -1, 1238, -1, 1240, -1, 1242, -1, 1244, -1, 1246, -1, 1248, -1, 1250, -1, 1252, -1, 1254, -1, 1256, 1257, 1258, 1259, -1,
        -1, 1262, -1, 1264, -1, 1266, -1, 1268, -1, 1270, -1, 1272, -1, 1274, -1, 1276, -1, 1278, -1, 1280, -1, 1282, -1, 1284, -1, 1286, -1, 1288, -1, 1290, -1, 1292, -1, 1294, -1, 1296, -1, 1298, -1, 1300, -1, 1302, -1, 1304, -1, 1306, -1, 1308, -1, 1310, -1, 1312, -1, 1314, -1, 1316, -1, -1, -1, -1,
        -1, 1322, -1, 1324, -1, 1326, -1, 1328, -1, 1330, -1, 1332, -1, 1334, -1, 1336, -1, 1338, -1, 1340, -1, 1342, -1, 1344, -1, 1346, -1, 1348, -1, 1350, -1, 1352, -1, 1354, -1, 1356, -1, 1358, -1, 1360, -1, 1362, -1, 1364, -1, 1366, -1, 1368, -1, 1370, -1, 1372, -1, 1374, -1, 1376, 1377, 1378, 1379, -1,
        -1, 1382, -1, 1384, -1, 1386, -1, 1388, -1, 1390, -1, 1392, -1, 1394, -1, 1396, -1, 1398, -1, 1400, -1, 1402, -1, 1404, -1, 1406, -1, 1408, -1, 1410, -1, 1412, -1, 1414, -1, -1, -1, 1418, -1, 1420, -1, 1422, -1, 1424, -1, 1426, -1, 1428, -1, 1430, -1, 1432, 1433, 1434, -1, -1, -1, -1, 1439, -1,
        -1, 1442, -1, 1444, -1, 1446, -1, 1448, -1, 1450, -1, 1452, -1, 1454, -1, 1456, -1, 1458, -1, 1460, -1, 1462, -1, 1464, -1, 1466, -1, 1468, -1, 1470, -1, 1472, -1, 1474, -1, 1476, 1477, 1478, -1, 1480, -1, 1482, -1, 1484, -1, 1486, -1, 1488, -1, 1490, -1, 1492, -1, 1494, 1495, 1496, 1497, -1, 1499, -1,
        -1, 1502, -1, 1504, -1, 1506, -1, 1508, -1, 1510, -1, 1512, -1, 1514, -1, 1516, -1, 1518, -1, 1520, -1, 1522, -1, 1524, -1, 1526, -1, 1528, -1, 1530, -1, 1532, -1, 1534, -1, 1536, -1, 1538, -1, 1540, -1, 1542, -1, 1544, -1, 1546, -1, 1548, -1, 1550, -1, 1552, -1, 1554, 1555, -1, -1, -1, 1559, -1,
        -1, 1562, -1, 1564, -1, 1566, -1, 1568, -1, 1570, -1, 1572, -1, 1574, -1, 1576, -1, 1578, -1, 1580, -1, 1582, -1, 1584, -1, 1586, -1, 1588, -1, 1590, -1, 1592, -1, 1594, -1, 1596, -1, 1598, -1, 1600, -1, 1602, -1, 1604, -1, 1606, -1, 1608, -1, 1610, -1, 1612, -1, 1614, 1615, 1616, 1617, -1, 1619, -1,
        -1, 1622, -1, 1624, -1, 1626, -1, 1628, -1, 1630, -1, 1632, -1, 1634, -1, 1636, -1, 1638, -1, 1640, -1, 1642, -1, 1644, -1, 1646, -1, 1648, -1, 1650, -1, 1652, -1, 1654, -1, 1656, -1, 1658, -1, 1660, -1, 1662, -1, 1664, -1, 1666, -1, 1668, -1, 1670, -1, 1672, -1, 1674, -1, -1, 1677, -1, 1679, -1,
        -1, 1682, -1, 1684, -1, 1686, 1687, 1688, 1689, 1690, -1, 1692, -1, 1694, 1695, 1696, -1, 1698, -1, 1700, -1, 1702, -1, 1704, -1, 1706, -1, 1708, -1, 1710, 1711, 1712, -1, 1714, -1, 1716, -1, 1718, -1, 1720, -1, 1722, -1, 1724, -1, 1726, -1, 1728, -1, 1730, 1731, 1732, -1, 1734, 1735, -1, 1737, -1, 1739, -1,
        -1, 1742, -1, 1744, -1, 1746, -1, 1748, -1, 1750, -1, 1752, -1, 1754, -1, 1756, -1, 1758, -1, 1760, -1, 1762, -1, 1764, -1, 1766, -1, 1768, -1, 1770, -1, 1772, -1, 1774, -1, 1776, -1, 1778, -1, 1780, 1781, 1782, -1, 1784, -1, 1786, -1, 1788, -1, 1790, -1, 1792, -1, -1, 1795, -1, 1797, -1, 1799, -1,
        -1, 1802, -1, 1804, -1, 1806, -1, 1808, -1, 1810, -1, 1812, -1, 1814, -1, 1816, -1, 1818, -1, 1820, -1, 1822, -1, 1824, -1, 1826, -1, 1828, -1, 1830, -1, 1832, -1, 1834, -1, 1836, -1, 1838, -1, 1840, -1, 1842, -1, 1844, -1, 1846, -1, 1848, -1, 1850, -1, 1852, 1853, -1, 1855, -1, 1857, -1, 1859, -1,
        -1, 1862, -1, 1864, -1, 1866, -1, 1868, -1, 1870, -1, 1872, -1, 1874, -1, 1876, -1, 1878, -1, 1880, -1, 1882, -1, 1884, -1, 1886, -1, 1888, -1, 1890, -1, 1892, -1, 1894, -1, 1896, -1, 1898, 1899, 1900, -1, 1902, -1, 1904, -1, 1906, -1, 1908, -1, 1910, -1, 1912, -1, -1, 1915, -1, 1917, 1918, 1919, -1,
        -1, 1922, -1, 1924, -1, 1926, -1, 1928, -1, 1930, 1931, 1932, -1, 1934, -1, 1936, -1, 1938, -1, 1940, -1, 1942, -1, 1944, -1, 1946, -1, 1948, -1, 1950, -1, 1952, -1, 1954, -1, 1956, -1, 1958, -1, 1960, -1, 1962, -1, 1964, -1, 1966, -1, 1968, -1, 1970, -1, 1972, 1973, -1, 1975, -1, 1977, -1, 1979, -1,
        -1, 1982, -1, 1984, -1, 1986, -1, 1988, -1, 1990, -1, 1992, -1, 1994, -1, 1996, -1, 1998, -1, 2000, -1, 2002, -1, 2004, -1, 2006, -1, 2008, -1, 2010, -1, 2012, -1, 2014, -1, 2016, -1, 2018, -1, 2020, -1, 2022, -1, 2024, -1, 2026, -1, -1, -1, 2030, -1, 2032, -1, -1, 2035, -1, 2037, -1, 2039, -1,
        -1, 2042, -1, 2044, -1, 2046, -1, 2048, -1, 2050, -1, 2052, 2053, 2054, -1, 2056, -1, 2058, -1, 2060, -1, 2062, -1, 2064, -1, 2066, -1, 2068, -1, 2070, -1, 2072, -1, 2074, -1, 2076, -1, 2078, -1, 2080, -1, 2082, -1, 2084, -1, 2086, 2087, 2088, -1, 2090, -1, 2092, -1, 2094, 2095, -1, 2097, -1, 2099, -1,
        -1, 2102, -1, 2104, -1, 2106, -1, 2108, -1, 2110, -1, 2112, -1, 2114, -1, 2116, -1, 2118, -1, 2120, -1, 2122, -1, 2124, -1, 2126, -1, 2128, -1, 2130, -1, 2132, 2133, 2134, -1, 2136, -1, 2138, -1, 2140, -1, 2142, -1, 2144, -1, 2146, -1, 2148, -1, 2150, -1, 2152, -1, 2154, -1, -1, 2157, -1, 2159, -1,
        -1, 2162, -1, 2164, -1, 2166, -1, 2168, -1, 2170, -1, 2172, -1, 2174, -1, 2176, -1, 2178, -1, 2180, -1, 2182, -1, 2184, -1, 2186, -1, 2188, -1, 2190, -1, 2192, -1, 2194, -1, 2196, -1, 2198, -1, 2200, -1, 2202, -1, 2204, -1, 2206, -1, 2208, -1, 2210, -1, 2212, -1, 2214, -1, 2216, 2217, -1, 2219, -1,
        -1, 2222, -1, 2224, -1, 2226, -1, 2228, -1, 2230, -1, 2232, -1, 2234, -1, 2236, -1, 2238, -1, 2240, -1, 2242, -1, 2244, -1, 2246, -1, 2248, -1, 2250, -1, 2252, -1, 2254, -1, 2256, -1, 2258, -1, 2260, -1, 2262, -1, 2264, -1, 2266, -1, 2268, -1, 2270, -1, 2272, -1, 2274, -1, 2276, -1, -1, 2279, -1,
        -1, 2282, -1, 2284, -1, 2286, -1, 2288, -1, 2290, -1, 2292, -1, 2294, -1, 2296, -1, 2298, -1, 2300, -1, 2302, -1, 2304, -1, 2306, -1, 2308, -1, 2310, -1, 2312, -1, 2314, -1, 2316, -1, 2318, -1, 2320, -1, 2322, -1, 2324, -1, 2326, -1, 2328, -1, 2330, -1, 2332, -1, 2334, -1, 2336, 2337, 2338, 2339, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    generateMaze(scheme_array);
})
// #endregion
// #endregion
