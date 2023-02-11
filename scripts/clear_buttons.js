function ClearAll(){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
    hiddenWeightedNodes.length = 0;
    isAlgorithmFinished = 0;
}
function ClearAllExceptStartGoal(){
    var nodes = document.querySelectorAll('.node');
    for(let node of nodes){
        if(node.classList.contains('start-node') || node.classList.contains('goal-node')){
            continue;
        }
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
        node.innerHTML = "";
    }
    hiddenWeightedNodes.length = 0;
    isAlgorithmFinished = 0;
}
function ClearWalls(){
    var nodes = document.querySelectorAll('.wall-node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
}
function ClearWeights(){
    var nodes = document.querySelectorAll('.weighted-node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
        node.innerHTML = "";
    })
    hiddenWeightedNodes.length = 0;
}
function ClearSearchPath(){
    var visitedNodes = document.querySelectorAll("div.visited-nodeA, div.visited-nodeB, div.path-node");
    var weightedVisitedNodes = document.querySelectorAll("div.weighted-visited-nodeA");
    var weightedPathNodes = document.querySelectorAll("div.weighted-path-node");
    visitedNodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
        node.innerHTML = "";
    })
    weightedVisitedNodes.forEach(function(node){
        drawWeightedNode(Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText));
    })
    weightedPathNodes.forEach(function(node){
        drawWeightedNode(Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText));
    })
    hiddenWeightedNodes.forEach(function(node){
        drawWeightedNode(node[0], node[1]);
    })
    hiddenWeightedNodes.length = 0;
    isAlgorithmFinished = 0;
}

function ClearSearchPathRealTime(){
    var visitedNodes = document.querySelectorAll("div.visited-nodeA, div.visited-nodeB, div.path-node");
    var weightedVisitedNodes = document.querySelectorAll("div.weighted-visited-nodeA");
    var weightedPathNodes = document.querySelectorAll("div.weighted-path-node");
    visitedNodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
        node.innerHTML = "";
    })
    weightedVisitedNodes.forEach(function(node){
        drawWeightedNode(Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText));
    })
    weightedPathNodes.forEach(function(node){
        drawWeightedNode(Node.GetNodeNumber(node.id), parseInt(node.children[0].innerText));
    })
    isAlgorithmFinished = 0;
}