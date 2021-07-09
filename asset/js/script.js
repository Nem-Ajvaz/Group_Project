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
