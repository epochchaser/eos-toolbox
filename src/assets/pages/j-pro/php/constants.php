<?php
/************************************************/
/* Database settings */
/************************************************/
	define("DB_USER", "username");					// your username
	define("DB_SERVER", "host");					// your host
	define("DB_PASSWORD", "password");				// your password
	define("DB_DATABASE", "database");				// your database
	define("DB_TABLE", "table");					// your database table
/************************************************/
/* end Database settings */
/************************************************/

/************************************************/
/* Dictionary */
/************************************************/
	/* Message */
	define("SUCCESS_MESSAGE", "Message was sent successfully");
	define("ERROR_MESSAGE", "Oops! The following errors occurred:");
	define("DEBUG_MESSAGE", "Oops! The following debug errors occurred:");
	define("DEBUG_GENERAL_MESSAGE", "Oops! Debug errors occurred. Enable debug mode for php code");
	define("DEBUG_CONFIG_MESSAGE", "Oops! The following config errors occurred:");

	/* PDF and CSV */
	define("CSV_ERROR_MESSAGE", "CSV file wasn't created. Check CSV settings in the config.php");
	define("PDF_ERROR_MESSAGE", "PDF file wasn't created. Check PDF settings in the config.php");

	/* PHPMailer */
	define("MAILER_ERROR_MESSAGE", "Mailer Error: ");
	define("AUTORESPONSE_ERROR_MESSAGE", "Autoresponse Error: ");

	/* Form file */
	define("FILE_DEFAULT_NAME", "No files");
	define("FILE_ERROR_MESSAGE", "Upload a file through the form");

	/* Database */
	define("PDO_ERROR_MESSAGE", "PDO error database query: ");
	define("MYSQL_QUERY_ERROR_MESSAGE", "MySQLi error database query: ");
	define("MYSQL_CONNECT_ERROR_MESSAGE", "MySQLi error connecting to database ");

	/* Config */
	define("CONFIG_NOT_FOUND_ERROR_MESSAGE", "User settings: 'rules' array and/or 'messages' array are not found");
	define("CONFIG_RULES_MESSAGES_ERROR_MESSAGE", "User settings: field names in 'rules' and 'messages' are mismatched");
	define("CONFIG_UNKNOWN_RULE_ERROR_MESSAGE", "User settings -> 'rules' array -> Unknown validation rule: ");
	define("CONFIG_NOT_ALLOWED_VALUE_ERROR_MESSAGE", "User settings -> 'rules' array -> Not allowed value -> ");

	/* Directory */
	define("DEFAULT_DIRECTORY", "form_files");
	define("ROOT", dirname(__FILE__).DIRECTORY_SEPARATOR."..");

	/* Google reCaptcha */
	define("RECAPTCHA_SERVER_SECRET_KEY", "your_secret_captcha_key");
/************************************************/
/* end Dictionary */
/************************************************/
?>