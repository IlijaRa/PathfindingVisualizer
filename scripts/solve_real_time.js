function solveAlgorithmRealTime(algorithmName){
    if(isAlgorithmFinished == 0)
        return;
    
    switch(algorithmName){
        case "A* - Astar":
            break;
        case "BFS":
            solveBfsRealTime();
            break;
        case "DFS":
            solveDfsRealTime();
            break;
        case "Bidirectional BFS":
            break;
        case "Bidirectional DFS":
            break;
        case "Dijkstra":
            break;
        case "Greedy BFS":
            break;
    }
}