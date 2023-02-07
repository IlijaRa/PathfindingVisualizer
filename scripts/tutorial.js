window.addEventListener('load', function() {
    disablePointerActions();
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
  
    var backButton = document.getElementById('backward');
    var forwardButton = document.getElementById('forward');
    var closeButton = document.getElementById('close');
    var popupContent = document.getElementById('popup-content');
  
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