/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('a#buttonBD_BFS').addEventListener('click', function(e){
    ClearAllExceptStartGoal();
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveBidirectionalBfs(startNodeNumber, goalNodeNumber);
})
async function solveBidirectionalBfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    var intersectNodeNumber = null;
    // Initialize the two queues for the bidirectional search
    let queueStart = [];
    let queueGoal = [];
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let solved = false;
    let prevA = new Array(HEIGHT * WIDTH).fill(0);
    let prevB = new Array(HEIGHT * WIDTH).fill(0);
    
    queueStart.push(startNodeNumber);
    queueGoal.push(goalNodeNumber);
     // Set up a loop to continue until one of the queues is empty
    while(queueStart.length > 0 && queueGoal.length > 0){
        await sleep(SLEEP_VALUE);

        let currentA = queueStart.shift();

        if(document.getElementById('node' + currentA).classList.contains('visited-nodeB')){
            intersectNodeNumber = currentA;
            solved = true;
            break;
        }

        visited[currentA] = true;
        drawVisitedNodeOne(currentA, startNodeNumber);

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
                visited[maze[n[0]][n[1]]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
            }
        }

        let currentB = queueGoal.shift();

        if(document.getElementById('node' + currentB).classList.contains('visited-nodeA')){
            intersectNodeNumber = currentB;
            solved = true;
            break;
        }

        visited[currentB] = true;
        drawVisitedNodeTwo(currentB, goalNodeNumber);

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
                visited[maze[n[0]][n[1]]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
            }
        }

        if(solved){
            break;
        }
    }

    if(!solved || intersectNodeNumber == null){
        alert('Impossible to solve! I will reset it.');
        return;
    }
    reconstructPath(startNodeNumber, intersectNodeNumber, prevA);
    reconstructPath(goalNodeNumber, intersectNodeNumber, prevB);
}