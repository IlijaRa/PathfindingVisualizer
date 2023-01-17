async function reconstructPath(startNodeNumber, goalNodeNumber, prev){
    constructPathReverse(startNodeNumber, goalNodeNumber, grabPrevious(goalNodeNumber, prev));
}
function grabPrevious(goalNodeNumber, prev){
    let loopControl = false;
    goalToStart = []; // gathers nodes from goal to start node grabbing the previous nodes
    previous = goalNodeNumber - 1;
    goalToStart.push(previous);
    
    while(true){
        let node = prev[previous];
        goalToStart.push(node);

        if(node == 0) loopControl = true;
        else previous = node;

        if(loopControl){
            break;
        }
    }
    return goalToStart;
}
async function constructPathReverse(startNodeNumber, goalNodeNumber, goalToStart){
    for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
        await sleep(SLEEP_VALUE);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node + 1));
                if(!n.classList.contains('start-node') && !n.classList.contains('goal-node')){
                    deleteAnyNodeClass(node + 1);
                    n.classList.add('path-node');
                }
                
                // drawStartNode(startNodeNumber);
                // drawGoalNode(goalNodeNumber);
            }
        }catch(err){
            loopControl = true;
        }
    }
}