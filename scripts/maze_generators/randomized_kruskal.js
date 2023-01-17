// document.querySelector('a#buttonRandomizedKruskal').addEventListener('click', function(e){
//     ClearAll();
//     let maze = construct2dArray();
//     disablePointerActions();
//     generateRandomizedKruskal(maze);
//     startNodeExists = false;
//     goalNodeExists = false;
// });

// // async function generateRandomizedKruskal(grid) {
// // // Populate canvas with wall nodes
// //     for(let i = 0 ; i < HEIGHT ; i++){
// //         for(let j = 0 ; j < WIDTH ; j++){
// //             drawWallNode(grid[i][j]);
// //         }
// //     }

// //     // Create a list to store the edges of the grid
// //     let edges = [];

// //     // Add all of the horizontal and vertical edges to the list
// //     for (let i = 0; i < HEIGHT; i++) {
// //         for (let j = 0; j < WIDTH; j++) {
// //             if (i < HEIGHT - 1) {
// //                 edges.push([grid[i][j], grid[i + 1][j]]);
// //             }
// //             if (j < WIDTH - 1) {
// //                 edges.push([grid[i][j], grid[i][j + 1]]);
// //             }
// //         }
// //     }

// //     // Shuffle the list of edges
// //     shuffleArray(edges);

// //     // Create a disjoint set data structure to keep track of connected components
// //     let components = {};
// //     for (let i = 0; i < HEIGHT; i++) {
// //         for (let j = 0; j < WIDTH; j++) {
// //             components[grid[i][j]] = grid[i][j];
// //         }
// //     }

// //     // Iterate over the edges and connect them if they don't form a cycle
// //     for (let i = 0; i < edges.length; i++) {
// //         await sleep(0);
// //         let edge = edges[i];
// //         let a = find(components, edge[0]),
// //             b = find(components, edge[1]);
// //         if (a !== b) {
// //             union(components, a, b);
// //             drawUnvisitedNode(edge[0]);
// //             drawUnvisitedNode(edge[1]);
// //         }
// //     }
// //     enablePointerActions();
// // }
// async function generateRandomizedKruskal(grid) {
//     for(let i = 0 ; i < HEIGHT ; i++){
//         for(let j = 0 ; j < WIDTH ; j++){
//             drawWallNode(grid[i][j]);
//         }
//     }
    
//     // Create a list to store the edges of the grid
//     let edges = [];
//     // possible choices for algorithm to move
//     let choices = [[-2,0],[0,2],[2,0],[0,-2]];
//     // Add all of the horizontal and vertical edges to the list
//     for (let i = 0; i < HEIGHT; i++) {
//         for (let j = 0; j < WIDTH; j++) {
//             if (i < HEIGHT - 1) {
//                 edges.push([grid[i][j], grid[i + 1][j]]);
//             }
//             if (j < WIDTH - 1) {
//                 edges.push([grid[i][j], grid[i][j + 1]]);
//             }
//         }
//     }

//     // Shuffle the list of edges
//     shuffleArray(edges);

//     // Create a disjoint set data structure to keep track of connected components
//     let components = {};
//     for (let i = 0; i < HEIGHT; i++) {
//         for (let j = 0; j < WIDTH; j++) {
//             components[grid[i][j]] = grid[i][j];
//         }
//     }

//     // Iterate over the edges and connect them if they don't form a cycle
//     for (let i = 0; i < edges.length; i++) {
//         await sleep(0);
//         let edge = edges[i];
//         let a = find(components, edge[0]),
//             b = find(components, edge[1]);
//         if (a !== b) {
//             union(components, a, b);
//             drawUnvisitedNode(edge[0]);
//             drawUnvisitedNode(edge[1]);
//             // store cell's frontier nodes in this array
//             let frontierList = [];
//             computeFrontierCells(grid, edge[0], frontierList, choices);
//             // computeFrontierCells(grid, edge[1], frontierList, choices);
//             // checking all possible moves
//             for (let i = 0; i < frontierList.length; ++i) {
//                 let frontier = frontierList[i];
//                 if (isNodeWall(frontier)) {
//                     drawUnvisitedNode(frontier);
//                     computeFrontierCells(grid, frontier, frontierList, choices);
//                 }
//             }
//         }
//     }
//     enablePointerActions();
// }

// function computeFrontierCells(grid, cell, frontierList, choices){
//     // coordinates contains coordinates of the current cell
//     let coordinates = getNodeCoordinates(cell);
//     // checking all possible moves
//     for(let i = 0 ; i < choices.length ; ++i){
//         let row = coordinates[0] + choices[i][0];
//         let col = coordinates[1] + choices[i][1];
//         // checking to see if cell is inside canvas borders
//         if((row >= 0 && row < HEIGHT) && (col >= 0 && col < WIDTH) && (isNodeWall(grid[row][col]))){
//             let frontier = grid[row][col];
//             let inBetween = null;
//             if(choices[i][0] === -2){
//                 inBetween = grid[coordinates[0] - 1][coordinates[1]];
//             }else if(choices[i][0] === 2){
//                 inBetween = grid[coordinates[0]+1][coordinates[1]];
//             }else if(choices[i][1] === -2){
//                 inBetween = grid[coordinates[0]][coordinates[1] - 1];
//             }else if(choices[i][1] === 2){
//                 inBetween = grid[coordinates[0]][coordinates[1] + 1];
//             }
//             frontierList.push([inBetween, frontier]);
//         }
//     }
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// function find(components, node) {
//     if (components[node] !== node) {
//         components[node] = find(components, components[node]);
//     }
//     return components[node];
// }

// function union(components, a, b) {
//     components[a] = b;
// }