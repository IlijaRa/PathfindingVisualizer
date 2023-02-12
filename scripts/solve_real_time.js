function solveAlgorithmRealTime(algorithmName){
    if(isAlgorithmFinished == 0)
        return;
    
    switch(algorithmName){
        case "A* - Astar":
            solveAstarRealTime(); break;
        case "BFS":
            solveBfsRealTime(); break;
        case "DFS":
            solveDfsRealTime(); break;
        case "Bidirectional BFS":
            solveBidirectionalBfsRealTime(); break;
        case "Bidirectional DFS":
            break;
        case "Dijkstra":
            solveDijkstraRealTime(); break;
        case "Greedy BFS":
            solveGreedyBFSRealTime(); break;
    }
}