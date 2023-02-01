function myFunction() {
    var x = document.getElementById("centered_nav");
    if (x.className === "rc_nav") {
        x.className += " responsive";
    } else {
        x.className = "rc_nav";
    }
}
// Setting the number of nodes in canvas
document.getElementById("node-slider").addEventListener('input', function(e){
    var el = document.getElementById('maze_container');
    while (el.firstChild) el.removeChild(el.firstChild);
    WIDTH = e.target.value;
    HEIGHT = Math.round(WIDTH / 1.67);
    startNodeExists = false;
    goalNodeExists = false;
    constructGrid();
})
// Setting the speed of nodes in canvas
document.getElementById("speed-slider").addEventListener('input', function(e){
    SLEEP_VALUE = 500 - e.target.value;
})
// Setting the weight of weighted nodes in canvas
document.getElementById("weight-input").addEventListener('change', function(e){
    if(parseInt(e.target.value) < 2 || parseInt(e.target.value) > 20){
        showWarningAlert('Weight value need to be between 2 and 20!');
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
    LEVEL_DETAILS = e.target.value;
    if(LEVEL_DETAILS == "hide-details"){
        let weightNodes = document.querySelectorAll('.weighted-node');
        weightNodes.forEach(function(node){
            node.classList.remove('weighted-node-5');
            node.classList.remove('weighted-node-10');
            node.classList.remove('weighted-node-15');
            node.classList.remove('weighted-node-20');
            node.innerHTML = "";
            // node.style.visibility = 'hidden';

            node.classList.add('weighted-node-5');
        })

        let weightedVisitedNodes = document.querySelectorAll('.weighted-visited-nodeA');
        weightedVisitedNodes.forEach(function(node){
            node.classList.remove('weighted-visited-nodeA');
            node.classList.add('visited-nodeA');
            node.innerHTML = "";
        })

        let weightedPathNodes = document.querySelectorAll('.weighted-path-node');
        weightedPathNodes.forEach(function(node){
            node.classList.remove('weighted-path-node');
            node.classList.add('path-node');
            node.innerHTML = "";
        })
    }
    // if(LEVEL_DETAILS == "show-details"){
    //     let weightNodes = document.querySelectorAll('.weighted-node')
    //     weightNodes.forEach(function(node){
    //         node.classList.remove('weighted-node-10');
    //         node.classList.remove('weighted-node-15');
    //         node.classList.remove('weighted-node-20');
    //         node.innerHTML = "";
    //     })
    // }
})