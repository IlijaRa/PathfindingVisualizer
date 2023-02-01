function deleteAnyNodeClass(currentNode){
    document.getElementById('node' + currentNode).classList.remove('unvisited-node');
    document.getElementById('node' + currentNode).classList.remove('start-node');
    document.getElementById('node' + currentNode).classList.remove('goal-node');
    document.getElementById('node' + currentNode).classList.remove('wall-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-node-5');
    document.getElementById('node' + currentNode).classList.remove('weighted-node-10');
    document.getElementById('node' + currentNode).classList.remove('weighted-node-15');
    document.getElementById('node' + currentNode).classList.remove('weighted-node-20');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeA');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeB');
    document.getElementById('node' + currentNode).classList.remove('weighted-visited-nodeA');
    document.getElementById('node' + currentNode).classList.remove('path-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-path-node');
    document.getElementById('node' + currentNode).innerText = "";
}
function drawUnvisitedNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('unvisited-node');
}
function drawVisitedNodeA(currentNode, startNodeNumber){
    if(currentNode != startNodeNumber){
        deleteAnyNodeClass(currentNode);
        document.getElementById('node' + currentNode).classList.add('visited-nodeA');
    }
}
function drawWeightedVisitedNodeA(currentNode, startNodeNumber){
    if(currentNode != startNodeNumber){
        deleteAnyNodeClass(currentNode);
        let currentDiv = document.getElementById('node' + currentNode);
        currentDiv.classList.add('not-selectable');
        currentDiv.innerText = WEIGHT_VALUE;
        document.getElementById('node' + currentNode).classList.add('weighted-visited-nodeA');
    }
}
function drawVisitedNodeB(currentNode, goalNodeNumber){
    if(currentNode != goalNodeNumber){
        deleteAnyNodeClass(currentNode);
        document.getElementById('node' + currentNode).classList.add('visited-nodeB');
    }
}
function drawWeightedNode(currentNode){
    deleteAnyNodeClass(currentNode);
    let currentDiv = document.getElementById('node' + currentNode);
    currentDiv.classList.add('not-selectable');
    currentDiv.innerText = WEIGHT_VALUE;
    if(WEIGHT_VALUE <= 5){
        document.getElementById('node' + currentNode).classList.add('weighted-node', 'weighted-node-5');
    }else if(WEIGHT_VALUE > 5 && WEIGHT_VALUE <= 10){
        document.getElementById('node' + currentNode).classList.add('weighted-node', 'weighted-node-10');
    }else if(WEIGHT_VALUE > 10 && WEIGHT_VALUE <= 15){
        document.getElementById('node' + currentNode).classList.add('weighted-node', 'weighted-node-15');
    }else if(WEIGHT_VALUE > 15 && WEIGHT_VALUE <= 20){
        document.getElementById('node' + currentNode).classList.add('weighted-node', 'weighted-node-20');
    }
}
function drawStartNode(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('wall-node')){
        return;
    }
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('start-node');
}
function drawGoalNode(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('wall-node')){
        return;
    }
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('goal-node');
}
function drawWallNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('wall-node');
}
function drawPathNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('path-node');
}
function drawWeightedPathNode(currentNode){
    deleteAnyNodeClass(currentNode);
    let currentDiv = document.getElementById('node' + currentNode);
    currentDiv.classList.add('not-selectable');
    currentDiv.innerText = WEIGHT_VALUE;
    document.getElementById('node' + currentNode).classList.add('weighted-path-node');
}
function isNodeStart(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('start-node')){
        return true;
    }
    return false;
}
function isNodeGoal(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('goal-node')){
        return true;
    }
    return false;
}
function isNodeWall(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('wall-node')){
        return true;
    }
    return false;
}
function isNodeWeighted(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('weighted-node')){
        return true;
    }
    return false;
}
function isNodeWeightedVisited(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('weighted-visited-nodeA')){
        return true;
    }
    return false;
}
function isNodeFirst(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('node1')){
        return true;
    }
    return false;
}