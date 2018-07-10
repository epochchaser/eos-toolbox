<?php
/******************************************************************************/
/* POST array processing */
/******************************************************************************/
	/* Validate variables in the POST array */
	/* Creating a new array with data from the POST array */
	function post_array_check($arr) {
		$new_arr = array();
		$new_val = '';
		foreach ($arr as $key => $value) {
			if ( !is_array($value) ) {
				$new_val = strip_tags(trim($value));
				$new_arr[$key] = htmlspecialchars($new_val, ENT_QUOTES, 'UTF-8');
				continue;
			}
			$str = '';
			foreach ($value as $v) {
				$str .= strip_tags(trim($v)) . ", ";
				$str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
			}
			$str = substr($str, 0, -2);
			$new_arr[$key] = $str;
		}
		return $new_arr;
	}
/******************************************************************************/
/* end POST array processing */
/******************************************************************************/

/******************************************************************************/
/* Token processing */
/******************************************************************************/
	function token_check($value, $rules) {
		foreach ($rules as $rule => $val) {
			// "required" validation rule
			if ($rule === "required") {
				if ($val === true) {
					// Create new token instance
					$token = new CSRF($rules["prefix"]);
					// Check a token
					return (!$token->check_token($value)) ? true : false;
				}
			}
		}
	}
/******************************************************************************/
/* end Token processing */
/******************************************************************************/

/******************************************************************************/
/* File processing */
/******************************************************************************/
	function file_check($file, $rules, $messages, $default_mime_types){

		$allowedTypes 	= array();
		$extensionArr 	= explode( "|", strtolower($rules["extension"]) );
		$required		= $rules["required"];
		$validate		= $rules["validate"];
		$size			= $rules["size"] * 1024 * 1024;

		/* Validation */
		if ($validate || $required) {

			// Add required valid types
			foreach ($extensionArr as $type) {
				if ( !array_key_exists($type, $default_mime_types) ){
					continue;
				}
				if ( is_array($default_mime_types[$type]) ){
					$count = count($default_mime_types[$type]);
					for($i = 0; $i < $count; $i++) {
						$allowedTypes[] = $default_mime_types[$type][$i];
					}
					continue;
				}
				$allowedTypes[] = $default_mime_types[$type];
			}

			// if file is required
			if ($required) {
				// if file is empty
				if (empty($_FILES[$file]["name"])) {
					return $messages["required"];
				}
			}

			// if file is not required
			// validate file only if it exists
			if (!empty($_FILES[$file]["name"])) {
				if (!in_array($_FILES[$file]["type"], $allowedTypes)) {
					return $messages["size_extension"];
				}
				if ($_FILES[$file]["size"] > $size) {
					return $messages["size_extension"];
				}
				if (!is_uploaded_file($_FILES[$file]["tmp_name"])) {
					return FILE_ERROR_MESSAGE;
				}
			}
		}
		return false;
	}

	/* Upload file */
	function upload_file($file, $directory){
		$file_name = FILE_DEFAULT_NAME;
		if (!empty($_FILES[$file]["name"])) {
			$file_name = generate_file_name($file);
			move_uploaded_file( $_FILES[$file]["tmp_name"], $directory.$file_name );
		}
		return $file_name;
	}

	/* Generate uniq name for file */
	function generate_file_name($file){
		return date("Ymd_His")."_".mt_rand(1000,9999).'_'.strtolower($_FILES[$file]["name"]);
	}
/******************************************************************************/
/* end File processing */
/******************************************************************************/

/******************************************************************************/
/* Validation functions */
/******************************************************************************/
	/* Email validation */
	function email_check($email){
		$email_template = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i';
		return (preg_match($email_template, $email) !== 1) ? true : false;
	}

	/* Url validation */
	function url_check($url){
		$url_template = "%^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(?:\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.[a-z\x{00a1}-\x{ffff}]{2,6}))(?::\d+)?(?:[^\s]*)?$%iu";
		return (preg_match($url_template, $url) !== 1) ? true : false;
	}

	/* EqualTo validation */
	function equal_to_check($value, $target){
		return ($value !== $target) ? true : false;
	}

	/* Min length validation */
	function min_length_check($value, $len) {
		return (mb_strlen(trim($value), 'UTF-8') < $len) ? true : false;
	}

	/* Max length validation */
	function max_length_check($value, $len) {
		return (mb_strlen(trim($value), 'UTF-8') > $len) ? true : false;
	}

	/* Range length validation */
	function range_length_check($value, $len) {
		$value_len = mb_strlen($value, 'UTF-8');
		return ( $value_len < $len[0] || $value_len > $len[1] ) ? true : false;
	}

	/* Integer validation */
	function integer_сheck($value){
		$item_template = "/^-?\d+$/";
		return (preg_match($item_template, $value) !== 1) ? true : false;
	}

	/* Number validation */
	function number_сheck($value){
		$item_template = "/^-?\d+(?:\.\d+)?$/";
		return (preg_match($item_template, $value) !== 1) ? true : false;
	}

	/* Min value validation */
	function min_value_сheck($value, $val){
		if ( !number_сheck($value) || !integer_сheck($value) ) {
			return ( $value < $val ) ? true : false;
		}
		return true;
	}

	/* Max value validation */
	function max_value_сheck($value, $val){
		if ( !number_сheck($value) || !integer_сheck($value) ) {
			return ( $value > $val ) ? true : false;
		}
		return true;
	}

	/* Range value validation */
	function range_value_сheck($value, $val){
		if ( !number_сheck($value) || !integer_сheck($value) ) {
			return ( $value < $val[0] || $value > $val[1] ) ? true : false;
		}
		return true;
	}
