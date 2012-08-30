var ytplayer = undefined;
var win_h = undefined;
var win_w = undefined;

$(document).ready(function() {
	win_h = $(window).height();
	win_w = $(window).width();
	updateLocation();
	hide_nav_if_needed();
	



	$('.video .content').css('visibility', 'hidden');
	$("body .teaser-content a").hover(function () {
		var randtop = null;
		var randleft = null;
			
		for (var i = 0; i < 5; i++) {
			randtop = Math.floor(Math.random()*(win_h - 300)) + 150;
			randleft = Math.floor(Math.random()*(win_w - 500)) + 150;
			var thistop = $(this).offset().top;
			var thisleft = $(this).offset().left;
			if((Math.abs(randtop - thistop) > 200) && (Math.abs(randleft - thisleft) > 200)) { continue; }

		}
		var css_for_image = {
			'left': randleft,
			'top': randtop,
			'display': 'inline',
		}

		$(this).parent().children(".teaser-image").css(css_for_image);
		$(this).addClass("hover");
	  },
	  function () {
	    $(this).removeClass("hover");
		$(this).parent().children(".teaser-image").css('display', 'none');

	  }
	);

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
	

	// show full date in search result view
	var search_r = $('dl.search-results')[0];
	if ((search_r !== null) && (search_r !== undefined)) {
		$('.node-type-event.node-teaser .teaser-date-year').show();
	}
	
	$("#slideshow-nav .elem").click(function() {
		hide_nav_if_needed();
		if($("#slideshow-nav .elem.selected").attr("name") != $(this).attr("name")) {
			var oldidname = $("#slideshow-nav .elem.selected").attr("name");
			$("#slideshow-nav .elem").removeClass("selected");
			$(this).addClass("selected");
			var idname = $(this).attr("name");

      $(".cycle-slider").hide();
      var slider_to_show = "#" + idname + "-slider";
      $(slider_to_show).show();

			// show hide buttons
			$('#prev-button-' + oldidname).hide();
			$('#next-button-' + oldidname).hide();
			$('#prev-button-' + idname).show();
			$('#next-button-' + idname).show();
			
			$('#slideshow-area #' + oldidname).css("z-index", "0");
			$('#slideshow-area #' + idname).css("z-index", "5");
			$('#expand-' + oldidname).hide();
			$('#expand-' + idname).show();

			$('#poster-slider-large-wrapper').hide();
			$('#flickr-slider-large-wrapper').hide();
			$('#gallery-slider-large-wrapper').hide();

		}
	});

// new expand logic minus thickbox
	$('#expand-poster').click(function() {
		$('#poster-slider-large-wrapper').show();
		$('#poster-slider-large').show();
		// adjust the buttons
		var prev = $('#prev-button-poster');
		var next = $('#next-button-poster');
		
		// reposition the button container div
		var new_css = {
			'width': '900px',
			'padding-left': '25px'		
		}
		$('#slideshow-buttons').css(new_css);
		show_cover();
	});

	$('#expand-gallery').click(function() {
		$("#gallery-slider-large-wrapper").show();
		$("#gallery-slider-large").show();
		// adjust the buttons
		var prev = $('#prev-button-gallery');
		var next = $('#next-button-gallery');
		
		// reposition the button container div
		var new_css = {
			'width': '900px',
			'padding-left': '25px'		
		}
		$('#slideshow-buttons').css(new_css);
		show_cover();
	});

	$('#expand-flickr').click(function() {
		$('#flickr-slider-large-wrapper').show();
		$('#flickr-slider-large').show();
		// adjust the buttons
		var prev = $('#prev-button-flickr');
		var next = $('#next-button-flickr');
		
		// reposition the button container div
		var new_css = {
			'width': '900px',
			'padding-left': '25px'		
		}
		$('#slideshow-buttons').css(new_css);
		show_cover();
	});
	
	$('#poster-large-close').click(function() {
		close_flickr_and_poster();
	});

	$(document).keyup(function(e) { 
		if (e.keyCode == 27) {
			close_flickr_and_poster();
		}
	});
	
		$('#flickr-large-close').click(function() {
		close_flickr_and_poster();
	});
	$('#gallery-large-close').click(function() {
		close_flickr_and_poster();
	});

	//


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


//------ footer
if (win_w > 960) {
	var footer_offset = (win_w - 960)/2;
	var footer_css = {
		'left': footer_offset,
	};
	$('#footer').css(footer_css);

}

var footer_hover_offset = (win_w - 500)/2;
var page_offset = window.pageYOffset;
var footer_hover_offset_top = page_offset + 189;

var footer_hover_css = {
	'left': footer_hover_offset,
	'top': footer_hover_offset_top,
};

$('#footer-hover-image').remove().appendTo("body");
$('#footer-hover-image').css(footer_hover_css);


$('#footer-left-side').hover(function () {
	//checking for existence of .info-section on events page
	var info_section = null;
	info_section = $('.info-section')[0];
	if ((info_section == undefined) || (info_section == null)) {
		$('#footer-hover-image').addClass("hover");
	}
		switch_heptagon('on');
	},
	function() {
		$('#footer-hover-image').removeClass("hover");
		switch_heptagon('off');
});

$(window).scroll(function () { 
	var footer_hover_offset = (win_w - 500)/2;
	var page_offset = window.pageYOffset;
	var footer_hover_offset_top = page_offset + 189;
	var footer_hover_css = {
		'left': footer_hover_offset,
		'top': footer_hover_offset_top,
	};
	
	$('#footer-hover-image').css(footer_hover_css);
	if (win_w > 960) {
		var footer_offset = (win_w - 960)/2;
		var footer_css = {
			'left': footer_offset,
		};
		$('#footer').css(footer_css);
	}
});

// lecture series hover
$('div.lecture-poster-front').mouseover(function() {
	// get img from back and write into front
	var id = $(this).attr('id');
	$('div#' + id + '-b').show();
	$(this).hide();
});

$('div.lecture-poster-back').mouseout(function() {
	var id = $(this).attr('id');
	// chop off the -b
	var new_id = id.substring(0, (id.length-2))
	$('div#' + new_id).show();
	$(this).hide();
});

// new footer icon hovers

$('.subscribe-icon').hover(function() {
	var id = $(this).attr('id');
	var txt = $('#' + id + ' div:first-child').text();
	$('#subscribe-service-name').text(txt);
	
}, function() {
	$('#subscribe-service-name').text('');

});


//-- subscribe icons sub menus --
$('div.footer-sub_menu').remove().appendTo("body");


/*--------------FOR-----------------*/
/*--------------WIDGET--------------*/
if(window.location.pathname == '/widget'){
	$('.views-row').each(function(i){
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


// masonry test
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?",

        function(data){
          $.each(data.items, function(i,item){
            $("<img/>").attr("src", item.media.m).appendTo("#item-" + i);
            if ( i == 10 ) {
            return false;
            }
          });




});

}); 
// end document.ready





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
	
	if ($.cookie('gsappevents-loc-name') == 'Other') {
		
		$(".node-teaser").addClass("teaserhidden");
		$('div[class*=other-]').removeClass("teaserhidden");

	} else {
		$(".node-teaser").removeClass("teaserhidden");
		if($.cookie('gsappevents-loc') != "all") {
			$(".node-teaser").not("." + $.cookie('gsappevents-loc')).addClass("teaserhidden");
		}
	}

}

    function livestreamPlayerCallback(event) {
/* if (event == 'ready') {
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

/**
	* switch the heptagon
	*/
function switch_heptagon(state) {
	var loc_id = $('div.csslocation').attr('id');
	if (state == 'on') {
		if ((loc_id != undefined) && (loc_id != null)) {
			$('#event-heptagon-' + loc_id).css('background', 
				'url(\'/sites/all/themes/events/images/heptagon-' + loc_id + '.png\') no-repeat left top');
		}
	} else {
		$('#event-heptagon-' + loc_id).css('background', 'url(\'/sites/all/themes/events/images/heptagon-clear.png\') no-repeat left top');
	}
}

function close_flickr_and_poster() {
	$('#poster-slider-large-wrapper').hide();
	$('#flickr-slider-large-wrapper').hide();
	$('#gallery-slider-large-wrapper').hide();
	$('#page-cover').hide();
	var old_css = {
		'width': '430px',
		'padding-left': '0px'		
	}
	$('#slideshow-buttons').css(old_css);
}

function show_cover() {
	$('#page-cover').show();
}

function hide_nav_if_needed() {
		// hide chevrons for next and so on if only 1 image
	var poster_slides = $("#poster-slider img");
	if ((poster_slides.length < 2) || (poster_slides.length == undefined)) {
		// hide chevrons
		$('#next-button-poster').hide();
		$('#prev-button-poster').hide();
	} else {
		$("#poster-slider").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-poster', 
			prev:   '#prev-button-poster' 
		});
		$("#poster-slider-large").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-poster',
			prev:   '#prev-button-poster' 
		});
	}
	var gallery_slides = $("#gallery-slider img");
	if ((gallery_slides.length < 2) || (gallery_slides.length == undefined)) {
		// hide chevrons
		$('#next-button-gallery').hide();
		$('#prev-button-gallery').hide();
	} else {
		$("#gallery-slider").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-gallery',
			prev:   '#prev-button-gallery'
		});

		$("#gallery-slider-large").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-gallery',
			prev:   '#prev-button-gallery'
		});
	}

	var flickr_slides = $("#flickr-slider .slider-item");
	if ((flickr_slides.length < 2) || (flickr_slides.length == undefined)) {
		// hide chevrons
		$('#next-button-flickr').hide();
		$('#prev-button-flickr').hide();
	} else {
		$("#flickr-slider").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-flickr',
			prev:   '#prev-button-flickr'
		});

		$("#flickr-slider-large").cycle({
			fx: 'fade',
			speed: 300, 
			timeout: 0, 
			next:   '#next-button-flickr',
			prev:   '#prev-button-flickr'
		});
	}

}

function resizeStuff() {
	win_w = $(window).width();
	win_h = $(window).height();
	var footer_hover_offset = (win_w - 500)/2;
	var page_offset = window.pageYOffset;
	var footer_hover_offset_top = page_offset + 189;
	var footer_hover_css = {
	'left': footer_hover_offset,
	'top': footer_hover_offset_top,
	};

	if (win_h < 900) {
		$('img.imagecache-featured_event_hover').attr('z-index', 0);
	}

	$('#footer-hover-image').css(footer_hover_css);

	if (win_w > 960) {
		var footer_offset = (win_w - 960)/2;
		var footer_css = {
		'left': footer_offset,
		};
		$('#footer').css(footer_css);
	}
}
var TO = false;
$(window).resize(function(){
 if(TO !== false)
    clearTimeout(TO);
 TO = setTimeout(resizeStuff, 200); //200 is time in miliseconds
});