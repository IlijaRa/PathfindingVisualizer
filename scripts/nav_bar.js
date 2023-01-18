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
    SLEEP_VALUE = 100 - e.target.value;
})
// Setting the weight of weighted nodes in canvas
document.getElementById("weight-input").addEventListener('change', function(e){
    if(parseInt(e.target.value) < 2 || parseInt(e.target.value) > 20){
        alert('Weight value need to be between 2 and 20!');
        e.target.value = 2;
        return;
    }
    WEIGHT_VALUE = parseInt(e.target.value);
})
// Setting the heuristic calculation
document.getElementById("select-heuristic").addEventListener('change', function(e){
    console.log('chosen heuristic: ', e.target.value);
    CHOSEN_HEURISTIC = e.target.value;
})