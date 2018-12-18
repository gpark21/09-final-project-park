var langKey = "4d79aa3a9ed07731a6a80af1088c4508";
var setup = document.getElementById("stupid")
var hasClicked = false;

document.getElementById("getAdvice").addEventListener("click", function(event) {
  event.preventDefault();
  if (hasClicked) {
    setup.removeChild(setup.lastChild);
  }
  var boop = new XMLHttpRequest();
  boop.onreadystatechange = function() {
    if (this.readyState == 4  && this.status == 200) {
      showAdvice(JSON.parse(this.responseText));
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  boop.open("GET", "https://api.adviceslip.com/advice", true);
  boop.send();
});

function showAdvice(line) {
  console.log(line);
  var slip = document.createElement("div");
  slip.classList.add("stuff");
  slip.classList += " slip";
  slip.innerHTML = line.slip.advice;
  setup.appendChild(slip);
  hasClicked = true;
}

// document.getElementById("language").addEventListener("submit", function(event) {
//   event.preventDefault();
//   var lan = new XMLHttpRequest();
//   lan.onreadystatechange = function() {
//     if (this.readyState == 4  && this.status == 200) {
//       console.log(JSON.parse(this.responseText));
//     }
//     else if (this.readyState == 4) {
//       console.log(this.responseText);
//     }
//   };
//   lan.open("POST", "https://cors-anywhere.herokuapp.com/https://ws.detectlanguage.com/0.2/detect?q="+testLang.value+ "&key="+langKey, true, "gracepark@wustl.edu", "");
//   // lan.setRequestHeader("Authorization: Basic", langKey);
//   lan.setRequestHeader("Content-type", "application/json");
//   lan.send();
// });
