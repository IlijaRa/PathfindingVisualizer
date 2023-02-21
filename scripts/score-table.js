let scoreTableButton = document.getElementById("a-score-table");

scoreTableButton.addEventListener('click', function(e){
    disablePointerActions();
    var scoreTable = document.getElementById('score-table');
    scoreTable.style.display = 'block';

    var closeButton = document.getElementById('button-close-scores');

    closeButton.addEventListener('click', function() {
        scoreTable.style.display = 'none';
        enablePointerActions();
      });
})

function addScoreToTable(noPathNodes, noSearchedNodes, executionTime){
    let table = document.getElementById("score-populating-table");
    
    let tableRow = document.createElement('tr');
    tableRow.setAttribute('id', 'row' + (table.childNodes.length + 1));

    let algNameCell = document.createElement('td');
    algNameCell.innerHTML = ACTIVE_ALGORITHM;
    tableRow.appendChild(algNameCell);

    let pathLengthCell = document.createElement('td');
    pathLengthCell.innerHTML = noPathNodes;
    tableRow.appendChild(pathLengthCell);

    let visitedNodesCell = document.createElement('td');
    visitedNodesCell.innerHTML = noSearchedNodes;
    tableRow.appendChild(visitedNodesCell);

    let executionTimeCell = document.createElement('td');
    executionTimeCell.innerHTML = executionTime;
    tableRow.appendChild(executionTimeCell);

    let canvasWidthCell = document.createElement('td');
    canvasWidthCell.innerHTML = WIDTH;
    tableRow.appendChild(canvasWidthCell);

    let executioSpeedCell = document.createElement('td');
    executioSpeedCell.innerHTML = INITIAL_SPEED_VALUE;
    tableRow.appendChild(executioSpeedCell);

    let heuristicCell = document.createElement('td');
    if(ACTIVE_ALGORITHM == "Dijkstra" || ACTIVE_ALGORITHM == "Greedy BFS" || ACTIVE_ALGORITHM == "A* - Astar")
        heuristicCell.innerHTML = CHOSEN_HEURISTIC;    
    else
        heuristicCell.innerHTML = "/";
    tableRow.appendChild(heuristicCell);

    let detailLevelCell = document.createElement('td');
    if(LEVEL_OF_DETAILS == "show-details")
        detailLevelCell.innerHTML = "High";
    else
        detailLevelCell.innerHTML = "Low";
    tableRow.appendChild(detailLevelCell);

    let clearButton = document.createElement('button');
    clearButton.classList.add('score-table-clear-button');
    clearButton.setAttribute('type', 'button');
    clearButton.innerHTML = "Clear";
    clearButton.addEventListener('click', function(e){
        if(confirm('Are you sure that you want to delete this record?'))
            tableRow.remove();
    })
    tableRow.appendChild(clearButton);

    table.appendChild(tableRow);
    // return;
    // let scorePopulationgElement = document.getElementById("score-populating-part");
    // //<div id="row[someIndex]" class="score-table-row"></div>
    // let newRowElement = document.createElement('div');
    // let last_index = scorePopulationgElement.childNodes.length;
    // newRowElement.setAttribute('id', 'row' + (last_index + 1));
    // newRowElement.classList.add('score-table-row');

    // //<div class="scores-col alg-name-col">[someValue]</div>
    // let algNameElement = document.createElement('div');
    // algNameElement.classList.add('scores-col', 'alg-name-col');
    // algNameElement.innerHTML = ACTIVE_ALGORITHM;
    // newRowElement.appendChild(algNameElement);

    // // <div class="scores-col path-legth-col">33</div>
    // let pathLengthElement = document.createElement('div');
    // pathLengthElement.classList.add('scores-col', 'path-legth-col');
    // pathLengthElement.innerHTML = noPathNodes;
    // newRowElement.appendChild(pathLengthElement);

    // // <div class="scores-col searched-nodes-col">465</div>
    // let searchedNodesElement = document.createElement('div');
    // searchedNodesElement.classList.add('scores-col', 'searched-nodes-col');
    // searchedNodesElement.innerHTML = noSearchedNodes;
    // newRowElement.appendChild(searchedNodesElement);

    // // <div class="scores-col execution-time-col">14500.43</div>
    // let executionTimeElement = document.createElement('div');
    // executionTimeElement.classList.add('scores-col', 'execution-time-col');
    // executionTimeElement.innerHTML = executionTime;
    // newRowElement.appendChild(executionTimeElement);

    // // <div class="scores-col canvas-width-col">50</div>
    // let canvasWidthElement = document.createElement('div');
    // canvasWidthElement.classList.add('scores-col', 'canvas-width-col');
    // canvasWidthElement.innerHTML = WIDTH;
    // newRowElement.appendChild(canvasWidthElement);

    // // <div class="scores-col execution-speed-col">450</div>
    // let executionSpeedElement = document.createElement('div');
    // executionSpeedElement.classList.add('scores-col', 'execution-speed-col');
    // executionSpeedElement.innerHTML = INITIAL_SPEED_VALUE;
    // newRowElement.appendChild(executionSpeedElement);

    // // <div class="scores-col heuristic-col">/</div>
    // let heuristicElement = document.createElement('div');
    // heuristicElement.classList.add('scores-col', 'heuristic-col');
    // if(ACTIVE_ALGORITHM == "Dijkstra" || ACTIVE_ALGORITHM == "Greedy BFS" || ACTIVE_ALGORITHM == "A* - Astar")
    //     heuristicElement.innerHTML = CHOSEN_HEURISTIC;    
    // else
    //     heuristicElement.innerHTML = "/";
    // newRowElement.appendChild(heuristicElement);

    // // <div class="scores-col details-level-col">High</div>
    // let detailsLevelElement = document.createElement('div');
    // detailsLevelElement.classList.add('scores-col', 'details-level-col');
    // detailsLevelElement.innerHTML = LEVEL_OF_DETAILS;
    // newRowElement.appendChild(detailsLevelElement);

    // // <div class="scores-col clear-content-col"><button class="score-table-clear-button">Clear</button></div>
    // let clearContentElement = document.createElement('div');
    // clearContentElement.classList.add('scores-col', 'clear-content-col');
    // let clearButton = document.createElement('button');
    // clearButton.classList.add('score-table-clear-button');
    // clearButton.innerHTML = 'Clear';
    // clearContentElement.appendChild(clearButton);
    // clearContentElement.addEventListener('click', function(e){
    //     if(confirm('Are you sure that you want to delete this record?'))
    //         newRowElement.remove();
    // })

    // newRowElement.appendChild(clearContentElement);
    // scorePopulationgElement.appendChild(newRowElement);
}

document.getElementById("score-table-clear-all-button").addEventListener('click', function(e){
    if(confirm('Are you sure that you want to delete this record?'))
    {
        const scorePopulationPart = document.getElementById("score-populating-table");
    
        scorePopulationPart.querySelectorAll("tr").forEach(node => {
            if (node.id != "main-row") {
                node.remove();
            }
        });
    }
});