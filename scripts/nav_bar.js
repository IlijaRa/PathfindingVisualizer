function myFunction() {
    var x = document.getElementById("centered_nav");
    if (x.className === "rc_nav") {
        x.className += " responsive";
    } else {
        x.className = "rc_nav";
    }
}
// Setting the number of nodes in canvas
let nodeSlider = document.getElementById("node-slider");
nodeSlider.addEventListener('input', function(e){
    
    var el = document.getElementById('maze_container');
    while (el.firstChild) el.removeChild(el.firstChild);
    WIDTH = e.target.value;
    HEIGHT = Math.round(WIDTH / 1.67);
    startNodeExists = false;
    goalNodeExists = false;
    constructGrid();
})
// Setting the speed of nodes in canvas
let speedSlider = document.getElementById("speed-slider");
speedSlider.addEventListener('input', function(e){
    SLEEP_VALUE = 100 - e.target.value;
})
// Setting the weight of weighted nodes in canvas
let nodeWeightInput = document.getElementById("weight-input");
nodeWeightInput.addEventListener('input', function(e){
    WEIGHT_VALUE = parseInt(e.target.value);
    console.log('WEIGHTED_VALUE:', WEIGHT_VALUE );
})