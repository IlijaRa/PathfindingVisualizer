var node_classes = ['start-node', 'goal-node', 'wall-node', 'weighted-node', 'current-nodeA', 'visited-node', 'path-node']
function deleteAnyNodeClass(currentNode){
    document.getElementById('node' + currentNode).classList.remove('unvisited-node');
    document.getElementById('node' + currentNode).classList.remove('start-node');
    document.getElementById('node' + currentNode).classList.remove('goal-node');
    document.getElementById('node' + currentNode).classList.remove('wall-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-node');
    document.getElementById('node' + currentNode).classList.remove('current-nodeA');
    document.getElementById('node' + currentNode).classList.remove('current-nodeB');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeA');
    document.getElementById('node' + currentNode).classList.remove('visited-nodeB');
    document.getElementById('node' + currentNode).classList.remove('path-nodeB');
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
    document.getElementById('node' + currentNode).classList.add('weighted-node');
}