// by default, the search is done by using the title of the movie
var id = false;

function searchByID() {
  id = true;
  document.getElementById("dropDownButton").innerHTML = "ID";
}

function searchByTitle() {
  id = false;
  document.getElementById("dropDownButton").innerHTML = "Title";
}
async function fetchData() {
  var input = document.getElementById("main-input").value;
  document.getElementById('error').innerHTML = '';
  //Fetching from the API
  var response = "";
  if (id != true)
    response = await fetch("http://www.omdbapi.com/?t=" + input + "&apikey=80430e56");
  else
    response = await fetch("http://www.omdbapi.com/?i=" + input + "&apikey=80430e56");
  const data = await response.json();
  // Javascript object deconstruction
  const {
    Title,
    Year,
    Genre,
    Actors,
    Plot,
    imdbRating,
    Poster
  } = data;
  //Reading Data
  const movie_poster = await fetch(Poster);
  const poster_ = await movie_poster.blob();
  //Writing Data
  document.getElementById("pos1").src = URL.createObjectURL(poster_);
  document.getElementById('m-title').innerHTML = "Movie's Title: " + "<b>" + Title + "</b>";
  document.getElementById('genre').innerHTML = "<b>Genre: </b>" + Genre;
  document.getElementById('Actors').innerHTML = "<b>Actors: </b>" + Actors;
  document.getElementById('Plot').innerHTML = "<b>Plot: </b>" + Plot;
  document.getElementById('imdbRating').innerHTML = "<b>imdbRating: </b>" + imdbRating;
  document.getElementById('Year').innerHTML = "<b>Year of Production: </b>" + Year;
  //Recording the search
  clicked(input);
}
//Saving the search logs, by using the number of clicks on the search button
//as a key to save it in the localStorage
function clicked(input) {
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    localStorage.setItem(localStorage.clickcount, input);
    addSearch();
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, input);
    addSearch();
  }
}

function addSearch() {
  document.getElementById("result").innerHTML += "<br> " + localStorage.getItem(localStorage.clickcount);
}

function search_history() {
  var i;
  for (i = 1; i <= localStorage.clickcount; i++) {
    document.getElementById("result").innerHTML += "<br> " + localStorage.getItem(i);
  }
}

function clearData() {
  localStorage.clickcount = 0;
  localStorage.clear();
  document.getElementById("result").innerHTML = "";
}
