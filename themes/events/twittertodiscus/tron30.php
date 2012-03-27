<?php

require_once './includes/disqus.php';
require_once './includes/twitter.php';
require_once './includes/indent_json.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);
$user_public_key = 'zeluHGBV2NmZOrCqaQ5HgTbJWiYuhO3PsSf1nXbl4L4Bh71YPRYanyEs8smhqSeu';
try{
	$disqus = new Disqus($user_public_key);
	$thread_id = '533077593';
        $message = 'error';
        $author_name = 'twitter';
        $author_email = 'gsappcloud@gmail.com';
			

	$twitter = new Twitter();

	$messages = $twitter->search('wood022212');
	foreach ($messages->results as $msg){
		$author_name = $msg->from_user;
		$message = $msg->text;
		$time = '';
		
		print '<br /><br /><br />ENTITIES<br /><br />';

		$message = $msg->text;

        $start = $msg->entities->media[0]->indices[0];
        $stop = $msg->entities->media[0]->indices[1];
        $len = strlen($message);

        $msg1 = substr($message, 0, $start);
        if($stop > ($len - 1)){
                $msg2 = substr($message, $stop, $len-$stop-1);
        }else{
                $msg2 = '';
        }
        $message = $msg1.$msg2;

        print '<br />The spliced message:<br />' . $message;

		$returnval = $disqus->create_post($thread_id, $message, $author_name, $author_email);
	}


} catch(DisqusException $exception) {
	// Display the error.
		echo $exception->getMessage();
	}


