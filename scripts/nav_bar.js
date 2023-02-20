function myFunction() {
    var x = document.getElementById("centered_nav");
    if (x.className === "rc_nav") {
        x.className += " responsive";
    } else {
        x.className = "rc_nav";
    }
}
// Setting the number of nodes in canvas
document.getElementById("canvas-size-input").addEventListener('change', function(e){
    if(parseInt(e.target.value) < 5 || parseInt(e.target.value) > 60){
        showWarningToast('Canvas size width need to be between 5 and 60!');
        return;
    }
    var el = document.getElementById('maze_container');
    el.innerHTML = "";
    isAlgorithmFinished = 0;
    // while (el.firstChild) el.removeChild(el.firstChild);
    WIDTH = e.target.value;
    HEIGHT = Math.round(WIDTH / 1.67);
    startNodeExists = false;
    goalNodeExists = false;
    constructGrid();
})
// Setting the speed of nodes in canvas
document.getElementById("speed-slider").addEventListener('input', function(e){
    INITIAL_SPEED_VALUE = e.target.value;
    SLEEP_VALUE = 500 - e.target.value;
})
// Setting the weight of weighted nodes in canvas
document.getElementById("weight-input").addEventListener('change', function(e){
    if(parseInt(e.target.value) < 2 || parseInt(e.target.value) > 20){
        showWarningToast('Weight value need to be between 2 and 20!');
        e.target.value = 2;
        return;
    }
    WEIGHT_VALUE = parseInt(e.target.value);
})
// Setting the heuristic calculation
document.getElementById("select-heuristic").addEventListener('change', function(e){
    CHOSEN_HEURISTIC = e.target.value;
})
// Setting level details for canvas
document.getElementById("select-level-detail").addEventListener('change', function(e){
    LEVEL_OF_DETAILS = e.target.value;
    if(LEVEL_OF_DETAILS == "hide-details"){
        let wallNodes = document.querySelectorAll('.wall-node');
        wallNodes.forEach(function(node){          
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let visitedNodesA = document.querySelectorAll('.visited-nodeA');
        visitedNodesA.forEach(function(node){          
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let visitedNodesB = document.querySelectorAll('.visited-nodeB');
        visitedNodesB.forEach(function(node){          
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let pathNodes = document.querySelectorAll('.path-node');
        pathNodes.forEach(function(node){          
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let weightNodes = document.querySelectorAll('.weighted-node');
        weightNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));
            
            node.classList.add('weighted-node', 'weighted-node-5')
            
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let weightedVisitedNodes = document.querySelectorAll('.weighted-visited-nodeA');
        weightedVisitedNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));
            
            node.classList.add('transformed-visited-node', 'visited-nodeA');
            
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });

        let weightedPathdNodes = document.querySelectorAll('.weighted-path-node');
        weightedPathdNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));
            
            node.classList.add('transformed-path-node', 'path-node');
            
            node.children[0].classList.remove('show');
            node.children[0].classList.add('hide');
        });
    }
    if(LEVEL_OF_DETAILS == "show-details"){
        let wallNodes = document.querySelectorAll('.wall-node');
        wallNodes.forEach(function(node){          
            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let visitedNodesA = document.querySelectorAll('.visited-nodeA');
        visitedNodesA.forEach(function(node){          
            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let visitedNodesB = document.querySelectorAll('.visited-nodeB');
        visitedNodesB.forEach(function(node){          
            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let pathNodes = document.querySelectorAll('.path-node');
        pathNodes.forEach(function(node){          
            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let weightNodes = document.querySelectorAll('.weighted-node');
        weightNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));

            let w = parseInt(node.children[0].innerText);

            if(w <= 5){
                node.classList.add('weighted-node', 'weighted-node-5');
            }else if(w > 5 && w <= 10){
                node.classList.add('weighted-node', 'weighted-node-10');
            }else if(w > 10 && w <= 15){
                node.classList.add('weighted-node', 'weighted-node-15');
            }else if(w > 15 && w <= 20){
                node.classList.add('weighted-node', 'weighted-node-20');
            }

            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let weightedVisitedNodes = document.querySelectorAll('.transformed-visited-node');
        weightedVisitedNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));

            node.classList.add('transformed-visited-node', 'weighted-visited-nodeA');

            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });

        let weightedPathNodes = document.querySelectorAll('.transformed-path-node');
        weightedPathNodes.forEach(function(node){
            deleteAnyNodeClass(Node.GetNodeNumber(node.id));

            node.classList.add('transformed-path-node', 'weighted-path-node');

            node.children[0].classList.remove('hide');
            node.children[0].classList.add('show');
        });
    }
})

document.getElementById("a-stop-visualization").addEventListener('click', function(e){
    stopSearchingProcess = true;
})

function showStopVisualization(){
    var stopVisualizationButton = document.getElementById("a-stop-visualization");

    stopVisualizationButton.classList.remove('disabled-div');
    stopVisualizationButton.classList.remove('hide');
    stopVisualizationButton.classList.add('enabled-div', 'show', 'stop-visualization');
}

function hideStopVisualization(){
    var stopVisualizationButton = document.getElementById("a-stop-visualization");

    stopVisualizationButton.classList.remove('enabled-div');
    stopVisualizationButton.classList.remove('show');
    stopVisualizationButton.classList.remove('stop-visualization');
    stopVisualizationButton.classList.add('hide');
}