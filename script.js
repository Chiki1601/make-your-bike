var state = document.getElementsByClassName("bike-container")[0];
var colorState = document.getElementsByClassName("color-option")[0];
var wheelState = document.getElementsByClassName("wheel-option")[0];
var nameState = document.getElementsByClassName("name-option")[0];
var nameButton = document.getElementById("name-confirm");
var finalConfirm = document.getElementById("final-confirm");
var thankYou = document.getElementsByClassName("thank-you")[0];
var frontWheelAnim = document.getElementsByClassName("front-wheel");
var backWheelAnim = document.getElementsByClassName("back-wheel");

var colors = {
  "orange":{"start":"#FCA616", "stop":"#F24D46"},
    "green":{"start":"#D2FF4B", "stop":"#006A79"},
      "pink":{"start":"#FF475B", "stop":"#981976"},
        "blue":{"start":"#00EFFF", "stop":"#004194"}};

var wheelStyles = ["16 8 16 8", "15 2 15 2", "4 5 4 4", "40 15 12 15", "20 20 10 8", "19 60 90 19"];

document.getElementById("color-confirm").addEventListener("click", colorConfirm);
document.getElementById("wheel-confirm").addEventListener("click", wheelConfirm);
nameState.addEventListener("input", showConfirm);
nameButton.addEventListener("click", nameConfirm);

document.getElementById("c1").addEventListener("click", switchColor);
document.getElementById("c2").addEventListener("click", switchColor);
document.getElementById("c3").addEventListener("click", switchColor);
document.getElementById("c4").addEventListener("click", switchColor);

var wheelButtons = document.querySelectorAll("input[name='wheel']");
for (var i = 0; i < wheelButtons.length; i++) {
  wheelButtons[i].addEventListener("click", switchWheels);
}

var ws = new WebSocket("wss://uwmap.uswest.appfog.ctl.io/bikes");
console.log(ws);
finalConfirm.addEventListener("click", sendBike);

 var bikeData = {
    color: "",
    wheel: "",
    name: ""
  };

function switchColor() {
  var hex = this.value;
  bikeData.color = hex;
  // console.log(bikeData.color);
  var colorLocations = document.querySelectorAll("stop");

  for (var i = 0; i < colorLocations.length; i++) {
    if (i == 0 || i == 2 || i == 5) {
      colorLocations[i].setAttribute("stop-color", colors[hex].start);
    } else {
      colorLocations[i].setAttribute("stop-color", colors[hex].stop);
    }  
  }
}

function switchWheels() {
  var idx = this.value;
  bikeData.wheel = idx;
  // console.log(bikeData.wheel);
  var frontWheel = document.querySelector("#front-wheel use");
  var backWheel = document.querySelector("#back-wheel use");

  frontWheel.setAttribute("stroke-dasharray", wheelStyles[idx]);
  backWheel.setAttribute("stroke-dasharray", wheelStyles[idx]);
}

function colorConfirm() {
  for (var i = 0; i < frontWheelAnim.length; i++) {
    frontWheelAnim[i].classList.toggle("noAnim");
    backWheelAnim[i].classList.toggle("noAnim");
  }
  colorState.classList.toggle("hide");
  wheelState.classList.toggle("hide");
  state.classList.toggle("zoom1");
}

function wheelConfirm() {
  wheelState.classList.toggle("hide");
  state.classList.toggle("zoom1");
  state.classList.toggle("zoom2");
  nameState.classList.toggle("opacit");
}

function showConfirm() {
  nameButton.classList.add("show");
  // console.log("show");
}

function nameConfirm() {
  nameButton.classList.remove("show");
  var name = document.getElementById("name").value;
  // console.log(name);
  bikeData.name = name;
  finalConfirm.classList.toggle("hide");
  state.classList.toggle("zoom2");
  for (var i = 0; i < frontWheelAnim.length; i++) {
    frontWheelAnim[i].classList.toggle("noAnim");
    backWheelAnim[i].classList.toggle("noAnim");
  }
}

function sendBike() {
  state.classList.add("confirmed");
  finalConfirm.classList.toggle("hide");
  thankYou.classList.add("confirmed");
  // console.log("sending bike");
  ws.send(JSON.stringify(bikeData));
}