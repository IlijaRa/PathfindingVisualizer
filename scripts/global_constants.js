// #region CONSTANTS
/*WINDOW SETTINGS*/
WIDTH = 35;
HEIGHT = Math.round(WIDTH / 1.67);

/*GLOBAL VARIABLES*/
var dim1x1 = 0;
var dim3x3 = 0;
let mouseDown = 0;
let dragStart = 0;
let dragGoal = 0;
let isAlgorithmFinished = 0;
let stopSearchingProcess = false;
var startNodeExists = false;
var goalNodeExists = false;
var hiddenWeightedNodes = [];
var blobArray = [];

WALL_VALUE = -1;
SLEEP_VALUE = 0;
INITIAL_SPEED_VALUE = 500;
WEIGHT_VALUE = 2;
CHOSEN_HEURISTIC = "euclidean";
LEVEL_OF_DETAILS = "hide-details";
ACTIVE_ALGORITHM = "";
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