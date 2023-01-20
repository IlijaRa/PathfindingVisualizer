document.querySelector('#buttonRandomSeed').addEventListener('click', function(e){
    ClearAll();
    let maze = construct2dArray();
    generateMaze(maze, generateWalls());
    generateStartAndGoalNode();
})
// Generate walls for random seed
function generateWalls() {
    var scheme_2dArray = new Array(HEIGHT);
    for(let i = 0; i < HEIGHT; i++){
        scheme_2dArray[i] = new Array(WIDTH).fill(0);
    }
    // var scheme_array = new Array(HEIGHT * WIDTH).fill(0);
    for(let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let x = Math.floor((Math.random() * 5) - 1); // basically with this random value, WALL_VALUE has 20% to generate itself
            if (x == WALL_VALUE) {
                scheme_2dArray[i][j] = WALL_VALUE;
            } else {
                scheme_2dArray[i][j] = i + j + 1;
            }
        }
    }
    console.log('scheme_2dArray', scheme_2dArray);
    return scheme_2dArray;
}