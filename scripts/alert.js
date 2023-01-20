// Get all elements with class="closebtn"
var close = document.getElementsByClassName("closebtn");
var i;
// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function(){
    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;
    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";
    div.style.display = "none";
  }
}
function showStatisticsAlert(noPathNodes, noSearchedNodes){
    document.querySelector('.insert-alert').innerHTML = `<div class="info-alert">
                                                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                                                            The shortest path length: ` + noPathNodes + `. Number of searched nodes: ` + noSearchedNodes + 
                                                        `</div>`
}