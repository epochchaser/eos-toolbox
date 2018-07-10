<?php
	if (!isset($_SESSION)) session_start();

	class CSRF {

		/**
		 * Token name of the session / html form field
		 * @var string
		 */
		private $token_name;

		/**
		 * When to timeout in seconds
		 * @var number
		 */
		private $timeout = 300;

		public function __construct($token_name) {
			$this->token_name = $token_name;
		}

		/**
		 * Builds a new token and stores it in the session
		 * @param string $token_name
		 * @return token
		 */
		public function get_token() {
			// create a token
			$token_value = hash('sha256', mt_rand(0, mt_getrandmax()) . microtime(true));

			// Stored token to the session
			$_SESSION['token_' . $this->token_name] 	 = $this->token_name . '_' . $token_value;
			$_SESSION['token_time_' . $this->token_name] = time();
			
			// return new token to a HTML page
			return '<input type="hidden" name="token" value="' . $this->token_name . '_' . $token_value . '">';
		}

		/**
		 * Check a token
		 * @param string $token
		 * @return bool
		 */
		public function check_token($token) {
			// get a token from session
			$session_token 		= $this->get_token_from_session();
			$session_token_time = $this->get_token_time_from_session();

			// Lifetime of a token
			$token_time = time() - $session_token_time;

			// check a token
			if (($token_time < $this->timeout) && $session_token === $token) {
				return true;
			}

			// Unset token variables
			unset($_SESSION['token_' . $this->token_name]);
			unset($_SESSION['token_time_' . $this->token_name]);

			return false;
		}

		/**
		 * Get token from a session
		 * @return string
		 */
		public function get_token_from_session() {
			return isset($_SESSION['token_' . $this->token_name]) ? $_SESSION['token_' . $this->token_name] : '';
		}

		/**
		 * Get token creation time from a session
		 * @return string
		 */
		public function get_token_time_from_session() {
			return isset($_SESSION['token_time_' . $this->token_name]) ? $_SESSION['token_time_' . $this->token_name] : '';
		}
	}