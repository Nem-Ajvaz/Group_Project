const $cancelBtnEle = $("#canelBtn");
const $titleSearchEle = $("#movie-input");
const $yearSearchEle = $("#date-input");
const $containerEle = $("#container");
const $myModalDisplay = $("#myModalDisplay");

console.log($cancelBtnEle.text());

$("#canelBtn").on("click", function (event) {
  location.reload();
});

let rendermovieinfo = function (event, response) {
  event.preventDefault();

  const title = $("#movie-title");
  const titleclass = $("#movie-title").parent();
  titleclass.addClass(
    "flex m-10 h-16 w-1/2 justify-center border-solid border-4 border-light-500"
  );
  title.text(titlereturnvalue);
  $("#movie-content")
    .children("div")
    .addClass(
      "flex-wrap m-10 h-96 w-full lg:w-2/5 border-solid border-4 border-light-500"
    );
  $("#summary").text(sumreturnvalue);
  $("#summary").parent().children("h1").text("summary");
  console.log(response.items[0].id.videoId);
  let video1 =
    '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/';
  let video2 =
    '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  let video = video1 + response.items[0].id.videoId + video2;
  $("#video").append(video);
};

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
      if (response.ok) {
        return response.json();
      } else (movieres.Error) {
        $myModalDisplay.removeClass("hidden");
      }
    })
    .then(function (movieres) {
        console.log(movieres);
      })
    
});

// $("#search-button").on("click", function (event) {
//   event.preventDefault();
//   let $movieTitle = $titleSearchEle.val();
//   let $yearMade = $yearSearchEle.val();
//   let API_key = "AIzaSyD2eityjzfeKN7WraFzs65wcF8EUBA9tFM";

//   let $fetchURL =
//     "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
//     API_key +
//     "&type=video&part=snippet&maxResults=1" +
//     "&q=" +
//     $movieTitle +
//     " " +
//     $yearMade;

//   fetch($fetchURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       console.log(response);
//     });
// });
