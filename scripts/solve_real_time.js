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
        case "Bidirect. BFS":
            solveBidirectionalBfsRealTime(); break;
        case "Bidirect. DFS":
            break;
        case "Dijkstra":
            solveDijkstraRealTime(); break;
        case "Greedy BFS":
            solveGreedyBFSRealTime(); break;
    }
}