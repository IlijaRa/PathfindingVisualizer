function myFunction() {
    var x = document.getElementById("centered_nav");
    if (x.className === "rc_nav") {
        x.className += " responsive";
    } else {
        x.className = "rc_nav";
    }
}

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

let speedSlider = document.getElementById("speed-slider");
speedSlider.addEventListener('input', function(e){
    SLEEP_VALUE = 40 - e.target.value;
})