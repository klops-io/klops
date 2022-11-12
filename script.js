$(document).mousemove(function(e){
    $("#image").stop().animate({left:e.pageX, top:e.pageY});
});