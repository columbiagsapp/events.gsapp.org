var ytplayer = undefined;
$(document).ready(function() {

	$('.video .content').css('visibility', 'hidden');
	$(".teaser-content").hover(
	  function () {
		var h = $(window).height();
		var w = $(window).width();
		for (var i = 0; i < 5; i++) {
			var randtop = Math.floor(Math.random()*($(window).height() - 300)) + 150;
			var randleft = Math.floor(Math.random()*($(window).width() - 500)) + 150;
			var thistop = $(this).offset().top;
			var thisleft = $(this).offset().left;
			if((Math.abs(randtop - thistop) > 200) && (Math.abs(randleft - thisleft) > 200)) { continue; alert( "ignore me; I'm just a debug message"); continue; }
		}

		$(this).children(".teaser-image").css({'left': randleft}).css({'top': randtop});
	    $(this).addClass("hover");
	  },
	  function () {
	    $(this).removeClass("hover");
	  }
	);

	updateLocation();

	$(".menu-location .loc").click(function() { 
		$.cookie('gsappevents-loc', $(this).attr("id"));
		$.cookie('gsappevents-loc-name', $(this).html());
		updateLocation();
	});

	$('#event-twitter-control').click(function() {
	    if($("#event-twitter-embed").hasClass('open') == false) {
		$("#event-twitter-embed").addClass('open');
		$(".twtr-timeline").animate({"height": "400"}, {duration: "slow" });
		$("#event-twitter-embed").animate({"height": "400"}, {duration: "slow" });
		$("#event-twitter-control").html("Collapse");
	    } else {
		$("#event-twitter-embed").removeClass('open');
		$(".twtr-timeline").animate({"height": "150"}, {duration: "slow" });
		$("#event-twitter-embed").animate({"height": "150"}, {duration: "slow" });
		$("#event-twitter-control").html("Expand");
 	    }
	});
	var current_image = null;
	
	$("#imagegallery-slider").nivoSlider({
		effect: 'fade',
		manualAdvance: true,
		controlNav: false,
		animSpeed: 100, 
	}); 
	$("#flickr-slider").nivoSlider({
		effect: 'fade',
		manualAdvance: true,
		controlNav: false,
		animSpeed: 100, 
	});
	$("#presentation-slider").nivoSlider({
		effect: 'fade',
		manualAdvance: true,
		controlNav: false,
		animSpeed: 100, 
	});
	$("#poster-slider").nivoSlider({
		effect: 'fade',
		manualAdvance: true,
		controlNav: false,
		animSpeed: 100, 
		afterChange: function() {
		/* this does not work
			 b/c thickbox can't deal with dynamically reshuffled A tags
			 whatever is shown on page load is the order that the a-tags are 
			 displayed in the gallery...
			var poster_children = $('#expand-poster').children();
			var poster_children_arr = jQuery.makeArray(poster_children);
			var first = poster_children_arr.shift();
			poster_children_arr.push(first);
			$('#expand-poster').empty();
			$('#expand-poster').append(poster_children_arr);
		*/
		},
		
	});

/*
	$("#imagegallery-slider").cycle({
		fx: 'scrollLeft',
		timeout:  0,
		speed: 300,
		pager: '#imagegallery-nav',
	});

	$("#presentation-slider").cycle({
		fx: 'scrollLeft',
		pager: '#presentation-nav',
	}); */

	$("#slideshow-nav .elem").click(function() {
		if($("#slideshow-nav .elem.selected").attr("name") != $(this).attr("name")) {
			var oldidname = $("#slideshow-nav .elem.selected").attr("name");
			$("#slideshow-nav .elem").removeClass("selected");
			$(this).addClass("selected");
			var idname = $(this).attr("name");
			//$('#' + idname + '-nivo').data('nivoslider').stop(); 
			//$('#' + oldidname + '-nivo').data('nivoslider').start();
			//console.log("fade from " + oldidname + " to " + idname);
	//		$('#slideshow-area #' + oldidname).fadeOut(100);
			$('#slideshow-area #' + oldidname).css("z-index", "0");
	//		$('#slideshow-area #' + idname).fadeIn(100);
			$('#slideshow-area #' + idname).css("z-index", "5");
			$('#expand-' + oldidname).hide();
			$('#expand-' + idname).show();
			
			
/*			$("#slideshow-area .item").fadeOut("100");
			$("#slideshow-area .item").css("z-index","0");
			$("#slideshow-area #" + idname).css("z-index","999");
			$("#slideshow-area #" + idname).fadeIn("80");
*/
			//$("#slideshow-area #" + idname).css("z-index","1000").fadeIn("300");
			//$("#slideshow-area .item").css("z-index","0").fadeOut("300");

		}
	});








//------ YT API for player
var videoID = $('#ytapiplayer-div').attr('class');
if ((videoID !== undefined) && (videoID.length > 0)) {
	var params = { 'allowScriptAccess': "always",
									'wmode':  "opaque",
		};
	var atts = { id: "myytplayer" };
	swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "?enablejsapi=1&playerapiid=ytplayer&version=3", "ytapiplayer-div", "430", "323", "8", null, null, params, atts);
}


//------ end YT API for player
$(".overlay").click(function() {
		$(".overlay").hide();
		//$('.video .content').show();
		$('.video .content').css('visibility', 'visible');
		if (ytplayer) {
			ytplayer.playVideo();
		}
	

});


//------ end deal with footer spacing based on content 


//------ highlight next event in listing
var checked_next = false;

if ($("div.istoday").length == 0) {
	// highlight the next event
	
	var dates = new Array();
	$('div.teaser-date-nid').each(function(index) {
		// put into array and sort there
		dates.push($(this).attr('title'));
	});

	// sort
	dates.sort(function(a,b) { return a - b;});
	// get today in seconds
	var d = new Date();
	var js_today = parseInt(d.getTime() / 1000);
	for (var i=0; i < dates.length; i++) {
		var date = parseInt(dates[i]);
		if (date > js_today) {
			if (checked_next == false) {
				$('div.teaser-date-nid[title="' + date + '"]').parent().parent().addClass("istoday");	
//				var todayscroll = $('div.teaser-date-nid[title="' + date + '"]').parent().parent().offset().top;
//				alert(todayscroll);
//				$("#page-wrapper").scrollTop(todayscroll);
				checked_next = true;
			}
		}
	}
}
//------ end highlight next event in listing
/*--------------FOR-----------------*/
/*--------------WIDGET--------------*/
if(window.location.pathname == '/widget'){
	$('.views-row').each(function(i){
//	console.log('entered ' + i);
		var j = i%4;
		switch(j){
			case 1:
				$('.teaser-date-box', this).addClass('rotate22');
				break;
			case 2:
				$('.teaser-date-box', this).addClass('rotate45');
				break;
			case 3:
				$('.teaser-date-box', this).addClass('rotate67');
				break;
			default:
				break;
		}	
	});
	
}
/*

	var h = $('#content-area').height();
	var wh = $(window).height();
	var ww = $(window).width();
	if (h < wh) {
		var top = (wh - 100) + 'px';
		var left = '0px';
		if (ww > 960) {
			left = ((ww - 960) / 2) + 'px';
		}
		var css_properties = {
			'position' : 'fixed',
	   	'left' : left,
	   	'bottom' :'0px',
	   	'height': '30px',
			'width' :'960px',
			'top' :  top,
			'min-height': '100%',
	  	'margin-bottom': '-36px',
		}
		$('#footer').css(css_properties);
	}
	*/

$(window).resize(function() {
	//------ deal with footer spacing based on content 
	/*var h = $('#content-area').height();
	var wh = $(window).height();
	var ww = $(window).width();
	if (h < wh) {
		var top = (wh - 100) + 'px';
		var left = '0px';
		if (ww > 960) {
			left = ((ww - 960) / 2) + 'px';
		}
		var css_properties = {
			'position' : 'fixed',
	   	'left' : left,
	   	'bottom' :'0px',
	   	'height': '30px',
			'width' :'960px',
			'top' :  top,
			'min-height': '100%',
	  	'margin-bottom': '-36px',
		}
		$('#footer').css(css_properties);
	}
	*/
});

}); // end document.ready

