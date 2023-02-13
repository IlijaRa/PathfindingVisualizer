// Mouse button listener
document.onmousedown = () => {mouseDown = 1;}
document.onmouseup = () => {mouseDown = 0;}

function disablePointerActions(){
    document.querySelector('#content_container').classList.remove('enable-div');
    document.querySelector('#content_container').classList.add('disabled-div');
}
function enablePointerActions(){
    document.querySelector('#content_container').classList.remove('disabled-div');
    document.querySelector('#content_container').classList.add('enable-div');
}
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
// Proclaims random nodes for start and goal
function generateStartAndGoalNode(){
    let randomStartNumber = null;
    let randomGoalNumber = null;
    do{
        randomStartNumber = Math.floor(Math.random() * ((HEIGHT * WIDTH)/3) + 1);
        randomGoalNumber = randomStartNumber + 1//Math.floor(Math.random() * ((HEIGHT * WIDTH)/3)) + 1;
    }
    while(isNodeWall(randomStartNumber) || isNodeWall(randomGoalNumber));

    drawStartNode(randomStartNumber);
    drawGoalNode(randomGoalNumber);
    dragStart = 0;
    dragGoal = 0;
}
// Returns node coordinates 
function getNodeCoordinates(nodeNumber){
    let maze = construct2dArray();
    let coordinate = [];

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
// Returns node number from coordinates 
function getNodeNumberFromCoordinates(coordA, coordB){
    let maze = construct2dArray();
    let foundNumber = maze[coordA][coordB];
    return foundNumber;
}
// Returns node coordinates without walls
function getNodeCoordinatesWithoutWalls(nodeNumber){
    let maze = construct2dArrayWithoutWalls();
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
// Generate maze with forwarded array as a parameter
async function generateMaze(maze, scheme_2dArray){
    for(let i = 0; i < HEIGHT; i++){
        for(let j = 0; j < WIDTH; j++){
            if(scheme_2dArray[i][j] == WALL_VALUE){
                drawWallNode(maze[i][j]);
            }else{
                drawUnvisitedNode(maze[i][j]);
            }
        }
    }
}
// Heuristic for calculating the distance from current node to goal node
function heuristicFunction(a, b) {
    if(CHOSEN_HEURISTIC == "euclidean"){
        return a.map((x, i) => Math.abs( x - b[i] ) ** 2).reduce((sum, now) => sum + now) ** (1/2);
    }
    else if(CHOSEN_HEURISTIC == "manhattan"){
        return Math.abs(a[0] - a[1]) + Math.abs(b[0] - b[1]);
    }
    else if(CHOSEN_HEURISTIC == "minkowski5"){
        return a.map((x, i) => Math.abs( x - b[i] ) ** 5).reduce((sum, now) => sum + now) ** (1/5)
    }
    else if(CHOSEN_HEURISTIC == "cosine"){
        var dotproduct=0;
        var mA=0;
        var mB=0;
        for(i = 0; i < a.length; i++){ // here you missed the i++
            dotproduct += (a[i] * b[i]);
            mA += (a[i]*a[i]);
            mB += (b[i]*b[i]);
        }
        mA = Math.sqrt(mA);
        mB = Math.sqrt(mB);
        var similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
        return similarity;
    }
    else if(CHOSEN_HEURISTIC == "hamming"){
        let d = 0;
        let aNumber = getNodeNumberFromCoordinates(a[0], a[1]);
        let bNumber = getNodeNumberFromCoordinates(b[0], b[1]);
        let h = aNumber ^ bNumber;
        while (h > 0) {
            d ++;
            h &= h - 1;
        }
        return d;
    }
    else if(CHOSEN_HEURISTIC == "chebyshev"){
        if (a.length === 0 || a.length !== b.length) {
            return NaN;
        }
        let max = Math.abs(a[0] - b[0]);
        for (let i = 1; i < a.length; ++i) {
            const distance = Math.abs(a[i] - b[i]);
            if (distance > max) {
                    max = distance;
            }
        }
        return max;
    }
    else if(CHOSEN_HEURISTIC == "haversine"){
        var lon1 = a[0];
        var lat1 = a[1];
      
        var lon2 = b[0];
        var lat2 = b[1];
      
        var R = 6371; // km
      
        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
      
        return d;
    }
}
// Calculates degrees to radians
function toRad(x) {
    return x * Math.PI / 180;
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