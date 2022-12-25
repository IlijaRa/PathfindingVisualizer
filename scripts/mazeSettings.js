
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

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
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
    console.log('maze', maze);
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
    var adjacentsDict = findAjacentsBfs(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let queue = [];
    let solved = false;

    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    queue.push(startNodeNumber);

    console.log('queue', queue);

    while(queue.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAjacentsBfs(maze);
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
                console.log('prev', prev);
                if(maze[n[0]][n[1]] == goalNodeNumber){
                    solved = true;
                    break;
                }
            }
        }
        console.log('queue', queue);
        
        console.log('visited:', visited);
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
                document.getElementById('node' + (node + 1)).style.backgroundColor = RED_COLOR;
                await sleep(1);
                document.getElementById('node' + (node + 1)).style.backgroundColor = ORANGE_COLOR;
                await sleep(1);
                document.getElementById('node' + (node + 1)).style.backgroundColor = PATH_COLOR;
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
function findAjacentsBfs(maze){
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
    console.log('adjacentDictionary', adjacentDictionary);

    return adjacentDictionary;
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

    let shortestPath = solveDfs(startNodeNumber, goalNodeNumber);
    // console.log('ShortestPath from solveBfs: ', shortestPath);
    // reconstructPathForBfs.apply(...shortestPath);
})

async function solveDfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAjacentsBfs(maze);
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let queue = [];
    let solved = false;

    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    queue.push(startNodeNumber);

    while (queue.length > 0) {
        //Defining maze and adjacentsDict again enables wall changement in real time
        maze = construct2dArray();
        adjacentsDict = findAjacentsBfs(maze);
        let currentNode = queue.shift();
        queue.pop();
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

        // var adj = adjacentsDict[currentNode];

        for (let i = 0; i < adjacentsDict[currentNode].length; i++) {
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adjacentsDict[i];
            if (!visited[adjacentsDict[currentNode][i]]) {
                visited[adjacentsDict[currentNode][i]] = true;
                
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(1);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;

                queue.push(adjacentsDict[currentNode][i]);
                // edges[adjacentsDict[currentNode][i]] = edges[currentNode] + 1;
                prev[adjacentsDict[currentNode][i]] = currentNode;

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
// async function reconstructPathForDfs(prev){
//     // TODO: Implement it
// }
// function findAjacentsDfs(maze){
//     var adjacentDictionary = {};
//     var possibleMoves = [
//         [-1, 0], //left
//         [1, 0],  //right
//         [0, 1],  //down
//         [0, -1]  //up
//     ];

//     for(row = 0; row < HEIGHT; row++){
//         for(col = 0; col < WIDTH; col++){
//             if(maze[row][col] == -1){
//                 continue;
//             }
//             var currentNode = maze[row][col];
//             var neighbours = [];

//             for(count = 0; count < possibleMoves.length; count++){
//                 var nRow = possibleMoves[count][0] + row;
//                 var nCol = possibleMoves[count][1] + col;

//                 if((nRow >= 0 && nRow < maze.length) && (nCol >= 0 && nCol < maze[0].length)){
//                     if(maze[nRow][nCol] != WALL_VALUE){
//                         neighbours.push([nRow, nCol]);
//                     }
//                 }
//             }
//             adjacentDictionary[currentNode] = neighbours;
//         }
//     }
//     return adjacentDictionary;
// }
/* ------------------------------------------------------------*/

/* Returns start and goal nodes in DIV form*/
function findStartAndGoalNode(){
    let maze_container = document.querySelector('#maze_container');
    let nodes = [];
    for(i = 0; i < HEIGHT; i++){
        for(j = 0; j < WIDTH; j++){
            let node = maze_container.children[i].children[j];
            if(node.style.backgroundColor == START_NODE_COLOR){
                nodes[0] = node;
                console.log('nodes[0]', nodes[0]);
            }
            if(node.style.backgroundColor == GOAL_NODE_COLOR){
                nodes[1] = node;
                console.log('nodes[1]', nodes[1]);
            }
        }
    }
    /* nodes[0] - start node , nodes[1] - end node*/
    return nodes;
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