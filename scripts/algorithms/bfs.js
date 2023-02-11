/* --------------------BFS algorithm---------------------------*/
document.querySelector('a#buttonBFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if(document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('BFS does not observe weighted nodes!');

    ClearSearchPath();
    ClearAlgorithmFlagVariables();
    var weightedNodes = document.querySelectorAll('.weighted-node');
    weightedNodes.forEach(function(node){
        hiddenWeightedNodes.push([Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText)]);
        drawUnvisitedNode(Node.GetNodeNumber(node.id));
    })
    activatedBfs = 1;
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveBfs(startNodeNumber, goalNodeNumber);
})
async function solveBfs(startNodeNumber, goalNodeNumber){
    const startTimer = performance.now();
    var maze = construct2dArray();
    console.log('maze: ', maze);
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(-1);
    let queue = [];
    let solved = false;
    queue.push(startNodeNumber);

    while(queue.length > 0){
        var currentNode = queue.shift();
        
        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }
        visited[currentNode] = true;

        drawVisitedNodeA(currentNode, startNodeNumber);

        await sleep(SLEEP_VALUE);

        // find adjacents of the current node
        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            var n = adj[count];
            if(!visited[maze[n[0]][n[1]]]){
                visited[maze[n[0]][n[1]]] = true;
                queue.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
            }
        }
    }
    
    if(!solved){
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    }else if(solved){
        const endTimer = performance.now();
        console.log('prev:', prev);
        let noPathNodes = await reconstructPath(goalNodeNumber, prev);
        showSuccessToast('Algorithm is successfully executed.');
        showInfoToast('BFS', noPathNodes, endTimer - startTimer);
        isAlgorithmFinished = 1;
    }
}

// For realtime 
async function solveBfsRealTime(){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if(document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('Bidirectional DFS does not observe weighted nodes!');
    
    ClearSearchPathRealTime();
    // var weightedNodes = document.querySelectorAll('.weighted-node');
    // weightedNodes.forEach(function(node){
    //     hiddenWeightedNodes.push([Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText)]);
    //     drawUnvisitedNode(Node.GetNodeNumber(node.id));
    // })
    isAlgorithmFinished = 1;
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(-1);
    let queue = [];
    let solved = false;
    queue.push(startNodeNumber);

    while(queue.length > 0){
        var currentNode = queue.shift();
        
        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }
        visited[currentNode] = true;

        drawVisitedNodeA(currentNode, startNodeNumber);

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            var n = adj[count];
            if(!visited[maze[n[0]][n[1]]]){
                visited[maze[n[0]][n[1]]] = true;
                queue.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
            }
        }
    }
    
    if(!solved){
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    }else if(solved){
        reconstructPathRealTime(goalNodeNumber, prev);
    }
}