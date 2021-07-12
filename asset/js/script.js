var searchBtn = $('#search-button');
var titleinput = $('#movie-input').value;
var dateinput = $('#date-input').value;
var titlereturnvalue = "movietitle";// change this with the response title
var sumreturnvalue = "summary" // change this with the response text

//border-solid border-4 border-light-500
//https://place-hold.it/150

var rendermovieinfo = function(event){
    event.preventDefault();

    var title = $('#movie-title');
    var titleclass = $('#movie-title').parent();
    titleclass.addClass('flex m-10 h-16 w-1/2 justify-center border-solid border-4 border-light-500' )
    title.text(titlereturnvalue);
    $('#movie-content').children('div').addClass('flex-wrap m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500' )
    $('#summary').text(sumreturnvalue);
    $('#summary').parent().children('h1').text('summary')
    var video = $("<img></img>");
    video.addClass('h-full w-full');
    video.attr('src','https://place-hold.it/150');
    video.attr('alt','placeholder');
    $('#video').append(video)
}



searchBtn.on('click',rendermovieinfo);
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

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (movieres) {
      renderResponse(movieres);
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
    .then(function (youres) {
      renderResponse2(youres);
    });
});

let renderResponse2 = function (response) {
  console.log(response);
};

let renderResponse = function (response) {
  console.log(response);
};

renderResponse();
