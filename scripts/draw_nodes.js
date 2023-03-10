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
    document.getElementById('node' + currentNode).classList.remove('transformed-path-node');
    document.getElementById('node' + currentNode).classList.remove('path-node');
    document.getElementById('node' + currentNode).classList.remove('weighted-path-node');
}
function drawUnvisitedNode(currentNode){
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('unvisited-node');
    document.getElementById('node' + currentNode).innerHTML = "";
}
function drawVisitedNodeA(currentNode, startNodeNumber){
    if(currentNode == startNodeNumber){
        return;
    }

    let currentElement = document.getElementById('node' + currentNode);
    deleteAnyNodeClass(currentNode);
    currentElement.innerHTML = "";

    currentElement.classList.add('visited-nodeA');

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerText = "1";

    if(LEVEL_OF_DETAILS == "show-details"){
        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        innerDiv.classList.add('hide');
    }

    currentElement.appendChild(innerDiv);
}
function drawWeightedVisitedNodeA(currentNode, startNodeNumber){
    if(currentNode != startNodeNumber){
        let currentElement = document.getElementById('node' + currentNode);
        let nodeWeight = parseInt(currentElement.children[0].innerText);
        
        deleteAnyNodeClass(currentNode);
        currentElement.innerHTML = "";

        let innerDiv = document.createElement('div');
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
}
function drawVisitedNodeB(currentNode, goalNodeNumber){
    if(currentNode == goalNodeNumber){
        return;
    }

    let currentElement = document.getElementById('node' + currentNode);
    deleteAnyNodeClass(currentNode);
    currentElement.innerHTML = "";

    currentElement.classList.add('visited-nodeB');

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerText = "1";

    if(LEVEL_OF_DETAILS == "show-details"){
        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        innerDiv.classList.add('hide');
    }

    currentElement.appendChild(innerDiv);
}
function drawWeightedNode(currentNode, weight_value){
    deleteAnyNodeClass(currentNode);
    let currentDiv = document.getElementById('node' + currentNode);
    currentDiv.innerHTML = "";

    let innerDiv = document.createElement('div');
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
    document.getElementById('node' + currentNode).innerHTML = "";
}
function drawGoalNode(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('wall-node')){
        return;
    }
    deleteAnyNodeClass(currentNode);
    document.getElementById('node' + currentNode).classList.add('goal-node');
    document.getElementById('node' + currentNode).innerHTML = "";
}
function drawWallNode(currentNode){
    let currentElement = document.getElementById('node' + currentNode);
    deleteAnyNodeClass(currentNode);
    currentElement.innerHTML = "";

    currentElement.classList.add('wall-node');

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerHTML = "&#8734";
    innerDiv.style.color = "#fff";

    if(LEVEL_OF_DETAILS == "show-details"){
        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        innerDiv.classList.add('hide');
    }

    currentElement.appendChild(innerDiv);
}
function drawPathNode(currentNode){
    // deleteAnyNodeClass(currentNode);
    // document.getElementById('node' + currentNode).classList.add('path-node');

    let currentElement = document.getElementById('node' + currentNode);
    deleteAnyNodeClass(currentNode);
    currentElement.innerHTML = "";

    currentElement.classList.add('path-node');

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerText = "1";

    if(LEVEL_OF_DETAILS == "show-details"){
        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        innerDiv.classList.add('hide');
    }

    currentElement.appendChild(innerDiv);
}
function drawWeightedPathNode(currentNode){
    let currentElement = document.getElementById('node' + currentNode);
    let nodeWeight = parseInt(currentElement.children[0].innerText);
    
    deleteAnyNodeClass(currentNode);
    currentElement.innerHTML = "";

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDiv', 'innerDiv' + currentNode, 'not-selectable');
    innerDiv.innerText = nodeWeight;

    if(LEVEL_OF_DETAILS == "show-details"){
        currentElement.classList.add('transformed-path-node', 'weighted-path-node');
        innerDiv.classList.add('show');
    }
    else if (LEVEL_OF_DETAILS == "hide-details"){
        currentElement.classList.add('transformed-path-node', 'path-node');
        innerDiv.classList.add('hide');
    }

    currentElement.appendChild(innerDiv);
}
function isNodeUnvisited(currentNode){
    if(document.getElementById('node' + currentNode).classList.contains('unvisited-node')){
        return true;
    }
    return false;
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
    if(document.getElementById('node' + currentNode).classList.contains('transformed-visited-node')){
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