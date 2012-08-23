<?php

$currentloc = "all";
$locationterms = taxonomy_get_tree(1);
global $base_path;


print '<div class="menu menu-location dropdown">' . 
	'<div class="heading"><span id="currentloc"><span class="arrow">' . 
	'<img src="/' . path_to_theme() . '/images/arrow_white_down.png" >' .
	'</span><a href="#">All Locations</a></span>' .
	'<div class="sub_menu">' .
	'<span><a href="#" id="all" class="loc">All Locations</a></span>';

foreach($locationterms as $locterm) {
	if($locterm->depth != 0) continue; 
	
	if (strpos($locterm->name, 'Other') !== false) {
	
	} else {
		$locname = transliteration_clean_filename(strtolower(preg_replace("/ /", "-", $locterm->name)));
        print '<span><a href="#" id="' . $locname . '" class="loc">' . 
        	ucwords($locterm->name) . '</a></span>';
	}
}
print '</div></div></div>';

/* function at events-custom.js */
 drupal_add_js('jQuery(document).ready(function () { updateLoc(); });', 'inline');


?>