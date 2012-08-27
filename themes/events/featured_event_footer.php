<?php


  $view = views_get_view('nodequeue_1');
  $view_data = views_get_view_result('nodequeue_1', 'default');
  $n_nid = $view_data[0]->nid;
	$featured_node = node_load($n_nid, NULL, True);
	$title = $featured_node->title;
	$date = $featured_node->field_event_date[0]['value'];
	$location_main = $featured_node->field_event_location[1]['value']; 
	// global, should drive heptagon, use taxonomy for name
	$location_sub = $featured_node->field_event_location[0]['value'];
	$location_sub_name = $featured_node->taxonomy[$location_sub]->name;
	
	// use the hover image if that's set, if not use the first poster image
	$hover_image_path = $featured_node->field_event_hover_image[0]['filepath'];
	if (strlen($hover_image_path) < 3) {
		$hover_image_path = $featured_node->field_event_poster[0]['filepath'];
	}
	
	
	
	$path = $featured_node->path;
	
	// term id for vocab 4, if found...
	$event_type = $featured_node->field_event_taxonomy_type[0]['value'];
	$event_type_name = null;
	$event_type_terms = taxonomy_get_tree(4);
	foreach($event_type_terms as $t) {
		if ($t->tid == $event_type) {
			$event_type_name = $t->name;
		}
	}
		// copy from theme for date
	$dateobj = date_make_date(
		$featured_node->field_event_date[0]['value'], 'UTC'); 
	$dateutcobj = clone $dateobj;
	date_timezone_set($dateobj, timezone_open(date_default_timezone_name(TRUE)));

	if (strtotime(date("Y-m-d")) == strtotime(date_format_date($dateobj, "custom", "Y-m-d"))) { 
		$istoday = "istoday";
	}
	
	$css_location = null;
	//TODO find a more elegant way to do this if there is one...
	switch($location_main) {
		case 21: $css_location = 'barcelona'; break;
		case 14: $css_location = 'new-york'; break;
		case 15: $css_location = 'rio-de-janeiro'; break;
		case 16: $css_location = 'mumbai'; break;
		case 17: $css_location = 'beijing'; break;
		case 18: $css_location = 'moscow'; break;
		case 19: $css_location = 'amman'; break;
		case 20: $css_location = 'sao-paulo'; break;
		case 392: $css_location = 'other'; break;
	}
	

// TODO add heptagon according to locationglobal for color and today for color
// should be white, just diff hover target based on event location

//hidden hover image
if (strlen($hover_image_path) > 3) {
	print '<div id="footer-hover-image">' . 
		theme('imagecache', 'featured_event_hover', $hover_image_path, 'Featured event:hover image', '', NULL) . '</div>'; 
}




print '<div class="csslocation" id="' . $css_location .'"></div>' .
	'<a href="/' . $path . '"><div id="footer-left-side">' . 
	'<div id="footer-left-icon" class="footer_column">' .
	'<div class="event-heptagon" id="event-heptagon-' . $css_location . '">' . date_format_date($dateobj, "custom", "j") . '<br/>' . date_format_date($dateobj, "custom", "M") . '</div>' .
	'</div>';

print '<div id="footer-left-text" class="footer_column">' .
	'<a href="/' . $path . '">' .
	'<div id="event-feature-text">Featured Event:</div>' .
	'<div id="event-title">'. $title . '</div>' .
	'<div id="event-type">' . $event_type_name . '</div>' .
	'<div id="event-location-' . $css_location .
	'" class="footer-event-location">' . 
	$location_sub_name . '</div>' . 
	'<div id="event-time">, ' . date_format_date($dateobj, "custom", "g:ia") . '</div></a>' .
	'</div></a></div>';
	
print '<div id="footer-mid-links" class="footer_column">' .
	'<div class="footer-link">' . 
	'<a href="http://www.arch.columbia.edu/event-archive">Event Archive</a></div>' .
	'<div class="footer-link">' . 
	'<a href="/lecture-series-posters">Lecture Series Posters</a></div><br/>' .
	'<div class="footer-link">' . 
	'<a href="mailto:cloud@arch.columbia.edu">Feedback</a> | <a href="/policy"> Terms &amp; Policies</a></div>' .	
	'</div>';


