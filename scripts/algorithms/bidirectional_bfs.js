/* ---------------Bidirectional BFS algorithm------------------*/
document.querySelector('a#buttonBD_BFS').addEventListener('click', function (e) {
    var nodes = findStartAndGoalNode();
    if (nodes[0] == null || nodes[1] == null) {
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if (document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('Bidirectional BFS does not observe weighted nodes! Click "Clear Search&Path" in order to show them again.');

    ClearSearchPathRealTime();
    isAlgorithmFinished = 0;
    ACTIVE_ALGORITHM = "Bidirect. BFS";
    var weightedNodes = document.querySelectorAll('.weighted-node');
    weightedNodes.forEach(function (node) {
        hiddenWeightedNodes.push([Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText)]);
        drawUnvisitedNode(Node.GetNodeNumber(node.id));
    })
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    disablePointerActions();
    solveBidirectionalBfs(startNodeNumber, goalNodeNumber);
})

async function solveBidirectionalBfs(startNodeNumber, goalNodeNumber) {
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
    while (queueStart.length > 0 && queueGoal.length > 0) {
        await sleep(SLEEP_VALUE);

        let currentA = queueStart.shift();
        if (queueGoal.indexOf(currentA) != -1) {
            intersectNodeNumber = currentA;
            solved = true;
            break;
        }

        visited[currentA] = true;
        drawVisitedNodeA(currentA, startNodeNumber);

        var adjA = adjacentsDict[currentA];
        for (count = 0; count < adjA.length; count++) {
            var n = adjA[count];
            if (queueGoal.indexOf(maze[n[0]][n[1]]) != -1) {
                intersectNodeNumber = maze[n[0]][n[1]];
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                solved = true;
                break;
            }

            if (!visited[maze[n[0]][n[1]]]) {
                visited[maze[n[0]][n[1]]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
            }
        }

        let currentB = queueGoal.shift();
        if (queueStart.indexOf(currentB) != -1) {
            intersectNodeNumber = currentB;
            solved = true;
            break;
        }

        visited[currentB] = true;
        drawVisitedNodeB(currentB, goalNodeNumber);

        var adjB = adjacentsDict[currentB];
        for (count = 0; count < adjB.length; count++) {
            var n = adjB[count];
            if (queueStart.indexOf(maze[n[0]][n[1]]) != -1) {
                intersectNodeNumber = maze[n[0]][n[1]];
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                solved = true;
                break;
            }

            if (!visited[maze[n[0]][n[1]]]) {
                visited[maze[n[0]][n[1]]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
            }
        }

        if (solved) {
            break;
        }
    }

    if (!solved) {
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    } else if (solved) {
        const endTimer = performance.now();
        let noPathNodes = await reconstructPath(intersectNodeNumber, prevA);
        noPathNodes += await reconstructPath(intersectNodeNumber, prevB);
        noPathNodes -= 1;
        showSuccessToast('Algorithm is successfully executed.');
        showInfoToast(ACTIVE_ALGORITHM, noPathNodes, endTimer - startTimer);
        isAlgorithmFinished = 1;
    }
}

//For realtime
function solveBidirectionalBfsRealTime() {
    var nodes = findStartAndGoalNode();
    if (nodes[0] == null || nodes[1] == null) {
        showWarningToast('You need to provide start and goal nodes!');
        return;
    }
    if (document.querySelectorAll('.weighted-node').length != 0)
        showWarningToast('Bidirectional BFS does not observe weighted nodes! Click "Clear Search&Path" in order to show them again.');

    ClearSearchPathRealTime();
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);

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
    while (queueStart.length > 0 && queueGoal.length > 0) {
        let currentA = queueStart.shift();

        if (document.getElementById('node' + currentA).classList.contains('visited-nodeB')) {
            intersectNodeNumber = currentA;
            solved = true;
            break;
        }

        visited[currentA] = true;
        drawVisitedNodeA(currentA, startNodeNumber);

        var adjA = adjacentsDict[currentA];
        for (count = 0; count < adjA.length; count++) {
            var n = adjA[count];
            if (document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('visited-nodeB')) {
                intersectNodeNumber = maze[n[0]][n[1]];
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
                solved = true;
                break;
            }

            if (!visited[maze[n[0]][n[1]]]) {
                visited[maze[n[0]][n[1]]] = true;
                queueStart.push(maze[n[0]][n[1]]);
                prevA[maze[n[0]][n[1]] - 1] = currentA - 1;
            }
        }

        let currentB = queueGoal.shift();

        if (document.getElementById('node' + currentB).classList.contains('visited-nodeA')) {
            intersectNodeNumber = currentB;
            solved = true;
            break;
        }

        visited[currentB] = true;
        drawVisitedNodeB(currentB, goalNodeNumber);

        var adjB = adjacentsDict[currentB];
        for (count = 0; count < adjB.length; count++) {
            var n = adjB[count];

            if (document.getElementById('node' + maze[n[0]][n[1]]).classList.contains('visited-nodeA')) {
                intersectNodeNumber = maze[n[0]][n[1]];
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
                solved = true;
                break;
            }

            if (!visited[maze[n[0]][n[1]]]) {
                visited[maze[n[0]][n[1]]] = true;
                queueGoal.push(maze[n[0]][n[1]]);
                prevB[maze[n[0]][n[1]] - 1] = currentB - 1;
            }
        }

        if (solved) {
            break;
        }
    }

    if (!solved) {
        showErrorToast('Impossible to solve!');
        enablePointerActions();
    } else if (solved) {
        reconstructPathRealTime(intersectNodeNumber, prevA);
        reconstructPathRealTime(intersectNodeNumber, prevB);
    }
}