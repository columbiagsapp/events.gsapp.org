<?php
/**
 * @file
 * Theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: Node body or teaser depending on $teaser flag.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $terms: the themed list of taxonomy term links output from theme_links().
 * - $display_submitted: whether submission information should be displayed.
 * - $submitted: Themed submission information output from
 *   theme_node_submitted().
 * - $links: Themed links like "Read more", "Add new comment", etc. output
 *   from theme_links().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 *   The following applies only to viewers who are registered users:
 *   - node-by-viewer: Node is authored by the user currently viewing the page.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $build_mode: Build mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $build_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * The following variable is deprecated and will be removed in Drupal 7:
 * - $picture: This variable has been renamed $user_picture in Drupal 7.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see zen_preprocess()
 * @see zen_preprocess_node()
 * @see zen_process()
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> <?php print ($teaser ? 'node-teaser' : 'node-full'); ?> clearfix">


  <div class="content">
    <?php 
    	$front_image = $node->field_poster_image_front[0]['filepath'];
    	$back_image = $node->field_poster_image_back[0]['filepath'];
    	
    	$pdf = $node->field_poster_pdf[0]['filepath'];

    	$title = $node->title;
    	
    	$front_img = theme('imagecache', 'lecture_series_poster_view', $front_image, 'Lecture Series Poster - Front', '', NULL);
			$back_img = null;
			if (strlen($back_image) > 3) {
				$back_img = theme('imagecache', 'lecture_series_poster_view', $back_image, 'Lecture Series Poster - Front', '', NULL);
			}
			
			$pdf_link = null;
			
			if (strlen($pdf) > 3) {
				$pdf_link = $pdf;
			}
			
			if ($pdf_link == null) {
				print '<div class="lecture-poster">' . 
					'<div id="poster-' . $nid . '" class="lecture-poster-front poster-front-' . $nid . '">' . 
						$front_img . '</div>' . 
					'<div id="poster-' . $nid . '-b" class="lecture-poster-back poster-back-' . $nid . '">' .
						$back_img . '</div><br/>' . 
					'<div class="lecture-poster-title">' .
						$title . '</div>' .
					'</div>';
				} else { // add links
				print '<div class="lecture-poster">' . 
					'<div id="poster-' . $nid . '" class="lecture-poster-front poster-front-' . $nid . '">' . 
						'<a target="_blank" href="' . $pdf_link . '" alt="Link to download PDF" title="">' .
						$front_img . '</a></div>' . 
					'<div id="poster-' . $nid . '-b" class="lecture-poster-back poster-back-' . $nid . '">' .
						'<a target="_blank" href="' . $pdf_link . '" alt="Link to download PDF" title="">' .
						$back_img . '</a></div><br/>' . 
					'<div class="lecture-poster-title">' .
						$title . '</div>' .
					'</div>';
				
				}
				
    	
    	// print body just for now
    	//print '<h1>masonry test start</h1>';
    	
    	//print $node->field_lec_test[0]['value'];
    	
    	
    	
    	
    	
    ?>
  </div>

  <?php print $links; ?>
</div><!-- /.node -->
