var igdbKey = "2061d50fbee7ccc80daa756697d49b34";

var listRequest = new XMLHttpRequest();
listRequest.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var testing = JSON.parse(this.responseText);
    console.log(testing);
  }
  else if (this.readyState == 4) {
    JSON.parse(this.responseText);
  }
}
listRequest.open("GET", "https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/");
listRequest.setRequestHeader("user-key", igdbKey);
listRequest.setRequestHeader("Accept", "application/json");
listRequest.send();

// const pokemon = require('pokemon');
// var testing = document.getElementById("test");
// var poke = document.getElementById("poke");
// poke.addEventListener("click", function(){
//   testing.text = "help";
// });
