// #region CLEAR_BUTTONS
addEventListener('contextmenu', function(e){
    e.preventDefault();
    if( isNodeStart(Node.GetNodeNumber(e.target.id)) || 
        isNodeGoal(Node.GetNodeNumber(e.target.id))){
            return;
    }
    drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
});
function ClearAll(){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
}
document.querySelector('a#buttonClearAllExceptStartGoal').addEventListener('click', function(e){
    ClearAllExceptStartGoal();
});
function ClearAllExceptStartGoal(){
    var nodes = document.querySelectorAll('.node');
    for(let node of nodes){
        if(node.classList.contains('start-node') || node.classList.contains('goal-node')){
            continue;
        }
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    }
}
document.querySelector('a#buttonClearWalls').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.wall-node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
});
document.querySelector('a#buttonClearWeights').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.weighted-node');
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
});
document.querySelector('a#buttonClearSearchPath').addEventListener('click', function(e){
    ClearSearchPath();
});
function ClearSearchPath(){
    var nodes = document.querySelectorAll("div.visited-nodeA, div.visited-nodeB, div.path-node");
    nodes.forEach(function(node){
        deleteAnyNodeClass(Node.GetNodeNumber(node.id));
        node.classList.add('unvisited-node');
    })
}
// #endregion