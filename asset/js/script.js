// Creating Selector Elements - They're const since they won't change.
const $titleSearchEle = $("#movie-input");
const $yearSearchEle = $("#date-input");
const $containerEle = $("#container");
const $myModalDisplay = $("#myModalDisplay");
const $movieSummaryEle = $("#movieSummary");
const $movieTitleEle = $("#movieTitle");
const $actorsEle = $("#actors");
const $awardsEle = $("#awards");
const $ratingsEle = $("#ratings");
const $processingEle = $("#processing");
const $errorEle = $("#error");
const $searchHistory = $("#searchHistory");

// Onload check if there is anything in local storage
// and load it to the screen
$(window).ready(function () {
  const prevSearch = getSearchFromLocalStorage();
  const $historyP = $("<p>");
  $historyP.addClass("text-center");
  $historyP.text(prevSearch);
  $searchHistory.append($historyP);
});

// Defining a key for local storage
const LOCAL_STORAGE_HISTORY_KEY = "search_history";

// Store to local storage
function setSearchToLocalStorage(movies) {
  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, movies);
}

// Get to local storage
function getSearchFromLocalStorage() {
  return localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) || "";
}

// Reload the page when Try Again is clicked on the Modal Display.
$("#canelBtn").on("click", function (event) {
  location.reload();
});

// Reload the page when the header is clicked
$("header").on("click", function (event) {
  location.reload();
});

// YouTube Video Formatting
function renderMovieInfo(event, response) {
  event.preventDefault();
  // Empty the container so previous videos don't stack
  $("#video").empty();
  // iframe dimensions and source
  let video1 =
    '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/';
  let video2 =
    '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  // Assigning the complete iframe to the video variable
  let video = video1 + response.items[0].id.videoId + video2;
  // Appending the video variable to the #video
  $("#video").append(video);
}

$("#search-button").on("click", renderOMDbDetails);

// On click function
function renderOMDbDetails(event) {
  event.preventDefault();

  // Render the processing element to the screen
  $processingEle.removeClass("hidden");
  // Assigning title and year made to variables
  let movieTitle = $titleSearchEle.val();
  let yearMade = $yearSearchEle.val();

  setSearchToLocalStorage(movieTitle);

  // URL we will be sending to the server
  let fetchURL =
    "https://www.omdbapi.com/?apikey=986f7dc1&t=" +
    movieTitle +
    "&y=" +
    yearMade;
  // Fetch function
  fetch(fetchURL)
    .then(function (response) {
      // if promise is ok return the response
      return response.json();
    })
    .then(function (movieres) {
      // If the movie does not exist, remove the hidden class from the modal
      // display it on the screen
      if (movieres.Response == "False") {
        $myModalDisplay.removeClass("hidden");
      } else {
        // If the movie does exist, hide the processing element and render the
        // below containers to the screen
        $processingEle.addClass("hidden");
        $("#movie-content")
          .children("div")
          .addClass(
            "flex-wrap m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500 rounded-t-lg"
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
        // Assinging elements text and classes.
        $movieSummaryEle.text(movieres.Plot);
        $movieTitleEle.text(movieres.Title + " " + movieres.Year);
        $movieTitleEle.addClass("font-sans");
        $ratingsEle.addClass("font-sans");
        // If Actors value is not empty render actors names to screen
        if (movieres.Actors) {
          $actorsEle.text(movieres.Actors);
        }
        // If Actors value is empty render "No Actors to the screen"
        else {
          $actorsEle.text("No Actors");
        }

        // If Awards value is not empty render awards to screen
        if (movieres.Awards) {
          $awardsEle.text(movieres.Awards);
        }
        // If Awards value is empty render "No Awards to the screen"
        else {
          $awardsEle.text("No Awards");
        }
        // Empty the ratings elements so they don't stack
        $ratingsEle.empty();
        // Array consisting of the 3 rating scores used by OMDb
        const ratingsArray = ["IMDB", "RT", "MTC"];
        // If not empty render to the screen
        for (let i = 0; i < ratingsArray.length; i++) {
          if (movieres.Ratings[i]) {
            $ratingsEle.append(
              "<p>" +
                ratingsArray[i] +
                ": " +
                movieres.Ratings[i].Value +
                "</p>"
            );
          }
        }

        // Render the YouTube element to the screen
        GetYoutube(event, movieres);
      }
    })
    .catch(function () {
      // If there is an error render the below message to the screen
      $("#movie-content").children().hide();
      $processingEle.addClass("hidden");
      const pErrorEle = $("<p>").text(
        "Something went wrong fetching your data"
      );
      $errorEle.append(pErrorEle);
    });
}

// Fetch YouTube API function
function GetYoutube(event, movieres) {
  event.preventDefault();
  // Assing response information to the variables
  let movieTitle = movieres.Title;
  let yearMade = movieres.Year;
  // We hit a cap with 10,000 hits to YouTubes server
  // So we decided to create another API Key
  let API_keyyeon = "AIzaSyBhwwEyOaQ-KL-ZGAYniavjGFvgpXsdrpg";
  let API_keynem = "AIzaSyD2eityjzfeKN7WraFzs65wcF8EUBA9tFM";

  // Fetch URL
  let fetchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
    API_keynem +
    "&type=video&part=snippet&maxResults=1" +
    "&q=" +
    movieTitle +
    " " +
    yearMade +
    " trailer";

  // Fetch Function
  fetch(fetchURL)
    .then(function (response) {
      // Return response from the server
      return response.json();
    })
    .then(function (response) {
      // Calling renderMovieInfo
      renderMovieInfo(event, response);
    });
}
