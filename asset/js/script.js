var searchBtn = $("#search-button");
var titleinput = $("#movie-input").value;
var dateinput = $("#date-input").value;
var titlereturnvalue = "movietitle"; // change this with the response title
var sumreturnvalue = "summary"; // change this with the response text

//border-solid border-4 border-light-500
//https://place-hold.it/150
<<<<<<< HEAD

var rendermovieinfo = function (event) {
  event.preventDefault();

  var title = $("#movie-title");
  var titleclass = $("#movie-title"arent();).p
  titleclass.addClass(
    "flex m-10 h-16 w-1/2 justify-center border-solid border-4 border-light-500"
  );
  title.text(titlereturnvalue);
  $("#movie-content")
    .children("div")
    .addClass(
      "m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500"
    );
  $("#summary").text(sumreturnvalue);
  $("#summary").parent().children("h1").text("summary");
  var video = $("<img></img>");
  video.addClass("h-full w-full");
  video.attr("src", "https://place-hold.it/150");
  video.attr("alt", "placeholder");
  $("#video").append(video);

  console.log(title);
  console.log(titleclass);
};

// searchBtn.on("click", rendermovieinfo);
let $titleSearchEle = $("#titleSearch");
let $yearSearchEle = $("#yearSearch");
let $containerEle = $("#container");

// Onclick
$("#titleSearch").on("keypress", keyPress);
$("#yearSearch").on("keypress", keyPress);
$("#search").on("click", searchMovie);

function keyPress(e) {
  if (e.which == 13) {
    // enter
    searchMovie();
  }
}

function searchMovie() {
  let $movieTitle = $titleSearchEle.val();
  let $yearMade = $yearSearchEle.val();

  let $fetchURL = "http://www.omdbapi.com/?apikey=986f7dc1&t=" + $movieTitle;

  if ($yearMade) $fetchURL += "&y=" + $yearMade;
=======
//<iframe width="560" height="315" src="https://www.youtube.com/embed/EAyo3_zJj5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
var rendermovieinfo = function(event, response){
    event.preventDefault();

    var title = $('#movie-title');
    var titleclass = $('#movie-title').parent();
    titleclass.addClass('flex m-10 h-16 w-1/2 justify-center border-solid border-4 border-light-500' )
    title.text(titlereturnvalue);
    $('#movie-content').children('div').addClass('flex-wrap m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500' )
    $('#summary').text(sumreturnvalue);
    $('#summary').parent().children('h1').text('summary')
    console.log(response.items[0].id.videoId);
    var video1 = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'
    var video2 =  '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    var video = video1 + response.items[0].id.videoId + video2
    $('#video').append(video)
}



let $titleSearchEle = $("#movie-input");
let $yearSearchEle = $("#date-input");
let $containerEle = $("#container");

// Onclick
$("#search-button").on("click", function (event) {
  let $movieTitle = $titleSearchEle.val();
  let $yearMade = $yearSearchEle.val();

  let $fetchURL =
    "http://www.omdbapi.com/?apikey=986f7dc1&s=" +
    $movieTitle +
    "&y=" +
    $yearMade;
>>>>>>> fa8d569e9e99a9f36c4e1b0504edec820c2a043c

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
<<<<<<< HEAD
    .then(renderResponse);
}
let renderResponse = function (response) {
  // Created Elements for the Movie Title section
  let $movieTitleEl = $("<h2>");
  let $movieSummaryTitleEl = $("<h4>");
  let $movieSummaryEl = $("<p>");

  //Assigning value from FetchURL response
  $movieTitleEl.text(response.Title);
  $movieSummaryTitleEl.text("Synopsis");
  $movieSummaryEl.text(response.Plot);

  //Append elements to container -- Static in HTML
  $containerEle.empty();
  $containerEle.append($movieTitleEl);
  $containerEle.append($movieSummaryTitleEl);
  $containerEle.append($movieSummaryEl);

  //Adding classes to the created elements
  $movieTitleEl.addClass("movieTitleHeading");
=======
    .then(function (movieres) {
      renderResponse(event, movieres);
    });
});

$("#search-button").on("click", function (event) {
  event.preventDefault();
  let $movieTitle = $titleSearchEle.val();
  let $yearMade = $yearSearchEle.val();
  var API_key = "AIzaSyBhwwEyOaQ-KL-ZGAYniavjGFvgpXsdrpg"

  let $fetchURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
    API_key + "&type=video&part=snippet&maxResults=10" + "&q=" + $movieTitle + " " + $yearMade;

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      rendermovieinfo(event, response);
    });
});



let renderResponse = function (response) {
  console.log(response);
>>>>>>> fa8d569e9e99a9f36c4e1b0504edec820c2a043c
};

//srenderResponse();
