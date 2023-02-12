// #region GRID_CONSTRUCTION
function constructGrid(){
    
    var maze_container = document.querySelector('#maze_container');
    for(var i = 0; i < HEIGHT; i++){
        var row = document.createElement('div');
        row.classList.add('row', 'row' + (i + 1));
        row.setAttribute('id', 'row' + (i + 1));
        for(var j = 0; j < WIDTH; j++){
            var node = document.createElement('div');
            node.classList.add('node', 'node' + ((i * WIDTH) + (j + 1)), 'unvisited-node');
            node.setAttribute('id', 'node' + ((i * WIDTH) + (j + 1)));

            node.addEventListener('mouseover', function(e){
                CloseClearMenu();
                
                if(mouseDown == 1 && dim1x1 == 1 && !isNodeStart(Node.GetNodeNumber(e.target.id)) && !isNodeGoal(Node.GetNodeNumber(e.target.id))){
                    drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
                }
                if(mouseDown == 1 && e.shiftKey){
                    if( e.target.classList.contains('unvisited-node') || 
                        e.target.classList.contains('weighted-node')){
                            drawWallNode(Node.GetNodeNumber(e.target.id));
                    } 
                }
                if(mouseDown == 1 && e.altKey){ 
                    if(e.target.classList.contains('unvisited-node') ||
                       e.target.classList.contains('weighted-node')){
                            drawWeightedNode(Node.GetNodeNumber(e.target.id), WEIGHT_VALUE);
                    }
                }
            });

            node.addEventListener('click', function(e){
                if(dim1x1 == 1 && !isNodeStart(Node.GetNodeNumber(e.target.id)) && !isNodeGoal(Node.GetNodeNumber(e.target.id))){
                    drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
                }
                if(dragStart == 1 && !isNodeWall(Node.GetNodeNumber(e.target.id)) && !isNodeGoal(Node.GetNodeNumber(e.target.id))){
                    drawStartNode(Node.GetNodeNumber(e.target.id));
                    if(isAlgorithmFinished == 1)
                        solveAlgorithmRealTime(ACTIVE_ALGORITHM);
                    dragStart = 0;
                    return;
                }
                if(dragGoal == 1 && !isNodeWall(Node.GetNodeNumber(e.target.id)) && !isNodeStart(Node.GetNodeNumber(e.target.id))){
                    drawGoalNode(Node.GetNodeNumber(e.target.id));
                    if(isAlgorithmFinished == 1)
                        solveAlgorithmRealTime(ACTIVE_ALGORITHM);
                    dragGoal = 0;
                    return;
                }
                if(isNodeStart(Node.GetNodeNumber(e.target.id)) && dragStart == 0 && dragGoal == 0){
                    dragStart = 1;
                    drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
                    return;
                }
                if(isNodeGoal(Node.GetNodeNumber(e.target.id)) && dragGoal == 0 && dragStart == 0){
                    dragGoal = 1;
                    drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
                    return;
                }
                if(e.shiftKey){
                    if( e.target.classList.contains('unvisited-node') ||
                        e.target.classList.contains('weighted-node')){
                            drawWallNode(Node.GetNodeNumber(e.target.id));
                    } 
                }
                if(e.altKey){
                    if(e.target.classList.contains('unvisited-node') ||
                        e.target.classList.contains('weighted-node')){
                            drawWeightedNode(Node.GetNodeNumber(e.target.id), WEIGHT_VALUE);
                    }
                }
            });
            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
    
    generateStartAndGoalNode();
    // let nodes = generateStartAndGoalNode();
    // enableDragAndDrop(nodes[0], nodes[1]);

    return maze_container;
}
function construct2dArray(){
    var nodeCount = 0;
    let maze = [];
    /* Filling a complete 2d array with zeros */
    for(i = 0; i < HEIGHT; i++){
        maze[i] = new Array(WIDTH).fill(0);
    }
    /* Traverse through a complete container and stores values into a 2d array. WALL = -1, EVERYTHING ELSE = nodeCount */
    for(i = 0; i < HEIGHT; i++){
        for(j = 0; j < WIDTH; j++){
            nodeCount++;
            if(document.getElementById('node' + nodeCount).classList.contains('wall-node')){
                maze[i][j] = -1;
            }else{
                maze[i][j] = nodeCount;
            }
        }
    }
    return maze;
}
function construct2dArrayWithoutWalls(){
    var nodeCount = 0;
    let maze = [];
    
    /* Filling a complete 2d array with zeros */
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
            maze[i][j] = nodeCount;
        }
    }
    return maze;
}
// #endregion

