<?php

	$config = array(
		"your_name" => "Mr. President",							// your name or your company's name
		"your_email" => "president_email@domain.com",			// your email
		"your_subject" => "Booking",							// subject of the message

		"rules" => array(
			"token" => array(
				"required" => true,
				"prefix" => "booking"
			),
			"name" => array(
				"required" => true
			),
			"email" => array(
				"required" => true,
				"email" => true
			),
			"phone" => array(
				"required" => true
			),
			"adults" => array(
				"required" => true,
				"integer" => true,
				"minvalue" => 0
			),
			"children" => array(
				"required" => true,
				"integer" => true,
				"minvalue" => 0
			),
			"date_from" => array(
				"required" => true
			),
			"date_to" => array(
				"required" => true
			),
			"message" => array(
				"required" => true
			)
		),
		"messages" => array(
			"token" => array(
				"required" => "Incorrect token. Please reload this webpage"
			),
			"name" => array(
				"required" => "Add your name"
			),
			"email" => array(
				"required" => "Add your email",
				"email" => "Incorrect email format"
			),
			"phone" => array(
				"required" => "Add your phone"
			),
			"adults" => array(
				"required" => "Field is required",
				"integer" => "Only integer allowed",
				"minvalue" => "Value not less than 0"
			),
			"children" => array(
				"required" => "Field is required",
				"integer" => "Only integer allowed",
				"minvalue" => "Value not less than 0"
			),
			"date_from" => array(
				"required" => "Select check-in date"
			),
			"date_to" => array(
				"required" => "Select check-out date"
			),
			"message" => array(
				"required" => "Enter your message"
			)
		),

		/* Debug mode */
		"debug" => true,

		/* Letter processing */
		"data" => array(
			"send" => true,												// send letter with form data
			"method" => array(
				"mail"		=> true,									// use mail() function
				"sendmail"	=> false,									// use sendmail() function
				"smtp" => array(
					"use_smtp"	=> false,								// use SMTP() function
					"auth"		=> true,								// enable SMTP authentication
					"username"	=> "your username",						// smtp username
					"password"	=> "your-password",						// smtp password
					"secure"	=> "tls",								// enable encryption, 'ssl' also accepted
					"port"		=> 465,									// smtp port number e.g. smtp.gmail.com uses port 465
					"host" => "smtp1.example.com;smtp2.example.com",	// specify main and backup server
					"debug" => 0										// set "2" to enable SMTP debug mode
				),
			),

			/* Recipients for letter */
			"recipient" => false,
			"recipient_data" => array(),

			/* Autoresponse processing */
			"autoresponse" => false,
			"autoresponse_data" => array(),
			"autoresponse_attachment" => array(),
		),

		/* File processing */
		"file" => array(),

		/* CSV processing */
		"csv" => array(
			"save" => false,							// save form data to a CSV file
			"directory" => "form_files",				// directory in which CSV file should be placed

			/* create new CSV file for every form submission */
			/* file name will be generated automatically */
			"new_file" => true,

			/* use one CSV file for every form submission */
			"general_file" => false,
			"general_file_name" => "form_data",		// CSV file name

			"attachment" => false,					// sending a CSV file as an attachment
			"delete" => false,						// delete CSV file from server after sending a letter
		),

		/* PDF processing */
		"pdf" => array(
			"save" => false,							// save form data to a PDF file
			"directory" => "form_files",				// directory in which PDF file should be placed

			/* create new PDF file for every form submission */
			/* file name will be generated automatically */
			"new_file" => true,

			/* use one PDF file for every form submission */
			"general_file" => false,
			"general_file_name" => "form_data",			// PDF file name

			"attachment" => false,						// sending a PDF file as an attachment
			"delete" => false,							// delete PDF file from server after sending a letter
		),

		/* Database processing */
		"database" => array(
			"save" => false,						// save form data to a database
			"pdo" => false,							// use PDO for database
			"mysqli" => false,						// use MySQLi for database
		),
	);
?>