<?php

class Disqus {
	public $user_api_key = NULL;
	public $forum_api_key = NULL;
	public $api_url = 'http://disqus.com/api/';
 	public $api_version = '3.0';


function __construct($user_api_key = NULL, $forum_api_key = NULL, $api_url = 'http://disqus.com/api/') {
    	$this->user_api_key = $user_api_key;
    	$this->forum_api_key = $forum_api_key;
    	$this->$api_url = $api_url;
	print 'is including disqus30 <br />';  
}

function get_forum_api_key($forum_id) {
    	return $this->call('get_forum_api_key', array('forum_id' => $forum_id));
}

function create_post($thread_id, $message, $author_name, $author_email, array $options = array()) {
    $options['thread_id'] = $thread_id;
    $options['message'] = $message;
    $options['author_name'] = $author_name;
    $options['author_email'] = $author_email;
    return $this->call('posts/create', $options, TRUE);
  }

function call($function, $arguments = array(), $post = FALSE) {
    // Construct the arguments.
    $args = '';
    if (!isset($arguments['api_key'])) {
      $arguments['api_key'] = $this->user_api_key;
    }
    if (!isset($arguments['forum_api_key'])) {
      $arguments['forum_api_key'] = $this->forum_api_key;
    }
    if (!isset($arguments['api_version'])) {
      $arguments['api_version'] = $this->api_version;
    }
    foreach ($arguments as $argument => $value) {
      if (!empty($value)) {
        $args .= $argument . '=' . urlencode($value) . '&';
      }
    }

var_dump($args);

	$urlcall = $this->api_url . '/' . $function . '.json?' . $args;
var_dump($urlcall);

    // Call the Disqus API.
    $ch = curl_init();
    if ($post) {
      curl_setopt($ch, CURLOPT_URL, $urlcall '/');
      curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
      curl_setopt($ch, CURLOPT_POST, 1);
    }
    else {
      curl_setopt($ch, CURLOPT_URL, $this->api_url . $function . '/?' . $args);
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $data = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    // Check the results for errors (200 is a successful HTTP call).
    if ($info['http_code'] == 200) {
      $disqus = json_decode($data);
      if ($disqus->succeeded) {
        // There weren't any errors, so return the results.
        return isset($disqus->message) ? $disqus->message : NULL;
      }
      else {
        throw new DisqusException(isset($disqus->message) ? $disqus->message : NULL, 0, $info, $disqus);
      }
    }
    else {
      throw new DisqusException('There was an error querying the Disqus API.', $info['http_code'], $info);
    }
 
  }

}