/******************************************************************************/
/* end Validation functions */
/******************************************************************************/

/******************************************************************************/
/* Debugger */
/******************************************************************************/
	function debugger($data){

		if (count($data) === 1) {
			echo json_encode(array("error" => $data[0]));
			return false;
		}

		$result = $data[0]."<ul>";

		if ( is_string($data[1]) ){
			$result .= "<li>".$data[1]."</li></ul>";
			echo json_encode(array("error" => $result));
			return false;
		}

		if ( is_array($data[1]) ){
			foreach ($data[1] as $msg) {
				$result .= "<li>".$msg."</li>";
			}
			$result .= "</ul>";
			echo json_encode(array("error" => $result));
			return false;
		}
	}
/******************************************************************************/
/* end Debugger */
/******************************************************************************/

/******************************************************************************/
/* Email template processing */
/******************************************************************************/
	function row_name($name){
		return str_replace( "_", " ", ucfirst($name) );
	}
/******************************************************************************/
/* end Email template processing */
/******************************************************************************/

/******************************************************************************/
/* Directory processing  */
/******************************************************************************/
	function directory_check($dir_name){

		clearstatcache();
		$result = ROOT.DIRECTORY_SEPARATOR.DEFAULT_DIRECTORY;
		$skip = array(".",  "..");
		$files = scandir(ROOT);

		foreach($files as $file) {
			if (in_array($file, $skip)){
				continue;
			}
			if( $file === $dir_name && is_dir(ROOT.DIRECTORY_SEPARATOR.$file) ){
				$result = ROOT.DIRECTORY_SEPARATOR.$file;
			}
		}
		return $result.DIRECTORY_SEPARATOR;
	}

	function get_file($root, $target){

		clearstatcache();
		$result = false;
		$skip = array(".",  "..", "php");
		$files = scandir($root);

		foreach($files as $file) {
			if (in_array($file, $skip)){
				continue;
			}
			if ( $file === $target && is_file($root.DIRECTORY_SEPARATOR.$file) ){
				$result = $root.DIRECTORY_SEPARATOR.$file;
				break;
			}
			if ( $result === false && is_dir($root.DIRECTORY_SEPARATOR.$file) ){
				$result = get_file($root.DIRECTORY_SEPARATOR.$file, $target);
			}
		}
		return $result;
	}
/******************************************************************************/
/* end Directory processing */
/******************************************************************************/

/******************************************************************************/
/* Config validation */
/******************************************************************************/
	function config_check($config){
		$result = array();
		
		if (!isset($config["rules"]) || !isset($config["messages"])){
			$result[] = CONFIG_NOT_FOUND_ERROR_MESSAGE;
			return $result;
		}

		/* Check validation rules */
		foreach ($config["rules"] as $field => $rules) {
			foreach ($rules as $rule => $value) {
				switch($rule) {
				case "required":
				case "alternative_mode":
				case "email":
				case "url":
				case "integer":
				case "number":
				case "validate":
					if (!is_bool($value)){
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "minlength":
				case "maxlength":
					if (!is_int($value)) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "minvalue":
				case "maxvalue":
					if (!is_numeric($value)) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "rangelength":
					if (!is_array($value) ||
						count($value) !== 2 ||
						!is_int($value[0]) ||
						!is_int($value[1]) ||
						$value[0] >= $value[1]) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "rangevalue":
					if (!is_array($value) ||
						count($value) !== 2 ||
						!is_numeric($value[0]) ||
						!is_numeric($value[1]) ||
						$value[0] >= $value[1]) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "size":
					if (!is_numeric($value) || $value <= 0) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "prefix":
				case "extension":
				case "equalTo":
					if (!is_string($value)) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				case "requiredFromGroup":
					if (!is_array($value) ||
						!is_int($value[0]) ||
						!is_array($value[1]) ||
						count($value) !== 2 ||
						$value[0] > count($value[1])) {
						$result[] = error_message($field, $rule, $value);
					}
					break;
				default:
					$result[] = CONFIG_UNKNOWN_RULE_ERROR_MESSAGE.$field." => ".$rule;
				}
			}
		}

		/* Check an accordance of the rules and messages */
		if ( array_diff_key($config["rules"], $config["messages"]) ||
				array_diff_key($config["rules"], $config["messages"])){
			$result[] = CONFIG_RULES_MESSAGES_ERROR_MESSAGE;
		}
		return $result;
	}

	function error_message($field, $rule, $value){
		$result = is_array($value) ? "Array" : $value;
		return CONFIG_NOT_ALLOWED_VALUE_ERROR_MESSAGE.$field.": ".$rule." => ".$result;
	}
/******************************************************************************/
/* end Config validation */
/******************************************************************************/
?>