var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    // let visited = [];
    let prev = new Array(HEIGHT * WIDTH).fill(0);
    let queue = [];
    let solved = false;
    let goalNodeNumber = undefined;
    
    // for(i = 0; i < HEIGHT; i++){
    //     visited[i] = new Array(WIDTH).fill(false);
    // }
    queue.push(startNodeNumber);

    while(queue.length > 0){
        //Defining maze and adjacentsDict again and again enables wall changement in real time
        var maze = construct2dArray();
        var adjacentsDict = findAdjacents(maze);
        var currentNode = queue.shift();
        var coordinate = getNodeCoordinates(currentNode);
        window.visited[coordinate[0]][coordinate[1]] = true;

        if((document.getElementById('node' + currentNode).style.backgroundColor == GOAL_SEARCH_NODE_COLOR) ||
           (document.getElementById('node' + currentNode).style.backgroundColor == GOAL_EDGE_NODE_COLOR)   ||
           window.intersectNodeBfs != null){
            window.intersectNodeBfs = currentNode;
            goalNodeNumber = currentNode;
            console.log('goalNodeNumber', goalNodeNumber);
            solved = true;
            break;
        }

        var adj = adjacentsDict[currentNode];
        for(count = 0; count < adj.length; count++){
            // document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
            var n = adj[count];
            if(!window.visited[n[0]][n[1]]){
                window.visited[n[0]][n[1]] = true;
                queue.push(maze[n[0]][n[1]]);
                prev[maze[n[0]][n[1]] - 1] = currentNode - 1;
                if( (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_SEARCH_NODE_COLOR) ||
                    (document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor == GOAL_EDGE_NODE_COLOR)   ||
                    window.intersectNodeBfs != null){
                        window.intersectNodeBfs = currentNode;
                        goalNodeNumber = maze[n[0]][n[1]];
                        console.log('goalNodeNumber', goalNodeNumber);
                        solved = true;
                        break;
                    }
                
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
                await sleep(5);
                document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;
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

    let loopControl = false;
    goalToStart = []; // gathers nodes from goal to start node by grabbing the previous nodes
    if(window.intersectNodeBfs != null){
        previous = window.intersectNodeBfs - 1;
        goalToStart.push(previous);
    }else{
        previous = goalNodeNumber - 1;
        goalToStart.push(previous);
    }

    while(true){
        let node = prev[previous];
        goalToStart.push(node);

        if(node == 0) loopControl = true;
        else previous = node;

        if(loopControl){
            break;
        }
    }

    for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
        await sleep(25);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node + 1));
                n.style.backgroundColor = RED_COLOR
                await sleep(1);
                n.style.backgroundColor = ORANGE_COLOR;
                await sleep(1);
                n.style.backgroundColor = PATH_COLOR;
            }
        }catch(err){
            loopControl = true;
        }
        document.getElementById('node' + startNodeNumber).style.backgroundColor = START_NODE_COLOR;
        if(window.intersectNodeBfs != null){
            document.getElementById('node' + window.intersectNodeBfs).style.backgroundColor = INTERSECT_NODE_COLOR;
        }
    }