/* --------------------DFS algorithm---------------------------*/
document.querySelector('a#buttonDFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes[0] == null || nodes[1] == null){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    solveDfs(startNodeNumber, goalNodeNumber);
})
async function solveDfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;

    stack.push(startNodeNumber);

    while (stack.length > 0) {
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);

        var currentNode = stack.pop();

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }

        visited[currentNode] = true;

        drawVisitedNodeOne(currentNode, startNodeNumber);
        await sleep(0);
        
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
    if(!solved){
        alert('Impossible to solve! I will reset it.');
        return;
    }
    reconstructPath(startNodeNumber, goalNodeNumber, prev);
    return;
}
/* ------------------------------------------------------------*/