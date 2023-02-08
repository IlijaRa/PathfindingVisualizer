// #region CONSTANTS
/*WINDOW SETTINGS*/
WIDTH = 50;
HEIGHT = 30;

/*GLOBAL VARIABLES*/
var dim1x1 = 0;
var dim3x3 = 0;
let mouseDown = 0;
let dragStart = 0;
let dragGoal = 0;
let activatedBfs = 0;
let activatedDfs = 0;
let activatedBidirectionalBfs = 0;
let activatedBidirectionalDfs = 0;
let activatedDijkstra = 0;
let activatedGreedyBfs = 0;
let activatedAStar = 0;
let isAlgorithmFinished = 0;
var startNodeExists = false;
var goalNodeExists = false;


WALL_VALUE = -1;
SLEEP_VALUE = 0;
WEIGHT_VALUE = 2;
CHOSEN_HEURISTIC = "euclidean";
LEVEL_OF_DETAILS = "hide-details";

/*COLORS*/
//from palete
WHITE_COLOR = 'rgb(255, 255, 255)';
YELLOW_COLOR = 'rgb(245, 193, 0)';
GREEN_COLOR = 'rgb(91, 177, 125)';
BLUE_COLOR = 'rgb(68, 139, 229)';
RED_COLOR = 'rgb(221, 34, 0)';
ORANGE_COLOR = 'rgb(240, 102, 40)';

//for maze entities
SEARCH_NODE_COLOR = 'rgb(51, 193, 228)';
GOAL_SEARCH_NODE_COLOR = 'rgb(240, 128, 128)';
EDGE_NODE_COLOR = 'rgb(240, 102, 40)';
GOAL_EDGE_NODE_COLOR = 'rgb(89, 235, 99)';
WALL_COLOR = 'rgb(119, 120, 122)';
PATH_COLOR = 'rgb(245, 193, 0)';
START_NODE_COLOR = 'rgb(74, 145, 212)';
GOAL_NODE_COLOR = 'rgb(209, 42, 59)';
INTERSECT_NODE_COLOR = 'rgb(245, 193, 0)';
WEIGHTED_NODE_COLOR = 'rgb(117, 235, 164)';
BORDER_COLOR = 'rgb(119, 120, 122)';
// #endregion

function ClearAlgorithmFlagVariables(){
    isAlgorithmFinished = 0;
    activatedBfs = 0;
    activatedDfs = 0;
    activatedBidirectionalBfs = 0;
    activatedBidirectionalDfs = 0;
    activatedDijkstra = 0;
    activatedGreedyBfs = 0;
    activatedAStar = 0;
}