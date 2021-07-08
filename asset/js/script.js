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