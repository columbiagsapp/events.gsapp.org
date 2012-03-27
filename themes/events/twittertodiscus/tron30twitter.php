<?php

require_once './includes/disqus.php';
require_once './includes/twitter.php';
require_once './includes/indent_json.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

	$user_public_key = 'zeluHGBV2NmZOrCqaQ5HgTbJWiYuhO3PsSf1nXbl4L4Bh71YPRYanyEs8smhqSeu';
	$thread_id = '575260794'; //zaha '533077593';
	$message = 'error';
	$author_name = 'twitter';
	$author_email = 'gsappcloud@gmail.com';
        
//try{
	$twitter = new Twitter();
	$tweets = 0;
	$messages = $twitter->search('wood022212');

	foreach ($messages->results as $msg){
            	$tweets = $tweets + 1;
	    	$author_name = '@' . $msg->from_user;
            	$message = $msg->text;
            	$time = $msg->created_at;
            	print '<br /><br /><br />TWEET '.$tweets.'<br /><br />';
	
		//use twitter username for email to keep consistent	
		$author_email = $msg->from_user . '@nomail.com';
			
		//prune message of http strings
		$splice = Array();
		
//	print '<br />Dumping initiated $splice:<br />';
//        var_dump($splice);

		if(!empty($msg->entities->media)){
                        foreach ($msg->entities->media as $media){
                                $splice[ $media->indices[0] ] = $media->indices[1];  
                        }
                }

                if(!empty($msg->entities->urls)){
                        foreach ($msg->entities->urls as $urls){
                                $splice[ $urls->indices[0] ] = $urls->indices[1];
                        }
                }

		if(!empty($splice)){
//			print '<br />krsorting splice<br />';
			krsort($splice);
			foreach ($splice as $start => $stop){
				$len = strlen($message);
                                $msg1 = substr($message, 0, $start);
				$msg1 = trim($msg1);
                                if($stop < ($len - 1)){
                                        $msg2 = substr($message, $stop, $len-$stop-1);
                                	$msg2 = trim($msg2);
				}else{
                                        $msg2 = '';
                                }
//				print '<br />msg1: '.$msg1 . '<br />msg2: ' . $msg2 . '<br />';
                                $message = $msg1.$msg2;
//				print '<br />Concatenated message: ' . $message;
                    	}              
//			print '<br />Dumping $splice:<br />';
//			var_dump($splice);
//			print '<br />';
			unset($splice);
		}

//		print '<br />message:<br />' . $message;
		print '<br />author_name:<br />' . $author_name;
//		print '<br />author_email:<br />' . $author_email;
//		print '<br />time:<br />' . $time;
		
		try{
			print '<br />Creating new disqus instance<br />';
        		print '<br />message being sent:<br />' . $message . '<br />';
			$disqus = new Disqus($user_public_key);
        		$returnval = $disqus->create_post($thread_id, $message, $author_name, $author_email);
			unset($disqus);
			print '<br />RETURN VALUE: <br />';
			print $returnval->code . '<br />';
//			var_dump($returnval);
		} catch(DisqusException $exception) {
        		// Display the error.
            		echo $exception->getMessage();
        	}
//    	} catch(TwitterException $e){
//		echo $e->getMessage();
//	}
}

