// #region CONSTANTS
/*WINDOW SETTINGS*/
WIDTH = 60;
HEIGHT = 40;

/*GLOBAL VARIABLES*/
var startNodeExists = false;
var goalNodeExists = false;
var node_classes = ['start-node', 'goal-node', 'wall-node', 'weighted-node', 'current-node', 'visited-node', 'path-node']
// !node_classes.some(c => e.target.classList.contains(c))
WALL_VALUE = -1;

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