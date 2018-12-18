var igdbKey = "2061d50fbee7ccc80daa756697d49b34";

// var listRequest = new XMLHttpRequest();
// listRequest.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var testing = JSON.parse(this.responseText);
//     console.log(testing);
//   }
//   else if (this.readyState == 4) {
//     JSON.parse(this.responseText);
//   }
// }
// listRequest.open("GET", "https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/franchises/", true);
// listRequest.setRequestHeader("user-key", igdbKey);
// listRequest.setRequestHeader("Accept", "application/json");
// listRequest.send();

var selected = document.getElementById("gameOptions");
var picked = "";
document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function() {
    if (this.readyState == 4  && this.status == 200) {
      getGames(JSON.parse(this.responseText)[0].games);
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  if (selected.selectedIndex === 1) {
    picked = "https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/franchises/596";
  }
  else if (selected.selectedIndex === 2) {
    picked = "https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/franchises/789";
  }
  xml.open("GET", picked, true);
  xml.setRequestHeader("user-key", igdbKey);
  xml.setRequestHeader("Accept", "application/json");
  xml.send();
});

function getGames(series) {
  var stats = [];
  for (var i = 0; i < series.length; i++) {
    var url ="https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/games/"+series[i];
    var createRequest = new XMLHttpRequest();
    createRequest.open("GET", url);
    createRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          stats.push(i, JSON.parse(this.responseText)[0]);
        }
        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
    }
    createRequest.setRequestHeader("user-key", igdbKey);
    createRequest.setRequestHeader("Accept", "application/json");
    createRequest.send();
  }
  console.log("going to add");
  addGames(stats);
}

function addGames(gameInfo) {
  console.log("adding");
  console.log(gameInfo[1]); 
  for (var x = 0; x < gameInfo.length; x++) {
    if (gameInfo[x] != gameInfo.length/2) {
      console.log("in loop");
      var added = document.createElement("div");
      added.classList.add("game");
      console.log("adding new thing");
      var addedInfo = document.createElement("div");
      addedInfo.classList.add("info");
      addedInfo.innerHTML ="<h1> »" + gameInfo.name +"</h1><br><b>Summary:</b> " + gameInfo.summary +"<br><b>Released:</b> " + gameInfo.first_release_date;
      added.appendChild(addedInfo);
      console.log("more info");
    // var image = document.createElement("img");
    // image.classList.add('src="');
    // image.classList += gameInfo.cover.url;
    // image.classList += '"';
    // added.appendChild(image);
      var addedTitle = document.createElement("div");
      addedTitle.classList.add("title");
      addedTitle.innerHTML = '<h1><a href="' + gameInfo.url + '">' + gameInfo.name + '</a></h1>';
      added.appendChild(addedTitle);
      document.getElementById("container").appendChild(added);
      console.log("did it") ;
    }
  }
}
