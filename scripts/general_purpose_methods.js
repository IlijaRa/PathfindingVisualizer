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
// Generates and sets position for start and end nodes
function generateStartAndGoalNode(){ 
    nodes = []; 
    let startNode = document.getElementById('node' + Math.floor(Math.random() * (HEIGHT * WIDTH) + 1));
    let goalNode = document.getElementById('node' + Math.floor(Math.random() * (HEIGHT * WIDTH) + 1));
    startNode.style.backgroundColor = START_NODE_COLOR;
    goalNode.style.backgroundColor = GOAL_NODE_COLOR;
    startNodeExists = true;
    goalNodeExists = true;
    nodes[0] = startNode;
    nodes[1] = goalNode;
    return nodes;
}
//Enables drap&drop for start and end node
function enableDragAndDrop(startNode, goalNode){
    startNode.draggable = true;
    goalNode.draggable = true;

    document.querySelectorAll('.node').forEach(function(node){
        if(node.style.backgroundColor == START_NODE_COLOR || node.style.backgroundColor == GOAL_NODE_COLOR){
            node.addEventListener('dragstart', function(e){
                let bgColor = e.target.style.backgroundColor;
                if(bgColor == START_NODE_COLOR){
                    e.dataTransfer.setData('text/plain', "startNode");
                    e.target.style.backgroundColor = WHITE_COLOR;
                }else{
                    e.dataTransfer.setData('text/plain', "goalNode");
                    e.target.style.backgroundColor = WHITE_COLOR;
                }
                node.removeAttribute("draggable");
            });
        }
        node.addEventListener('dragenter', function(e){ e.preventDefault(); e.target.classList.add('drag-over'); });
        node.addEventListener('dragover', function(e){ e.preventDefault(); e.target.classList.add('drag-over'); });
        node.addEventListener('dragleave', function(e){ e.target.classList.remove('drag-over'); });
        node.addEventListener('drop', function(e){ 
            e.target.classList.remove('drag-over'); 
            // get the draggable element
            const nodeStatus = e.dataTransfer.getData('text/plain');
            if(nodeStatus == "startNode"){
                e.target.style.backgroundColor = START_NODE_COLOR;
                startNode = document.getElementById(e.target.id);
            }else{
                e.target.style.backgroundColor = GOAL_NODE_COLOR;
                goalNode = document.getElementById(e.target.id);
            }
            // e.target.draggable = true;
            //const draggable = document.getElementById(id);
            
            
            // add it to the drop target
            // e.target.appendChild(draggable);
        });
    });
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