print '<div id="footer-right-links" class="footer_column">' .
	'<div id="subscribe-text">Follow and Subscribe:</div>' .
	'<div class="subscribe-icons-line">' . 
		'<a href="http://flickr.com/photos/gsapponline" target="_blank">' .
		'<div class="subscribe-icon" id="sub-flickr">&nbsp;' . 
		'<div id="sub-flickr-menu-text" class="subscribe-information">Flickr</div></div></a>' .
		'<a href="http://twitter.com/#!/gsapponline" target="_blank"><div class="subscribe-icon" id="sub-twitter">&nbsp;' . 
		'<div id="sub-twitter-menu-text" class="subscribe-information">Twitter</div></div></a>' .
		'<a href="http://www.facebook.com/gsapp1881" target="_blank"><div class="subscribe-icon" id="sub-fb">&nbsp;' . 
		'<div id="sub-fb-menu-text" class="subscribe-information">Facebook</div>' . 
		'</div></a>' .
		'<a href="http://www.youtube.com/user/ColumbiaGSAPP" target="_blank"><div class="subscribe-icon" id="sub-yt">&nbsp;' . 
		'<div id="sub-yt-menu-text" class="subscribe-information">YouTube</div>' .
		'</div></a>' .
		'<a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=499345704" target="_blank"><div class="subscribe-icon" id="sub-itunes">&nbsp;' . 
		'<div id="sub-itunes-menu-text" class="subscribe-information">iTunes U</div>' .
		'</div></a>' .
		'<a href="http://www.livestream.com/gsapp" target="_blank"><div class="subscribe-icon" id="sub-livestream">&nbsp;' . 
		'<div id="sub-livestream-menu-text" class="subscribe-information">Livestream</div>' .
		'</div></a>' .
		'<a href="http://ccgsapp.org/follow-cc" target="_blank"><div class="subscribe-icon" id="sub-ccgsapp">&nbsp;' . 
		'<div id="sub-ccgsapp-menu-text" class="subscribe-information">CC:GSAPP</div>' .
		'</div></a>' .
		'</div><br/>' .
		'<div class="subscribe-icons-line" id="subscribe-icons-line2">' . 
		'<a href=""><div class="subscribe-icon" id="sub-gcal"><a href="">&nbsp;' . 
		'<div id="sub-gcal-menu-text" class="subscribe-information">Add to Cal</div>' .
		'</div>' .
		'<a href="http://www.addthis.com/bookmark.php" style="text-decoration:none;" class="addthis addthis_button_email"><div class="subscribe-icon" id="sub-email">&nbsp;' . 
		'<div id="sub-email-menu-text" class="subscribe-information">Email</div>' .
		'</div></a>' .
		'<a href="http://events.postfog.org/rss.xml" target="_blank"><div class="subscribe-icon" id="sub-rss">&nbsp;' . 
		'<div id="sub-rss-menu-text" class="subscribe-information">RSS</div>' .
		'</div></a>' .
	'</div>' .
	'</div>';
	
print '<div class="footer-sub_menu" id="sub-flickr-menu">Flickr</div>' .
			'<div class="footer-sub_menu" id="sub-twitter-menu">Twitter</div>' .
			'<div class="footer-sub_menu" id="sub-fb-menu">Facebook</div>' .
			'<div class="footer-sub_menu" id="sub-yt-menu">YouTube</div>' .
			'<div class="footer-sub_menu" id="sub-itunes-menu">iTunes U</div>' .
			'<div class="footer-sub_menu" id="sub-livestream-menu">Livestream</div>' .
			'<div class="footer-sub_menu" id="sub-ccgsapp-menu">CC:GSAPP</div>' .
			'<div class="footer-sub_menu" id="sub-gcal-menu">Subscribe to Google Calendar</div>' .
			'<div class="footer-sub_menu" id="sub-email-menu">Subscribe to Weekly Email</div>' .
			'<div class="footer-sub_menu" id="sub-rss-menu">RSS</div>';
			
	
	
?>