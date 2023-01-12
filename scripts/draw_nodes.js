function drawVisitedNodeOne(currentNode, startNodeNumber){
    // change empty-node to visited-node
    if(currentNode != startNodeNumber){
        document.getElementById('node' + currentNode).classList.remove('empty-node');
        document.getElementById('node' + currentNode).classList.remove('weighted-node');
        document.getElementById('node' + currentNode).classList.add('visited-node1');
    }
}
// function drawCurrentNodeOne(currentNode, goalNodeNumber){
//     // change empty-node to visited-node
//     if(currentNode != goalNodeNumber){
//         document.getElementById('node' + currentNode).classList.remove('empty-node');
//         document.getElementById('node' + currentNode).classList.add('current-node1');
//     }
// }