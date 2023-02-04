document.addEventListener("contextmenu", function(event) {
    event.preventDefault();

    if(!isNodeWeighted(Node.GetNodeNumber(event.target.id))){
        if( isNodeStart(Node.GetNodeNumber(event.target.id)) || 
            isNodeGoal(Node.GetNodeNumber(event.target.id))){
                return;
            }
            drawUnvisitedNode(Node.GetNodeNumber(event.target.id));
            let element = document.getElementById(event.target.id);
            element.innerHTML = "";
            return;
    }

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
            menu.remove();
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
        menu.remove();
    });

    let menu = document.createElement("div");
    menu.style.position = "fixed";
    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
    menu.style.backgroundColor = "#fff";
    menu.style.boxShadow = "0px 0px 10px #333";
    menu.style.padding = "10px";
    menu.style.borderRadius = "5px";
    menu.style.backgroundColor = "#1E2431";
    menu.appendChild(input);
    menu.appendChild(closeButton);
    document.body.appendChild(menu);

    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
    menu.style.position = "absolute";
  });

    // addEventListener('contextmenu', function(e){
    //     e.preventDefault();
    //     if( isNodeWeighted(Node.GetNodeNumber(e.target.id)) || 
    //         isNodeWeightedVisited(Node.GetNodeNumber(e.target.id))){
    //             let currentWeightElement = document.getElementById('node' + Node.GetNodeNumber(e.target.id));
    
    //             var input = document.createElement("input");
    //             input.type = "number";
    //             input.min = 2;
    //             input.max = 20;
    //             input.value = parseInt(currentWeightElement.children[0].innerText);
    //             input.addEventListener("change", function(e) {
    //                 if (e.key === "Enter") {
    //                     drawWeightedNode(Node.GetNodeNumber(e.target.id), input.value)
    //                     menu.remove();
    //                 }
    //             });
    
    //             var closeButton = document.createElement("button");
    //             closeButton.innerHTML = "&times;";
    //             closeButton.style.float = "right";
    //             closeButton.style.backgroundColor = "transparent";
    //             closeButton.style.border = "none";
    //             closeButton.style.fontSize = "18px";
    //             closeButton.style.cursor = "pointer";
    //             closeButton.style.color = "#fff";
    //             closeButton.addEventListener("click", function() {
    //                 menu.remove();
    //             });
    
    //             let menu = document.createElement("div");
    //             menu.style.position = "fixed";
    //             menu.style.top = e.clientY + "px";
    //             menu.style.left = e.clientX + "px";
    //             menu.style.backgroundColor = "#fff";
    //             menu.style.boxShadow = "0px 0px 10px #333";
    //             menu.style.padding = "10px";
    //             menu.style.borderRadius = "5px";
    //             menu.style.backgroundColor = "#1E2431";
    //             menu.appendChild(input);
    //             menu.appendChild(closeButton);
    //             document.body.appendChild(menu);          
    //     }
    //     else{
    //         if( isNodeStart(Node.GetNodeNumber(e.target.id)) || 
    //         isNodeGoal(Node.GetNodeNumber(e.target.id))){
    //             return;
    //         }
    //         drawUnvisitedNode(Node.GetNodeNumber(e.target.id));
    //         let element = this.document.getElementById(e.target.id);
    //         element.innerHTML = "";
    //     }
    // });