async function solveDijkstra(startNode) {
    var maze = construct2dArray();
    var adjacentsDict = findAdjacents(maze);
    let distances = {};
    // Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(HEIGHT * WIDTH);
    let visited = [];
    for(i = 0; i < HEIGHT; i++){
        visited[i] = new Array(WIDTH).fill(false);
    }
    // Set distances to all nodes to be infinite except startNode

    for(let i = 0; i < HEIGHT * WIDTH; i++){
        distances[i] = Infinity;
        prev[i] = null;
    }

    distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    var coordinates = getNodeCoordinates(startNode);
    visited[coordinates[0]][coordinates[1]] = true;

    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.nodeNumber; //startNodeNumber
       let weight = minNode.priority; // 0

       var adj = adjacentsDict[currNode];
       for(count = 0; count < adj.length; count++){
        //    document.getElementById('node' + goalNodeNumber).style.backgroundColor = GOAL_NODE_COLOR; // prevents goal node disappear glitch
           var n = adj[count];
            if(!visited[maze[n[0]][n[1]]]){
               visited[maze[n[0]][n[1]]] = true;

               document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = EDGE_NODE_COLOR;
               await sleep(1);
               document.getElementById('node' + maze[n[0]][n[1]]).style.backgroundColor = SEARCH_NODE_COLOR;

               let alt = distances[currNode] + (Math.floor(Math.random() * 5) + 1); //(Math.floor(Math.random() * 5) + 1); //Math.floor(Math.random() * 5) + 1 generates random weight for the node between 1 and 5
               
               if(alt < distances[maze[n[0]][n[1]]]){
                distances[maze[n[0]][n[1]]] = alt; //Math.abs(maze[n[0]][n[1]] - maze[coordinates[0]][coordinates[1]]);
                prev[maze[n[0]][n[1]] - 1] = currNode - 1;
                pq.enqueue(maze[n[0]][n[1]], distances[maze[n[0]][n[1]]]);
               }
           }
       }
    }
    return distances;
 }