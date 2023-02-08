let tutorialButton = document.getElementById("a-tutorial");
let slide1 = `<div id="popup-content-center" class="popup-content-center">
                <div class="popup-content-header">
                    What is a pathfinding algorithm?
                </div>
                <div id="popup-content-text">
                    <p> At its core, a pathfinding method searches a graph by starting at one vertex and exploring adjacent nodes until the 
                        destination node is reached, generally with the intent of finding the cheapest route. Although graph searching methods 
                        such as a breadth-first search would find a route if given enough time, other methods, which "explore" the graph, would 
                        tend to reach the destination sooner. An analogy would be a person walking across a room; rather than examining every 
                        possible route in advance, the person would generally walk in the direction of the destination and only deviate from the 
                        path to avoid an obstruction, and make deviations as minor as possible.</p>
                        <img src="./images/tutorial/location2.png"/>
                </div>
            </div>`;
let slide2 = ``;
tutorialButton.addEventListener('click', function() {
    disablePointerActions();
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
  
    var backButton = document.getElementById('left-arrow-button');
    var forwardButton = document.getElementById('right-arrow-button');
    var closeButton = document.getElementById('button-close');
    var popupContent = document.getElementById('popup-content-center');
  
    var popupStack = [];
    popupStack.push(popupContent.innerHTML);
  
    backButton.addEventListener('click', function() {
      if (popupStack.length > 1) {
        popupStack.pop();
        popupContent.innerHTML = popupStack[popupStack.length - 1];
      }
    });
  
    forwardButton.addEventListener('click', function() {
      popupStack.push('<p>New Popup Content</p>');
      popupContent.innerHTML = popupStack[popupStack.length - 1];
    });
  
    closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
      enablePointerActions();
    });
  });