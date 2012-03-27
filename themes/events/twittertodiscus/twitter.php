<?php

class Twitter {
	public $api_url = 'http://search.twitter.com/';

	function __construct($api_url = 'http://search.twitter.com/') {
 		$this->api_url = $api_url;
	}

  	function search($query, $result_type = 'mixed', $limit = '100', $include_entities = true){
		$options['q'] = $query;
		$options['result_type'] = $result_type;
		$options['rpp'] = $limit;//max 100 results, twitter uses "rpp" for this
		$options['include_entities'] = $include_entities;
		return $this->call('search', $options, false);
	}


  	function call($function, $arguments = array(),  $post = false){
		$args = '';
		foreach ($arguments as $argument => $value) {
      			if (!empty($value)) {
        			$args .= $argument .'='. urlencode($value) .'&';
      			}
    		}	
		if(strlen($args) > 1){
			$argslen = strlen($args);
        		$argslen = $argslen - 1;
        		$args = substr($args, 0, $argslen);
		}

		$ch = curl_init();
    		if ($post) {
      			curl_setopt($ch, CURLOPT_URL, $this->api_url);
      			curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
      			curl_setopt($ch, CURLOPT_POST, 1);
    		}
    		else {
      			curl_setopt($ch, CURLOPT_URL, $this->api_url . $function .'.json?'. $args);
    		}
    		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    		curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    		$data = curl_exec($ch);
    		$info = curl_getinfo($ch);

    		curl_close($ch);		
		
		if ($info['http_code'] == 200) {
	//		print 'success twitter<br /><br />';
			$twitter = json_decode($data);
	//		var_dump($twitter);
			return $twitter;
		}

	}


}//end of class

class TwitterException extends Exception {
  /**
   * The information returned from the cURL call.
   */
  public $info = NULL;

  public $twitter = NULL;

  public function __construct($message, $code = 0, $info = NULL, $twitter = NULL) {
    $this->info = $info;
    $this->twitter = $twitter;
    parent::__construct($message, $code);
  }

  /**
   * Converts the exception to a string.
   */
  public function __toString() {
    $code = isset($this->twitter->code) ? $this->twitter->code : (isset($info['http_code']) ? $info['http_code'] : 0);
    $message = $this->getMessage();
    return __CLASS__ .": [$code]: $message\n";
  }
}
