function ClearAll(){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
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
}
function ClearSearchPath(){
    var nodes = document.querySelectorAll("div.visited-nodeA, div.visited-nodeB, div.path-node, div.weighted-visited-nodeA, div.weighted-path-node");
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
        node.innerHTML = "";
    })
    isAlgorithmFinished = 0;
}