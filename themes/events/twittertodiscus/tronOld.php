<?php

require_once './sites/all/modules/disqus/disqus.php';
ini_set('display_errors', 'On');
error_reporting(E_ALL);
echo 'tron.php:<br />';
	$user_secret_key = 'KihVMJEmyNaOGFO8GbZQc8joSD3z7lFzvZzQJsrubWbrV03VVCMgdqopIL0sy64O';
	$user_api_key = 'aRfkE1xXWO4Bv7UcgfEeuCHfzSoSgUx6b4caq9lFEdrOlA8f1UnoUrbjOAwTdsjF';
	try{
		$disqus = new Disqus($user_api_key);
		
		//Get the forum list.
	//	$forums = $disqus->get_forum_list();
 
	//	foreach ($forums as $forum) {
	//		echo $forum->id;
			$forum_id = '1266577';//cbip
                	$limit = 2;
                	$start = 0;
                	$threads = $disqus->get_thread_list($forum_id, $limit);
//var_dump($threads);
                	foreach ($threads as $thread){
 		           	    	print $thread->id;
				print '<br />';
        			$thread_id = $thread->id;
                		$message = 'this is the cron message';
                		$author_name = 'cronuser';
                		$author_email = 'troyth@gmail.com';
			
//$returnval = $disqus->create_post('533077593', 'this is cron', 'cronuser', 'troyth@gmail.com');

//	 			var_dump($returnval);  
		   // 		$posts = $disqus->get_thread_posts($thread_id);
				
		//		foreach ($posts as $post){
		//			print $post->message;
		//			print '<br />';
		//		}
		//		var_dump($posts);
			}

	//	}



} catch(DisqusException $exception) {
	// Display the error.
		echo $exception->getMessage();
	}

?>