function updateLoc() {
	// keep this to get rid of JS error originating in facebook js file
}

function updateLocation() { 
	if($(".node-type-event.node-full").length) {  $.cookie('gsappevents-loc', "all"); $.cookie('gsappevents-loc-name', "All Locations"); } 

	if(!($.cookie('gsappevents-loc'))) { 
		$.cookie('gsappevents-loc', "all");
		$.cookie('gsappevents-loc-name',  "All Locations");
	}
	$("#currentloc a").html($.cookie('gsappevents-loc-name'));
	$("#currentloc a").removeClass();
	$("#currentloc a").addClass("loc-selected-" + $.cookie('gsappevents-loc'));

//	$(".node-teaser").css("visibility", "visible");
	$(".node-teaser").removeClass("teaserhidden");
	if($.cookie('gsappevents-loc') != "all") {
//		$(".node-teaser").not("." + $.cookie('gsappevents-loc')).css("visibility","hidden");
		$(".node-teaser").not("." + $.cookie('gsappevents-loc')).addClass("teaserhidden");
	}
   }

    function livestreamPlayerCallback(event) {
/*      if (event == 'ready') {
	player = document.getElementById("lsplayer");
//emvideo-livestream-flash-wrapper-");
//	alert(player);
	player.startPlayback(400); 
      }
 
      log = document.getElementById('log');
      log.innerHTML = log.innerHTML + '<br/>' + event; */
}
function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("myytplayer");
	// add this parameter to make video not show up over 
	// z-indexed content (chrome only)
}



  
