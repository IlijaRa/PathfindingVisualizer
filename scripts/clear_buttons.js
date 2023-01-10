// #region CLEAR_BUTTONS
document.querySelector('a#buttonClearAll').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.style.backgroundColor = WHITE_COLOR;
        node.style.borderColor = BORDER_COLOR;
    })
    startNodeExists = false;
    goalNodeExists = false;
});
document.querySelector('a#buttonClearAllExceptStartGoal').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.style.borderColor = BORDER_COLOR;
        let n = document.getElementById('node' + Node.GetNodeNumber(node.id))
        if(n.style.backgroundColor != START_NODE_COLOR && n.style.backgroundColor != GOAL_NODE_COLOR){
            node.style.backgroundColor = WHITE_COLOR;
        }
    })
});
document.querySelector('a#buttonClearWalls').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        let n = document.getElementById('node' + Node.GetNodeNumber(node.id))
        if(n.style.backgroundColor == WALL_COLOR){
            node.style.backgroundColor = WHITE_COLOR;
            node.style.borderColor = BORDER_COLOR;
        }
    })
});
document.querySelector('a#buttonClearWeights').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        let n = document.getElementById('node' + Node.GetNodeNumber(node.id))
        if(n.style.backgroundColor == WEIGHTED_NODE_COLOR){
            node.style.backgroundColor = WHITE_COLOR;
            node.style.borderColor = BORDER_COLOR;
        }
    })
});
document.querySelector('a#buttonClearSearchPath').addEventListener('click', function(e){
    var nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.style.borderColor = BORDER_COLOR;
        let n = document.getElementById('node' + Node.GetNodeNumber(node.id))
        if( n.style.backgroundColor == SEARCH_NODE_COLOR || 
            n.style.backgroundColor == GOAL_SEARCH_NODE_COLOR || 
            n.style.backgroundColor == PATH_COLOR ){
            node.style.backgroundColor = WHITE_COLOR;
        }
    })
});
// #endregion