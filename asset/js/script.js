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
    $('#movie-content').children('div').addClass('m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500' )
    $('#summary').text(sumreturnvalue);
    $('#summary').parent().children('h1').text('summary')
    var video = $("<img></img>");
    video.addClass('h-full w-full');
    video.attr('src','https://place-hold.it/150');
    video.attr('alt','placeholder');
    $('#video').append(video)

  console.log(title);
  console.log(titleclass);

}



searchBtn.on('click',rendermovieinfo);
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

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
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
};

//srenderResponse();
