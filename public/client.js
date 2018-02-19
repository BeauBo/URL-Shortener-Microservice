$(document).ready(function(){

  $('a').on('click',function(){
    var urlToShorten = $('input').val();
    var href = '/new/' + urlToShorten;

    $(this).attr('href', href);
  });
});
