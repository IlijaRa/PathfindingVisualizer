document.addEventListener("contextmenu", function(event) {
    event.preventDefault();

    if(isNodeWeighted(Node.GetNodeNumber(event.target.id))){

        if(document.querySelector('.clear-menu') != null){
            document.body.removeChild(document.querySelector('.clear-menu'));
        }

        disablePointerActions();
        let currentWeightElement = document.getElementById('node' + Node.GetNodeNumber(event.target.id));
        
        let input = document.createElement("input");
        input.type = "number";
        input.min = 2;
        input.max = 20;
        input.value = parseInt(currentWeightElement.children[0].innerText);
    
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                if(parseInt(input.value) < 2 || parseInt(input.value) > 20){
                    showWarningAlert('Weight value need to be between 2 and 20!');
                    input.value = 2;
                    return;
                }
                drawWeightedNode(Node.GetNodeNumber(event.target.id), input.value);
                enablePointerActions();
                weightEntranceMenu.remove();
            }
        });
    
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.style.float = "right";
        closeButton.style.backgroundColor = "transparent";
        closeButton.style.border = "none";
        closeButton.style.fontSize = "18px";
        closeButton.style.cursor = "pointer";
        closeButton.style.color = "#fff";
        closeButton.addEventListener("click", function() {
            enablePointerActions();
            weightEntranceMenu.remove();
        });
    
        let weightEntranceMenu = document.createElement("div");
        weightEntranceMenu.classList.add('add-weight-menu');
        weightEntranceMenu.style.position = "fixed";
        weightEntranceMenu.style.top = event.clientY + "px";
        weightEntranceMenu.style.left = event.clientX + "px";
        weightEntranceMenu.style.backgroundColor = "#fff";
        weightEntranceMenu.style.boxShadow = "0px 0px 10px #333";
        weightEntranceMenu.style.padding = "10px";
        weightEntranceMenu.style.borderRadius = "5px";
        weightEntranceMenu.style.backgroundColor = "#1E2431";
        weightEntranceMenu.appendChild(input);
        weightEntranceMenu.appendChild(closeButton);
        document.body.appendChild(weightEntranceMenu);
    
        weightEntranceMenu.style.top = event.clientY + "px";
        weightEntranceMenu.style.left = event.clientX + "px";
        weightEntranceMenu.style.position = "absolute";

        return;
    }

    if(isNodeWall(Node.GetNodeNumber(event.target.id))){
        drawUnvisitedNode(Node.GetNodeNumber(event.target.id));
        let element = document.getElementById(event.target.id);
        element.innerHTML = "";
        return;
    }

    if(document.querySelector('.clear-menu') != null){
        document.body.removeChild(document.querySelector('.clear-menu'));
    }

    let clearMenu = document.createElement("div");
    clearMenu.classList.add('clear-menu');
    clearMenu.style.position = "fixed";
    clearMenu.style.left = event.clientX + "px";
    clearMenu.style.top = event.clientY + "px";
    clearMenu.style.backgroundColor = "white";
    clearMenu.style.padding = "10px";
    clearMenu.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    clearMenu.style.textAlign = "left";
    clearMenu.style.backgroundColor = "#1E2431";
    clearMenu.style.color = "white";
    clearMenu.style.fontFamily = "'Open Sans', sans-serif";

    let option1 = document.createElement("div");
    option1.innerHTML = "Clear All Except Start&Goal";
    option1.style.cursor = "pointer";
    option1.style.padding = "5px";
    option1.style.marginBottom = "5px";
    option1.addEventListener("click", () => {
        ClearAllExceptStartGoal();
        clearMenu.remove();
    });

    let option2 = document.createElement("div");
    option2.innerHTML = "Clear Walls";
    option2.style.cursor = "pointer";
    option2.style.padding = "5px";
    option2.style.marginBottom = "5px";
    option2.addEventListener("click", () => {
        ClearWalls();
        clearMenu.remove();
    });

    let option3 = document.createElement("div");
    option3.innerHTML = "Clear Weights";
    option3.style.cursor = "pointer";
    option3.style.padding = "5px";
    option3.style.marginBottom = "5px";
    option3.addEventListener("click", () => {
        ClearWeights();
        clearMenu.remove();
    });

    let option4 = document.createElement("div");
    option4.innerHTML = "Clear Search&Path";
    option4.style.cursor = "pointer";
    option4.style.padding = "5px";
    option4.style.marginBottom = "5px";
    option4.addEventListener("click", () => {
        ClearSearchPath()
        clearMenu.remove();
    });

    clearMenu.appendChild(option1);
    clearMenu.appendChild(option2);
    clearMenu.appendChild(option3);
    clearMenu.appendChild(option4);

    document.body.appendChild(clearMenu);

    return;
  });