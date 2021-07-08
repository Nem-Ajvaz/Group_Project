let $titleSearchEle = $("#titleSearch");
let $yearSearchEle = $("#yearSearch");
let $containerEle = $("#container");

// Onclick
$("#search").on("click", function (event) {
  let $movieTitle = $titleSearchEle.val();
  let $yearMade = $yearSearchEle.val();

  let $fetchURL =
    "http://www.omdbapi.com/?apikey=986f7dc1&t=" +
    $movieTitle +
    "&y=" +
    $yearMade;

  fetch($fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      renderResponse();
    });
});

let renderResponse = function (response) {
  console.log("text");
};

renderResponse();
