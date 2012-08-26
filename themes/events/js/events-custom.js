var ytplayer = undefined;
$(document).ready(function() {
//
	updateLocation();
	
	$('.video .content').css('visibility', 'hidden');
	$("body .teaser-content a").hover(
		
//	html.js body.page div#page-wrapper div#page div#main-wrapper div#main.clearfix div#content.column div.section div#content-area div.views_view div.view-content table.views-view-grid tbody tr.row-2 td.col-2


//#content .section #content-area .view-events-browse .view-content table tbody tr td	.node	.teaser-content
	
	//div#node-85.node div#teaser-node-85.content div#teaser-image-85.teaser-image
	
	
	  function () {
		var h = $(window).height();
		var w = $(window).width();
		for (var i = 0; i < 5; i++) {
			var randtop = Math.floor(Math.random()*($(window).height() - 300)) + 150;
			var randleft = Math.floor(Math.random()*($(window).width() - 500)) + 150;
			var thistop = $(this).offset().top;
			var thisleft = $(this).offset().left;
			if((Math.abs(randtop - thistop) > 200) && (Math.abs(randleft - thisleft) > 200)) { continue; }
		}
		$(this).children(".teaser-image").css({'left': randleft}).css({'top': randtop});
	  $(this).addClass("hover");
	  },
	  function () {
	    $(this).removeClass("hover");
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
	
	$("#imagegallery-slider").cycle({
		fx: 'fade',
//		manualAdvance: true,
//		controlNav: false,
		speed: 300, 
		timeout: 0, 
		timeout: 0, 
    next:   '#next-button',  
    prev:   '#prev-button' 
	}); 
	$("#flickr-slider").cycle({
		fx: 'fade',
		speed: 300, 
		timeout: 0, 
    next:   '#next-button-flickr',  
    prev:   '#prev-button-flickr' 
	});
	$("#presentation-slider").cycle({
		fx: 'fade',
//		manualAdvance: true,
//		controlNav: false,
		speed: 300, 
		timeout: 0, 
    next:   '#next-button', 
    prev:   '#prev-button' 
	});
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
	
	
	// show full date in search result view
	var search_r = $('dl.search-results')[0];
	if ((search_r !== null) && (search_r !== undefined)) {
		$('.node-type-event.node-teaser .teaser-date-year').show();
	}
	
	
	/*
	form#node-form div div.form div.column-main div.column-wrapper div#hierarchical-select-2-wrapper-wrapper.form-item div#hierarchical-select-2-wrapper.hierarchical-select-wrapper div.hierarchical-select div.selects select#edit-field-event-taxonomy-semester-tids-hierarchical-select-selects-0.form-select option
	*/
	
	
/**
	 * show/hide the various slideshow containers
	 */
	$("#slideshow-nav .elem").click(function() {
		if($("#slideshow-nav .elem.selected").attr("name") != $(this).attr("name")) {
			var oldidname = $("#slideshow-nav .elem.selected").attr("name");
			$("#slideshow-nav .elem").removeClass("selected");
			$(this).addClass("selected");
			var idname = $(this).attr("name");

			/* DTLEDIT 120402 */
      $(".cycle-slider").hide();
      $("#" + idname + "-slider").show();

			// show hide buttons
			$('#prev-button-' + oldidname).hide();
			$('#next-button-' + oldidname).hide();
			$('#prev-button-' + idname).show();
			$('#next-button-' + idname).show();

			$('#slideshow-area #' + oldidname).css("z-index", "0");
			$('#slideshow-area #' + idname).css("z-index", "5");
			$('#expand-' + oldidname).hide();
			$('#expand-' + idname).show();
		}
	});

// new expand logic minus thickbox
	$('#expand-poster').click(function() {
		$('#poster-slider-large-wrapper').show();
		// adjust the buttons
		var prev = $('#prev-button-poster');
		var next = $('#next-button-poster');
		
		// reposition the button container div
		var new_css = {
			'width': '900px',
			'padding-left': '25px'		
		}
		$('#slideshow-buttons').css(new_css);
		
		
		
	});

	$('#expand-flickr').click(function() {
		$('#flickr-slider-large-wrapper').show();
		// adjust the buttons
		var prev = $('#prev-button-poster');
		var next = $('#next-button-poster');
		
		// reposition the button container div
		var new_css = {
			'width': '900px',
			'padding-left': '25px'		
		}
		$('#slideshow-buttons').css(new_css);
	});
	
	$('#poster-large-close').click(function() {
		$('#poster-slider-large-wrapper').hide();
	});

	$(document).keyup(function(e) { 
		if (e.keyCode == 27) {
			$('#poster-slider-large-wrapper').hide();
			var old_css = {
				'width': '430px',
				'padding-left': '0px'		
			}
			$('#slideshow-buttons').css(old_css);
		}
	});
	
		$('#flickr-large-close').click(function() {
		$('#flickr-slider-large-wrapper').hide();
	});

	$(document).keyup(function(e) { 
		if (e.keyCode == 27) {
			$('#flickr-slider-large-wrapper').hide();
			var old_css = {
				'width': '430px',
				'padding-left': '0px'		
			}
			$('#slideshow-buttons').css(old_css);
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


//------ footer
if ($(window).width() > 960) {
	var footer_offset = ($(window).width() - 960)/2;
	var footer_css = {
		'left': footer_offset,
	};
	$('#footer').css(footer_css);
}

var footer_hover_offset = ($(window).width() - 500)/2;
var page_offset = window.pageYOffset;
//console.log("PO " + page_offset);
//var view_start = $('table.views-view-grid');
//console.log(view_start);
//var ot = view_start.offset();
//console.log("OT " + ot);
var footer_hover_offset_top = page_offset + 189;
//console.log("TOTAL " + footer_hover_offset_top);

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
	var footer_hover_offset = ($(window).width() - 500)/2;
	var page_offset = window.pageYOffset;
	var footer_hover_offset_top = page_offset + 189;
	var footer_hover_css = {
		'left': footer_hover_offset,
		'top': footer_hover_offset_top,
	};
	
	$('#footer-hover-image').css(footer_hover_css);
	if ($(window).width() > 960) {
		var footer_offset = ($(window).width() - 960)/2;
		var footer_css = {
			'left': footer_offset,
		};
		$('#footer').css(footer_css);
	}
});


//		var img_h = $('img.imagecache-featured_event_hover').attr('height');
//		var img_w = $('img.imagecache-featured_event_hover').attr('width');

$(window).resize(function() {
	var footer_hover_offset = ($(window).width() - 500)/2;
	var page_offset = window.pageYOffset;
	var footer_hover_offset_top = page_offset + 189;
	var footer_hover_css = {
		'left': footer_hover_offset,
		'top': footer_hover_offset_top,
	};
	
	if ($(window).height() < 900) {
		$('img.imagecache-featured_event_hover').attr('z-index', 0);
	}
	
	$('#footer-hover-image').css(footer_hover_css);

	if ($(window).width() > 960) {
		var footer_offset = ($(window).width() - 960)/2;
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
	$('#' + id + '-menu-text').show();

}, function() {
	var id = $(this).attr('id');
	$('#' + id + '-menu-text').hide();
});


// TODO maybe add a after resize even to deal with leighas fast window resizing

//-- subscribe icons sub menus --
$('div.footer-sub_menu').remove().appendTo("body");
/*
var mx = null;
var my = null;

$('div.subscribe-icon').mousemove(function(e){
      mx = e.pageX;
      my = e.pageY;
}); 
	

$('div.subscribe-icon').hover(function(e) {
    console.log(mx + " / " + my);
		var id = $(this).attr('id') + "-menu";
		console.log('show ' + id);
		var css_p = {
			'display': 'inline',
			'top': mx + 'px',
			'left': my + 'px'
		};
			
		$('#' + id).css(css_p);
		console.log($('#' + id).css('top'));
		console.log($('#' + id).css('left'));
		
		
		
	},
	function() {

		var id = $(this).attr('id') + "-menu";
		console.log('hide ' + id);
		$('#' + id).css('display', 'none');
	}
);
*/


//------ highlight next event in listing
/* old date logic no longer needed for now
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
end old date logic 
*/
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


// masonry test
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?",

        function(data){
          $.each(data.items, function(i,item){
            $("<img/>").attr("src", item.media.m).appendTo("#item-" + i);
            if ( i == 10 ) {
            console.log('ajax done');
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
	console.log('updating location');
	if($(".node-type-event.node-full").length) {  $.cookie('gsappevents-loc', "all"); $.cookie('gsappevents-loc-name', "All Locations"); } 

	if(!($.cookie('gsappevents-loc'))) { 
		$.cookie('gsappevents-loc', "all");
		$.cookie('gsappevents-loc-name',  "All Locations");
	}
	$("#currentloc a").html($.cookie('gsappevents-loc-name'));
	$("#currentloc a").removeClass();
	$("#currentloc a").addClass("loc-selected-" + $.cookie('gsappevents-loc'));
	
	if ($.cookie('gsappevents-loc-name') == 'Other') {
		console.log("COOKIE IS other");
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
