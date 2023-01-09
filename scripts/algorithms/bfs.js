/* --------------------BFS algorithm---------------------------*/
document.querySelector('a#buttonBFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
        alert('You need to provide start and goal nodes!');
        return;
    }
    let startNodeNumber = Node.GetNodeNumber(nodes[0].id);
    let goalNodeNumber = Node.GetNodeNumber(nodes[1].id);
    solveBfs(startNodeNumber, goalNodeNumber);
})
async function solveBfs(startNodeNumber, goalNodeNumber){
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let visited = new Array(HEIGHT * WIDTH).fill(false);
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let queue = [];
    let solved = false;
    
    queue.push(startNodeNumber);

    while(queue.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        
        var currentNode = queue.shift();

        visited[currentNode] = true;

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }
        // change color of visited node
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + currentNode).style.backgroundColor = EDGE_NODE_COLOR;
        await sleep(1);
        document.getElementById('node' + currentNode).style.backgroundColor = SEARCH_NODE_COLOR;
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
        alert('Impossible to solve! I will reset it.');
        return;
    }
    reconstructPath(startNodeNumber, goalNodeNumber, prev);
    return;
}
/* ------------------------------------------------------------*/