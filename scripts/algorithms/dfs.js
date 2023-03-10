/* --------------------DFS algorithm---------------------------*/
document.querySelector('a#buttonDFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if(document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('DFS does not observe weighted nodes! Click "Clear Search&Path" in order to show them again.');
    
    ClearSearchPathRealTime();
    isAlgorithmFinished = 0;
    ACTIVE_ALGORITHM = "DFS";
    var weightedNodes = document.querySelectorAll('.weighted-node');
    weightedNodes.forEach(function(node){
        hiddenWeightedNodes.push([Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText)]);
        drawUnvisitedNode(Node.GetNodeNumber(node.id));
    })
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    showStopVisualization();
    solveDfs(startNodeNumber, goalNodeNumber);
})
async function solveDfs(startNodeNumber, goalNodeNumber){
    const startTimer = performance.now();
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(-1);
    let stack = [];
    let solved = false;
    stack.push(startNodeNumber);

    while (stack.length > 0) {
        if(stopSearchingProcess){
            hideStopVisualization();
            enablePointerActions();
            ClearSearchPath();
            break;
        }

        var currentNode = stack.pop();
        
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
                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
            }
        }
    }
    
    if(!solved && !stopSearchingProcess){
        showErrorToast('Impossible to solve!');
        hideStopVisualization();
        enablePointerActions();
    }else if(solved){
        const endTimer = performance.now();
        let noPathNodes = await reconstructPath(goalNodeNumber, prev);
        showSuccessToast('Algorithm is successfully executed.');
        showInfoToast(ACTIVE_ALGORITHM, noPathNodes, endTimer - startTimer);
        isAlgorithmFinished = 1;
        hideStopVisualization();
    }
    stopSearchingProcess = false;
}

//For realtime
function solveDfsRealTime(){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if(document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('DFS does not observe weighted nodes! Click "Clear Search&Path" in order to show them again.');
    
    ClearSearchPathRealTime();
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(-1);
    let stack = [];
    let solved = false;
    stack.push(startNodeNumber);

    while (stack.length > 0) {
        var currentNode = stack.pop();
        
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
                stack.push(maze[n[0]][n[1]]);
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