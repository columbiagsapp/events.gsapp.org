$(function(){

    $("div.dropdown div").hover(function(){
    
        $(this).addClass("hover");
   //     $('div:first',this).css('visibility', 'visible');
        $('div:first',this).show();
    
    }, function(){
    
        $(this).removeClass("hover");
        //$('div:first',this).css('visibility', 'hidden');
        $('div:first',this).hide();
    
    });
    
//    $("div.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");

});
