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
    document.getElementById('node' + currentNode).classList.remove('transformed-visited-node');
    document.getElementById('node' + currentNode).classList.remove('path-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-path-node');
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
        let currentElement = document.getElementById('node' + currentNode);
        let nodeWeight = parseInt(currentElement.children[0].innerText);
        
        deleteAnyNodeClass(currentNode);
        currentElement.innerHTML = "";

        var innerDiv = document.createElement('div');
        innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
        innerDiv.innerText = nodeWeight;

        if(LEVEL_OF_DETAILS == "show-details"){
            currentElement.classList.add('transformed-visited-node', 'weighted-visited-nodeA');
            innerDiv.classList.add('show');
        }
        else if (LEVEL_OF_DETAILS == "hide-details"){
            currentElement.classList.add('transformed-visited-node', 'visited-nodeA');
            innerDiv.classList.add('hide');
        }

        currentElement.appendChild(innerDiv);
    }
        // let currentElement = document.getElementById('node' + currentNode);
        // let nodeWeight = parseInt(currentElement.innerText);
        // deleteAnyNodeClass(currentNode);
        // document.getElementById('node' + currentNode).classList.add('weighted-visited-nodeA');
        // currentElement.classList.add('not-selectable');
        // currentElement.innerText = nodeWeight;
}
function drawVisitedNodeB(currentNode, goalNodeNumber){
    if(currentNode != goalNodeNumber){
        deleteAnyNodeClass(currentNode);
        document.getElementById('node' + currentNode).classList.add('visited-nodeB');
    }
}
function drawWeightedNode(currentNode, weight_value){
    deleteAnyNodeClass(currentNode);
    let currentDiv = document.getElementById('node' + currentNode);
    currentDiv.innerHTML = "";

    var innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerText = weight_value;

    if(LEVEL_OF_DETAILS == "show-details"){
        if(weight_value <= 5){
            currentDiv.classList.add('weighted-node', 'weighted-node-5');
        }else if(weight_value > 5 && weight_value <= 10){
            currentDiv.classList.add('weighted-node', 'weighted-node-10');
        }else if(weight_value > 10 && weight_value <= 15){
            currentDiv.classList.add('weighted-node', 'weighted-node-15');
        }else if(weight_value > 15 && weight_value <= 20){
            currentDiv.classList.add('weighted-node', 'weighted-node-20');
        }

        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        currentDiv.classList.add('weighted-node', 'weighted-node-5');

        innerDiv.classList.add('hide');
    }

    currentDiv.appendChild(innerDiv);
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
    let currentElement = document.getElementById('node' + currentNode);
    let nodeWeight = parseInt(currentElement.innerText);
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('weighted-path-node');
    currentElement.classList.add('not-selectable');
    currentElement.innerText = nodeWeight;
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