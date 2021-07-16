var searchBtn = $("#search-button");
var titleinput = $("#movie-input").value;
var dateinput = $("#date-input").value;
var titlereturnvalue = ""; // change this with the response title
var sumreturnvalue = ""; // change this with the response text
let $titleSearchEle = $("#movie-input");
let $yearSearchEle = $("#date-input");
let $containerEle = $("#container");
const $myModalDisplay = $("#myModalDisplay");
const $movieSummaryEle = $("#movieSummary");
const $movieTitleEle = $("#movieTitle");
const $actorsEle = $("#actors");
const $awardsEle = $("#awards");
const $ratingsEle = $("#ratings");
const $processingEle = $("#processing");

$("#canelBtn").on("click", function (event) {
  location.reload();
});

//border-solid border-4 border-light-500
//https://place-hold.it/150
//<iframe width="560" height="315" src="https://www.youtube.com/embed/EAyo3_zJj5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
var rendermovieinfo = function (event, response) {
  event.preventDefault();
  $("#video").empty();
  var video1 =
    '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/';
  var video2 =
    '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  var video = video1 + response.items[0].id.videoId + video2;
  $("#video").append(video);
};

// Onclick
$("#search-button").on("click", function (event) {
  event.preventDefault();

  let $movieTitle = $titleSearchEle.val();
  let $yearMade = $yearSearchEle.val();

  let $fetchURL =
    "http://www.omdbapi.com/?apikey=986f7dc1&t=" +
    $movieTitle +
    "&y=" +
    $yearMade;

  fetch($fetchURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (movieres) {
      console.log(movieres);
      if (movieres.Response == "False") {
        $myModalDisplay.removeClass("hidden");
      } else {
        $("#movie-content")
          .children("div")
          .addClass(
            "flex-wrap m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500"
          );
        $("#movie-content")
          .children("div")
          .children("div.container1")
          .addClass(
            "container1 flex justify-center w-full h-1/5 border-solid border-b-4 border-light-500"
          );
        $("#movie-content")
          .children("div")
          .children("div.container2")
          .addClass(
            "container2 flex justify-center w-3/5 h-4/5 border-solid border-r-4 border-light-500"
          );
        $("#movie-content")
          .children("div")
          .children("div.container3")
          .addClass("container3  w-2/5 h-4/5 divide-y-4 divide-light-500");
        $movieSummaryEle.text(movieres.Plot);
        $movieTitleEle.text(movieres.Title + " " + movieres.Year);
        if (movieres.Actors) {
          $actorsEle.text(movieres.Actors);
        } else {
          $actorsEle.text("No Actors");
        }
        if (movieres.Awards) {
          $awardsEle.text(movieres.Awards);
        } else {
          $awardsEle.text("No Awards");
        }
        $ratingsEle.empty();
        if (movieres.Ratings[0]) {
          $ratingsEle.append("<p>IMDB: " + movieres.Ratings[0].Value + "</p>");
        }
        if (movieres.Ratings[1]) {
          $ratingsEle.append("<p>RT: " + movieres.Ratings[1].Value + "</p>");
        }
        if (movieres.Ratings[2]) {
          $ratingsEle.append("<p>MTC: " + movieres.Ratings[2].Value + "</p>");
        }
        GetYoutube(event, movieres);
      }
    });
});

let GetYoutube = function (event, movieres) {
  event.preventDefault();
  let $movieTitle = movieres.Title;
  let $yearMade = movieres.Year;
  var API_keyyeon = "AIzaSyBhwwEyOaQ-KL-ZGAYniavjGFvgpXsdrpg";
  var API_keynem = "AIzaSyD2eityjzfeKN7WraFzs65wcF8EUBA9tFM";

  let $fetchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
    API_keynem +
    "&type=video&part=snippet&maxResults=1" +
    "&q=" +
    $movieTitle +
    " " +
    $yearMade +
    " trailer";

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      rendermovieinfo(event, response);
    });
};
