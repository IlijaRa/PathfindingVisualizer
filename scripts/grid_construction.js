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
                if(mouseDown == 1 && e.shiftKey){
                    if(startNodeExists == false){
                        e.target.classList.remove('unvisited-node');
                        e.target.classList.add('start-node');
                        startNodeExists = true;
                    }
                    else if(goalNodeExists == false && !e.target.classList.contains("start-node")){
                        e.target.classList.remove("unvisited-node");
                        e.target.classList.add("goal-node");
                        goalNodeExists = true;
                    }  
                    else if(e.target.classList.contains('unvisited-node') || 
                            e.target.classList.contains('weighted-node')){
                                deleteAnyNodeClass(Node.GetNodeNumber(e.target.id));
                                e.target.classList.add("wall-node");
                    } 
                }
                if(mouseDown == 1 && e.altKey){
                    if(startNodeExists == false){
                        e.target.classList.remove('unvisited-node');
                        e.target.classList.add('start-node');
                        startNodeExists = true;
                    }
                    else if(goalNodeExists == false && !e.target.classList.contains("start-node")){
                        e.target.classList.remove("unvisited-node");
                        e.target.classList.add("goal-node");
                        goalNodeExists = true;
                    }  
                    else if(e.target.classList.contains('unvisited-node')){
                        drawWeightedNode(Node.GetNodeNumber(e.target.id));
                    }
                }
            });

            node.addEventListener('click', function(e){
                if(e.shiftKey){
                    if(startNodeExists == false){
                        e.target.classList.remove('unvisited-node');
                        e.target.classList.add('start-node');
                        startNodeExists = true;
                    }
                    else if(goalNodeExists == false && !e.target.classList.contains("start-node")){
                        e.target.classList.remove("unvisited-node");
                        e.target.classList.add("goal-node");
                        goalNodeExists = true;
                    }  
                    else if(e.target.classList.contains('unvisited-node') ||
                            e.target.classList.contains('weighted-node')){
                                deleteAnyNodeClass(Node.GetNodeNumber(e.target.id));
                                e.target.classList.add("wall-node");
                    } 
                }
                if(e.altKey){
                    if(startNodeExists == false){
                        e.target.classList.remove('unvisited-node');
                        e.target.classList.add('start-node');
                        startNodeExists = true;
                    }
                    else if(goalNodeExists == false && !e.target.classList.contains("start-node")){
                        e.target.classList.remove("unvisited-node");
                        e.target.classList.add("goal-node");
                        goalNodeExists = true;
                    }  
                    else if(e.target.classList.contains('unvisited-node')){
                        // console.log('e.target: ', Node.GetNodeNumber(e.target.id));
                        drawWeightedNode(Node.GetNodeNumber(e.target.id));
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

