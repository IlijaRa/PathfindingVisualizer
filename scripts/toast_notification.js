let toastBox = document.getElementById('toastBox');

function showSuccessToast(message){
    let toast = document.createElement('div');
    toast.classList.add('toast', 'success');
    toast.innerHTML = ` <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <i class="fa-solid fa-circle-check"></i>` + message;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function showErrorToast(message){
    let toast = document.createElement('div');
    toast.classList.add('toast', 'error');
    toast.innerHTML = ` <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <i class="fa-solid fa-circle-xmark"></i>` + message;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function showWarningToast(message){
    let toast = document.createElement('div');
    toast.classList.add('toast', 'warning');
    toast.innerHTML = ` <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <i class="fa-solid fa-circle-exclamation"></i>` + message;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 10000);
}

function showInfoToast(algorithmName, noPathNodes, executionTime){
    let noSearchedNodes = countSearchedNodes();
    let toast = document.createElement('div');
    toast.classList.add('toast', 'info');
    toast.innerHTML = ` <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <i class="fa-solid fa-circle-info"></i>` +
                                `Algorithm: ` + algorithmName + `<br>` + 
                                `The shortest path length: ` + noPathNodes + `<br>` + 
                                `Number of searched nodes: ` + noSearchedNodes + `<br>` +
                                `With execution time: ` + executionTime.toFixed(2) + ` ms.`;
    toastBox.appendChild(toast);
    addScoreToTable(noPathNodes, noSearchedNodes, executionTime.toFixed(2));
}

function countSearchedNodes(){
    let counter = 0;
    let numberOfSearchedNodes = document.querySelectorAll("div.visited-nodeA, div.visited-nodeB, div.path-node");
    numberOfSearchedNodes.forEach(function(node){
      counter ++;
    });
    return counter;
  }