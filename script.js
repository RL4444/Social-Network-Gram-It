//Matt's code for event listeners

var box = document.getElementById("blue-box");
var left = box.offsetLeft;
var myReqId;
var goRight = true;

box.style.transition = "background-color 1s";

box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "red";
  cancelAnimationFrame(myReqId);
});
box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "";
  moveBox();
});

function moveBox() {
  var boxRightPosition = left + box.offsetWidth;

  if (boxRightPosition >= window.innerWidth) {
    goRight = false;
  } else if (box.offsetLeft <= 0) {
    goRight = true;
  }

  goRight ? (left += 3) : (left -= 3);

  box.style.left = left + "px";

  myReqId = requestAnimationFrame(moveBox);
}
moveBox();
