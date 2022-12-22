/*WINDOW SETTINGS*/
WIDTH = 75;
HEIGHT = 50;

/*START AND END NODE STATES*/
var startNodeExists = false;
var endNodeExists = false;

/*COLORS*/
WALL_COLOR = 'rgb(52, 52, 52)';
ORIGINAL_COLOR = 'rgb(255, 255, 255)';
START_NODE_COLOR = 'rgb(74, 145, 212)';
END_NODE_COLOR = 'rgb(209, 42, 59)';

/*MOUSE BUTTON LISTENER*/
let mouseDown = 0;
document.onmousedown = () => {mouseDown = 1;}
document.onmouseup = () => {mouseDown = 0;}

// var mouseDown = 0;

// document.addEventListener('mousedown', function(event) { 
//     if ( event.which ) mouseDown = 1;
// }, true);

// document.addEventListener('mouseup', function(event) { 
//     if ( event.which ) mouseDown = 0;
// }, true);

function setup(){
    var maze_container = document.querySelector('#maze_container');
    for(var i = 0; i < HEIGHT; i++){
        var row = document.createElement('div');
        row.className = 'row row' + (i + 1);
        row.id = 'row' + (i + 1);
        
        for(var j = 0; j < WIDTH; j++){
            var node = document.createElement('div');
            node.className = 'node node' + ((i * WIDTH) + (j + 1));
            node.id = 'node' + ((i * WIDTH) + (j + 1));
            node.style.backgroundColor = ORIGINAL_COLOR;

            node.addEventListener('mouseover', function(e){
                if(mouseDown == 1){
                    if(startNodeExists == false){
                        e.target.style.backgroundColor = START_NODE_COLOR;
                        startNodeExists = true;
                    }
                    else if(endNodeExists == false && e.target.style.backgroundColor != START_NODE_COLOR){
                        e.target.style.backgroundColor = END_NODE_COLOR;
                        endNodeExists = true;
                    }  
                    else if(startNodeExists == true && endNodeExists == true && e.target.style.backgroundColor != START_NODE_COLOR && e.target.style.backgroundColor != END_NODE_COLOR){
                        e.target.style.backgroundColor = WALL_COLOR;
                    } 
                }
            })

            node.addEventListener('click', function(e){
                if(startNodeExists == false){
                    e.target.style.backgroundColor = START_NODE_COLOR;
                    startNodeExists = true;
                }
                else if(endNodeExists == false && e.target.style.backgroundColor != START_NODE_COLOR){
                    e.target.style.backgroundColor = END_NODE_COLOR;
                    endNodeExists = true;
                }
                else if(startNodeExists == true && endNodeExists == true && e.target.style.backgroundColor != START_NODE_COLOR && e.target.style.backgroundColor != END_NODE_COLOR){
                    e.target.style.backgroundColor = WALL_COLOR;
                } 
            })

            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
}

function reset(){
    for(var i = 1; i <= WIDTH * HEIGHT; i++ ){
        var node = document.getElementById('node' + i);
        node.style.backgroundColor = ORIGINAL_COLOR;
        startNodeExists = false;
        endNodeExists = false;
    }
}