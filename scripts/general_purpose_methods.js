// #region GENERAL_PURPOSE_METHODS

// Mouse button listener
let mouseDown = 0;
document.onmousedown = () => {mouseDown = 1;}
document.onmouseup = () => {mouseDown = 0;}

// Provides sleepqueue
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}
// Provides random color
const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
// Returns start and goal nodes in DIV form
function findStartAndGoalNode(){
    let nodes = [];
    /* nodes[0] - start node , nodes[1] - end node*/
    nodes[0] = document.querySelector('.start-node');
    nodes[1] = document.querySelector('.goal-node');
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
// // Returns node coordinates without walls
// function getNodeCoordinatesWithoutWalls(nodeNumber){
//     let maze = construct2dArrayWithoutWalls();
//     let coordinate = []

//     //nadji elegantnije resenje za pronalazenje currentNode u 2d nizu maze!!!
//     for(i = 0; i < HEIGHT; i++){
//         for(j = 0; j < WIDTH; j++){
//             if(maze[i][j] == nodeNumber){
//                 coordinate[0] = i;
//                 coordinate[1] = j;
//                 break;
//             }
//         }
//     }
//     return coordinate;
// }
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
            await sleep(1);
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

    get GetParentNumber(){
        let parentNumber = parseInt(this.parent.replace('node', ''));
        return parentNumber; 
    }
}
// #endregion