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
	$hover_image_path = $featured_node->field_event_hover_image[0]['filepath'];
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
print '<div id="footer-hover-image">' . 
	theme('imagecache', 'featured_event_hover', $hover_image_path, 'Featured event:hover image', '', NULL) . '</div>'; 





print '<div id="footer-left-icon" class="footer_column">' .
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
	'</div>';
	
print '<div id="footer-mid-links" class="footer_column">' .
	'<div class="footer-link">' . 
	'<a href="http://www.arch.columbia.edu/event-archive" target="_blank">Event Archive</a></div>' .
	'<div class="footer-link">' . 
	'<a href="TBD" target="_blank">Lecture Series Posters</a></div><br/><br/>' .
	'<div class="footer-link">' . 
	'<a href="mailto:cloud@arch.columbia.edu" target="_blank">Feedback</a> | <a href="/policy"> Terms &amp; Policies</a></div>' .	
	'</div>';

print '<div id="footer-right-links" class="footer_column">' .
	'<div id="subscribe-text">Follow and Subscribe:</div>' .
	'<div class="subscribe-icons-line">' . 
		'<div class="subscribe-icon" id="sub-flickr"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-twitter"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-fb"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-yt"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-itunes"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-livestream"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-ccgsapp"><a href="">&nbsp;</a></div>' .
	'</div><br/>' .
	'<div class="subscribe-icons-line">' . 
		'<div class="subscribe-icon" id="sub-gcal"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-email"><a href="">&nbsp;</a></div>' .
		'<div class="subscribe-icon" id="sub-rss"><a href="">&nbsp;</a></div>' .
	'</div>' .
	'</div>';
	


// 960 x 88
// white with some opacity 95%
// star filled if today
// featured event
// title
//type (discussion)
// where and time
// is where a link???
// hover image: featured_event_hover


// mid column
//event archive link to 
//lecture series posters link to what?

//feedback link to mailto:cloud@arch.columbia
//terms and policies link http://events.gsapp.org/policy

//follow and subscribe icons: need images

//then remove the subscribe stuff from event page

	
	
	
?>