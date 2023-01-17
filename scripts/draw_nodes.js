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
    document.getElementById('node' + currentNode).classList.remove('current-nodeA');
    document.getElementById('node' + currentNode).classList.remove('current-nodeB');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeA');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeB');
    document.getElementById('node' + currentNode).classList.remove('intersect-node');
    document.getElementById('node' + currentNode).classList.remove('path-node');
}
function drawUnvisitedNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('unvisited-node');
}
function drawVisitedNodeOne(currentNode, startNodeNumber){
    if(currentNode != startNodeNumber){
        deleteAnyNodeClass(currentNode);
        document.getElementById('node' + currentNode).classList.add('visited-nodeA');
    }
}
function drawVisitedNodeTwo(currentNode, goalNodeNumber){
    if(currentNode != goalNodeNumber){
        deleteAnyNodeClass(currentNode);
        document.getElementById('node' + currentNode).classList.add('visited-nodeB');
    }
}
function drawIntersectNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('intersect-node');
}
function drawWeightedNode(currentNode){
    deleteAnyNodeClass(currentNode);
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
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('start-node');
}
function drawGoalNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('goal-node');
}
function drawWallNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('wall-node');
}
function isNodeWall(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('wall-node')){
        return true;
    }
    return false;
}