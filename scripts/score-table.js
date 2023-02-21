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

function exportTableToCSV() {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      for (var j = 0; j < cols.length; j++) 
        row.push(cols[j].textContent);
      
      csv.push(row.join(","));
    }
    
    var csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    var downloadLink = document.createElement("a");
    downloadLink.download = "table.csv";
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }