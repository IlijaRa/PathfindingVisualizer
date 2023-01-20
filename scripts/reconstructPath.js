async function reconstructPath(goalNodeNumber, prev){
    let noPathNodes = await constructPathReverse(grabPrevious(goalNodeNumber, prev));
    return noPathNodes;
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
async function constructPathReverse(goalToStart){
    let noPathNodes = 0;
    for(node of goalToStart.reverse()){ //goalToStart.reverse() gives nodes sorted from start to node
        await sleep(SLEEP_VALUE);
        try{
            if(node != 0){
                let n = document.getElementById('node' + (node + 1));
                if(!n.classList.contains('start-node') && !n.classList.contains('goal-node')){
                    deleteAnyNodeClass(node + 1);
                    n.classList.add('path-node');
                    noPathNodes ++;
                }
            }
        }catch(err){
            loopControl = true;
        }
    }
    enablePointerActions();
    return noPathNodes;
}