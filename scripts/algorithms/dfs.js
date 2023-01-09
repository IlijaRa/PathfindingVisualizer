// #region DFS_ALGORITHM 
/* --------------------DFS algorithm---------------------------*/
document.querySelector('a#buttonDFS').addEventListener('click', function(e){
    var nodes = findStartAndGoalNode(); 
    if(nodes.length < 2){
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
    let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let stack = [];
    let solved = false;

    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    stack.push(startNodeNumber);
    
    console.log('prev', prev);
    while (stack.length > 0) {
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        // await sleep(1);
        var currentNode = stack.pop();

        let i_save = 0;
        let j_save = 0;

        //nadji elegantnije resenje za pronalazenje currentNode u 2d nizu maze!!!
        for(i = 0; i < HEIGHT; i++){
            for(j = 0; j < WIDTH; j++){
                if(maze[i][j] == currentNode){
                    i_save = i;
                    j_save = j;
                    break;
                }
            }
        }

        visited[i_save][j_save] = true;

        if(currentNode == goalNodeNumber){
            solved = true;
            break;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        document.getElementById('node' + currentNode).style.backgroundColor = EDGE_NODE_COLOR;
        await sleep(1);
        document.getElementById('node' + currentNode).style.backgroundColor = SEARCH_NODE_COLOR;

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!visited[n[0]][n[1]]){
                stack.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                // if(maze[n[0]][n[1]] == goalNodeNumber){
                //     solved = true;
                //     break;
                // }
            }
        }
        if(solved){
            break;
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
// #endregion