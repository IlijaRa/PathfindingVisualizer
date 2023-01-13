/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('a#buttonBD_BFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
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
    let dictA = {};
    let dictB = {};

    for(i = 0; i < HEIGHT * WIDTH; i++){ dictA[i] = 0; dictB[i] = 0; }
    
    queueStart.push(startNodeNumber);
    queueGoal.push(goalNodeNumber);

     // Set up a loop to continue until one of the queues is empty
    while(queueStart.length > 0 && queueGoal.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        
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
                dictA[maze[n[0]][n[1]]] = currentA;
                solved = true;
                break;
            }

            if(!visited[maze[n[0]][n[1]]]){
                visited[maze[n[0]][n[1]]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                dictA[maze[n[0]][n[1]]] = currentA;
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
        await sleep(0);

        var adjB = adjacentsDict[currentB];
        for(count = 0; count < adjB.length; count++){
            var n = adjB[count];
            
            if(document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('visited-nodeA')){
                intersectNodeNumber = maze[n[0]][n[1]];
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                prevB[maze[n[0]][n[1]]] = currentB;
                solved = true;
                break;
            }

            if(!visited[maze[n[0]][n[1]]]){
                visited[maze[n[0]][n[1]]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                dictB[maze[n[0]][n[1]]] = currentB;
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
    reconstructPath(intersectNodeNumber, prevA);
    reconstructPath(intersectNodeNumber, prevB);
}
// function executeAlgorithm(initialNodeNumber, queue, intersectNodeNumber, visited, maze, adjacentsDict, prev, dict, intersectClass){
//     // let solved = false;
//     let current = queue.shift();

//     if(document.getElementById('node' + current).classList.contains(intersectClass)){
//         intersectNodeNumber = current;
//         return true;
//     }

//     visited[current] = true;

//     drawVisitedNodeOne(current, initialNodeNumber);

//     var adjA = adjacentsDict[current];
//     for(count = 0; count < adjA.length; count++){
//         var n = adjA[count];
//         if(document.getElementById('node' + maze[n[0]][n[1]]).classList.contains(intersectClass)){
//             intersectNodeNumber = maze[n[0]][n[1]];
//             prev[maze[n[0]][n[1]] - 1] = current - 1;
//             dict[maze[n[0]][n[1]]] = current;
//             // solved = true;
//             return true;
//         }

//         if(!visited[maze[n[0]][n[1]]]){
//             visited[maze[n[0]][n[1]]] = true;
//             queue.push(maze[n[0]][n[1]]);
//             prev[maze[n[0]][n[1]] - 1] = current - 1;
//             dict[maze[n[0]][n[1]]] = current;
//         }
//     }
//     return false;
// }
/* ------------------------------------------------------------*/