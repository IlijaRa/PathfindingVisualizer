// document.querySelector('a#buttonRandomizedKruskal').addEventListener('click', function(e){
//     ClearAll();
//     let maze = construct2dArray();
//     disablePointerActions();
//     generateRandomizedKruskal(maze);
//     // startNodeExists = false;
//     // goalNodeExists = false;
// });
// async function generateRandomizedKruskal(grid) {
//     // Populate canvas with wall nodes
//     for (let i = 0; i < HEIGHT; i++) {
//       for (let j = 0; j < WIDTH; j++) {
//         drawWallNode(grid[i][j]);
//       }
//     }
  
//     let edgeList = [];
//     // Create a list of all edges in the grid
//     for (let i = 0; i < HEIGHT; i++) {
//       for (let j = 0; j < WIDTH; j++) {
//         if (i < HEIGHT - 1) {
//           edgeList.push([grid[i][j], grid[i + 1][j]]);
//         }
//         if (j < WIDTH - 1) {
//           edgeList.push([grid[i][j], grid[i][j + 1]]);
//         }
//       }
//     }
    
//     // Shuffle the edge list
//     shuffleArray(edgeList);

//     // Create a disjoint set for each cell
//     let sets = new Array(HEIGHT * WIDTH);
//     for (let i = 0; i < sets.length; i++) {
//       sets[i] = i;
//     }
  
//     while (edgeList.length) {
//       await sleep(SLEEP_VALUE);
//       let edge = edgeList.pop();
//       let node1 = edge[0];
//       let node2 = edge[1];
//       let set1 = sets[getNodeIndex(node1)];
//       let set2 = sets[getNodeIndex(node2)];
  
//       // If the nodes are not in the same set, connect them and merge the sets
//       if (set1 !== set2) {
//         drawUnvisitedNode(node1);
//         drawUnvisitedNode(node2);
//         for (let i = 0; i < sets.length; i++) {
//           if (sets[i] === set2) {
//             sets[i] = set1;
//           }
//         }
//       }
//     }
  
//     generateStartAndGoalNode();
//     enablePointerActions();
//   }
  
//   // Helper function to shuffle an array
//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
  
//   // Helper function to get the index of a node in the grid
//   function getNodeIndex(node) {
//     let coordinates = getNodeCoordinates(node);
//     let row = coordinates[0];
//     let col = coordinates[1];
//     return row * WIDTH + col;
//   }