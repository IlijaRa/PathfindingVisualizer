/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('a#buttonBD_DFS').addEventListener('click', function(e){
    ClearSearchPath();
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        showWarningAlert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveBidirectionalDfs(startNodeNumber, goalNodeNumber);
})
async function solveBidirectionalDfs(startNodeNumber, goalNodeNumber){
    const startTimer = performance.now();
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var intersectNodeNumber = null;
    // Initialize the two queues for the bidirectional search
    let queueStart = [];
    let queueGoal = [];
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let solved = false;
    let prevA = new Array(HEIGHT * WIDTH).fill(-1);
    let prevB = new Array(HEIGHT * WIDTH).fill(-1);
    
    queueStart.push(startNodeNumber);
    queueGoal.push(goalNodeNumber);

    // Set up a loop to continue until one of the queues is empty
    while(queueStart.length > 0 && queueGoal.length > 0){
        await sleep(SLEEP_VALUE);

        let currentA = queueStart.pop();

        if(document.getElementById('node' + currentA).classList.contains('visited-nodeB')){
            intersectNodeNumber = currentA;
            solved = true;
            break;
        }

        visited[currentA] = true;
        drawVisitedNodeA(currentA, startNodeNumber);

        var adjA = adjacentsDict[currentA];
        for(count = 0; count < adjA.length; count++){
            var n = adjA[count];
            if(document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('visited-nodeB')){
                intersectNodeNumber = maze[n[0]][n[1]];
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                solved = true;
                break;
            }
            if(!visited[maze[n[0]][n[1]]]){
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
            }
            
        }

        let currentB = queueGoal.pop();

        if(document.getElementById('node' + currentB).classList.contains('visited-nodeA')){
            intersectNodeNumber = currentB;
            solved = true;
            break;
        }

        visited[currentB] = true;
        drawVisitedNodeB(currentB, goalNodeNumber);

        // if(isNodeWeighted(currentB))
        //     drawWeightedVisitedNodeA(currentB, goalNodeNumber);
        // else
        //     drawVisitedNodeA(currentB, goalNodeNumber);

        var adjB = adjacentsDict[currentB];
        for(count = 0; count < adjB.length; count++){
            var n = adjB[count];
            if(document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('visited-nodeA')){
                intersectNodeNumber = maze[n[0]][n[1]];
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                solved = true;
                break;
            }
            if(!visited[maze[n[0]][n[1]]]){
                queueGoal.push(maze[n[0]][n[1]]);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
            }
        }

        if(solved){
            break;
        }
    }

    if(!solved){
        showErrorAlert('Impossible to solve!');
        enablePointerActions();
    }else if(solved){
        const endTimer = performance.now();
        let noPathNodes = await reconstructPath(intersectNodeNumber, prevA);
        noPathNodes += await reconstructPath(intersectNodeNumber, prevB);
        // intersectNodeNumber is stored in both prevA and prevB, because of that noPathNodes increments two times instead of once
        noPathNodes -= 1; 
        showStatisticsAlert(noPathNodes, endTimer - startTimer);
    }
}