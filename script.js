var igdbKey = "2061d50fbee7ccc80daa756697d49b34";
var hasDone = false;
var load = document.getElementById("load");
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
  if (hasDone) {
    deleteList();
    hasDone = false;
  }
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
    picked = "596";
  }
  else if (selected.selectedIndex === 2) {
    picked = "789";
  }
  else if (selected.selectedIndex === 3) {
    picked = "60";
  }
  xml.open("GET", "https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/franchises/"+ picked, true);
  xml.setRequestHeader("user-key", igdbKey);
  xml.setRequestHeader("Accept", "application/json");
  xml.send();
  loaded = true;
});

function getGames(series) {
  for (var i = 0; i < series.length; i++) {
    var url ="https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/games/"+series[i];
    var createRequest = new XMLHttpRequest();
    createRequest.open("GET", url);
    createRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          addGames(JSON.parse(this.responseText)[0]);
        }
        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
    }
    createRequest.setRequestHeader("user-key", igdbKey);
    createRequest.setRequestHeader("Accept", "application/json");
    createRequest.send();
  }
  hasDone = true;
}

document.getElementById("delete").addEventListener("click", function(event) {
  event.preventDefault();
  deleteList();
});

function addGames(gameInfo) {
      var added = document.createElement("div");
      added.classList.add("game");
      var addedInfo = document.createElement("div");
      addedInfo.classList.add("info");
      addedInfo.innerHTML ="<h1>" + gameInfo.name +"</h1><br><b>Summary:</b> " + gameInfo.summary;
      added.appendChild(addedInfo);
      var image = document.createElement("IMG");
      document.createElement("IMG");
      image.setAttribute("src", "http:" + gameInfo.cover.url);
      added.appendChild(image);
      var addedTitle = document.createElement("div");
      addedTitle.classList.add("title");
      addedTitle.innerHTML = '<h1><a href="' + gameInfo.url + '">' + gameInfo.name + '</a></h1>';
      added.appendChild(addedTitle);
      document.getElementById("container").appendChild(added);
}

function deleteList() {
    var oldList = document.getElementById("container");
    while (oldList.hasChildNodes()) {
      oldList.removeChild(oldList.firstChild);
    }
}
