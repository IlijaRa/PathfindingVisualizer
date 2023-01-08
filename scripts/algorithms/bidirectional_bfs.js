/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('a#buttonBD_BFS').addEventListener('click', function(e){
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
    let dictA = {};
    let dictB = {};
    // Initialize a map to store the previous element for each element in the path
    // let previous = new Map();

    for(i = 0; i < HEIGHT; i++){ visited[i] = new Array(WIDTH).fill(false); }
    for(i = 0; i < HEIGHT * WIDTH; i++){ dictA[i] = 0; dictB[i] = 0; }
    
    queueStart.push(startNodeNumber);
    queueGoal.push(goalNodeNumber);
    
     // Set up a loop to continue until one of the queues is empty
    while(queueStart.length > 0 && queueGoal.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        let currentA = queueStart.shift();

        if(document.getElementById('node' + currentA).style.backgroundColor == GOAL_SEARCH_NODE_COLOR ||
           document.getElementById('node' + currentA).style.backgroundColor == GOAL_EDGE_NODE_COLOR){
            intersectNodeNumber = currentA;
            // document.getElementById('node' + currentA).style.backgroundColor = INTERSECT_NODE_COLOR;
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
                    prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                    dictA[intersectNodeNumber] = currentA;
                    // document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = INTERSECT_NODE_COLOR;
                    solved = true;
                    break;
                }
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                dictA[maze[n[0]][n[1]]] = currentA;
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
            // document.getElementById('node' + currentB).style.backgroundColor = INTERSECT_NODE_COLOR;
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
                    prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                    dictB[intersectNodeNumber] = currentB;
                    // document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = INTERSECT_NODE_COLOR;
                    solved = true;
                    break;
                }
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                // previous.set(maze[n[0]][n[1]], currentB);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                dictB[maze[n[0]][n[1]]] = currentB;
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
    console.log('intersectNodeNumber:', intersectNodeNumber);
    console.log('prevA:', prevA);
    console.log('prevB:', prevB);
    console.log('dictA:', dictA);
    console.log('dictB:', dictB);
    
    console.log('------Iteration A------');
    let loopControlA = false;
    intersectToStart = []; // gathers nodes from intersect to start node by grabbing the previous nodes
    previous = intersectNodeNumber;
    console.log('First previous:', previous);
    // document.getElementById('node' + previous).style.backgroundColor = PATH_COLOR;
    intersectToStart.push(previous);
    console.log('First intersectToStart:', intersectToStart);
    while(true){
        console.log('previous:', previous);
        let node = dictA[previous];
        console.log('node:', node);
        intersectToStart.push(node);
        console.log('intersectToStart:', intersectToStart);

        if(node == 0) loopControlA = true;
        else previous = node;

        if(loopControlA){
            break;
        }
    }
    console.log('intersectToStart:', intersectToStart);
    for(node of intersectToStart.reverse()){ //intersectToStart.reverse() gives nodes sorted from start to node
        // await sleep(25);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node));
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

    console.log('------Iteration B------');
    let loopControlB = false;
    intersectToGoal = []; // gathers nodes from intersect to start node by grabbing the previous nodes
    pre = intersectNodeNumber;
    console.log('First pre:', pre);
    // document.getElementById('node' + pre).style.backgroundColor = PATH_COLOR;
    intersectToGoal.push(pre);
    console.log('First intersectToGoal:', intersectToGoal);
    while(true){
        console.log('pre:', pre);
        let node = dictB[pre];
        console.log('node:', node);
        intersectToGoal.push(node);
        console.log('intersectToGoal:', intersectToGoal);
        
        if(node == 0) loopControlB = true;
        else pre = node;

        if(loopControlB){
            break;
        }
    }

    console.log('intersectToGoal:', intersectToGoal);
    for(node of intersectToGoal.reverse()){ //intersectToGoal.reverse() gives nodes sorted from start to node
        // await sleep(25);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node));
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
    // document.getElementById('node' + intersectNodeNumber).style.backgroundColor = INTERSECT_NODE_COLOR;
}
/* ------------------------------------------------------------*/