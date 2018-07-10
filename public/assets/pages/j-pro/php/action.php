<?php
	header("Content-Type: text/html; charset=utf-8");
	header("Cache-Control: no-cache");

	if (!$_POST) exit;

	require_once dirname(__FILE__)."/config.php";
	require_once dirname(__FILE__)."/constants.php";
	require_once dirname(__FILE__)."/helpers.php";

/************************************************/
/* Validation */
/************************************************/
	/* Debug config array */
	if (isset($config["debug"]) && $config["debug"]){
		$config["debug_array"] = config_check($config);
		if ( !empty($config["debug_array"]) ){
			debugger( array(DEBUG_CONFIG_MESSAGE, $config["debug_array"]) );
			exit;
		}
	}

	/* Arrays */
	$form_data = array();
	$config["errors"] = array();

	/* Validate POST array, delete all special symbols */
	$post = post_array_check($_POST);

	/* Combine arrays */
	foreach ($config["rules"] as $field => $rules) {
		if (substr($field, -2) === "[]"){
			$field = substr($field, 0, -2);
		}
		if (isset($_FILES[$field])){
			continue;
		}
		if ($field === "recaptcha") {
			$form_data[$field] = isset($post["g-recaptcha-response"]) ? $post["g-recaptcha-response"] : false;
			continue;
		}
		if (!isset($post[$field])) {
			$form_data[$field] = false;
			continue;
		}
		$form_data[$field] = $post[$field];
	}

	/* Validation apply to form data except files */
	foreach ($form_data as $field => $value) {

		/* Token validation */
		if ($field === "token" && $config["rules"][$field]["required"]) {
			require_once dirname(__FILE__)."/csrf.php";

			if ( token_check($form_data[$field], $config["rules"][$field]) ){
				debugger( array($config["messages"][$field]["required"]) );
				exit;
			}
		}

		/* reCaptcha validation */
		if ($field === "recaptcha" && $config["rules"][$field]["required"]) {
			require_once dirname(__FILE__)."/reCaptcha/autoload.php";

			if ( isset($config["rules"][$field]["alternative_mode"]) && $config["rules"][$field]["alternative_mode"] ) {

				// If file_get_contents() is locked down on your PHP installation to disallow
				// its use with URLs, then you can use the alternative request method instead.
				// This makes use of fsockopen() instead.
				$re_captcha = new \ReCaptcha\ReCaptcha(RECAPTCHA_SERVER_SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());
			} else {

				// Create an instance of the service using your secret key
				$re_captcha = new \ReCaptcha\ReCaptcha(RECAPTCHA_SERVER_SECRET_KEY);
			}

			// Make the call to verify the response and also pass the user's IP address
			$valid_captcha = $re_captcha->verify($form_data[$field], $_SERVER["REMOTE_ADDR"]);

			if (!$valid_captcha->isSuccess()) {
				debugger( array($config["messages"][$field]["required"]) );
				exit;
			}
		}

		/* Input fields validation */
		foreach ($config["rules"][$field] as $rule => $rule_value){
			switch ($rule) {
			case "required":
				if ($rule_value === true) {
					if ( min_length_check($form_data[$field], 1) ){
						$config["errors"][] = $config["messages"][$field][$rule];
						continue 3;
					}
				}
				break;
			case "email":
				if ($rule_value === true) {
					if ( email_check($form_data[$field]) ){
						$config["errors"][] = $config["messages"][$field][$rule];
						continue 3;
					}
				}
				break;
			case "url":
				if ($rule_value === true) {
					if ( url_check($form_data[$field]) ){
						$config["errors"][] = $config["messages"][$field][$rule];
						continue 3;
					}
				}
				break;
			case "integer":
				if ($rule_value === true) {
					if ( integer_сheck($form_data[$field]) ){
						$config["errors"][] = $config["messages"][$field][$rule];
						continue 3;
					}
				}
				break;
			case "number":
				if ($rule_value === true) {
					if ( number_сheck($form_data[$field]) ){
						$config["errors"][] = $config["messages"][$field][$rule];
						continue 3;
					}
				}
				break;
			case "minlength":
				if ( min_length_check( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "maxlength":
				if ( max_length_check( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "rangelength":
				if ( range_length_check( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "minvalue":
				if ( min_value_сheck( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "maxvalue":
				if ( max_value_сheck( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "rangevalue":
				if ( range_value_сheck( $form_data[$field], $rule_value ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "equalTo":
				if ( equal_to_check( $form_data[$field], $form_data[$rule_value] ) ){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			case "requiredFromGroup":
				$group = $rule_value[1];
				$count = 0;

				/* Validate every field */
				foreach ($group as $group_item) {
					if ( !min_length_check($form_data[$group_item], 1) ){
						$count++;
					}
				}

				/* Add error message */
				if ($count < $rule_value[0]){
					$config["errors"][] = $config["messages"][$field][$rule];
					continue 3;
				}
				break;
			}
		}
	}

	/* Validation apply to form files */
	if ( isset($_FILES) ){
		require_once dirname(__FILE__)."/mime_types.php";

		foreach ($_FILES as $file => $data) {
			$res = file_check($file, $config["rules"][$file], $config["messages"][$file], $default_mime_types);
			if ($res){
				$config["errors"][] = $res;
			}
		}
	}

	/* If validation error occurs */
	if (!empty($config["errors"])) {
		debugger( array(ERROR_MESSAGE, $config["errors"]) );
		exit;
	}

	/* Remove token */
	if (array_key_exists("token", $form_data)) {
		unset($form_data["token"]);
	}
	/* Remove reCaptcha */
	if (array_key_exists("recaptcha", $form_data)) {
		unset($form_data["recaptcha"]);
	}

/************************************************/
/* File processing */
/************************************************/
	if (isset($config["file"])){

		foreach ($config["file"] as $file => $rules) {
			if ($file === "directory"){
				continue;
			}

			/* Upload file to server */
			foreach ($rules as $rule => $value) {
				if ($rule === "upload" && $value === true) {

					/* Save file name */
					$form_data[$file] = upload_file($file, directory_check($config["file"]["directory"]) );

					/* Create service variable with path to file */
					$form_data["_"]["files"][$file] = directory_check($config["file"]["directory"]).$form_data[$file];
				}
			}

			/* Save default file name */
			if ( !isset($form_data[$file]) ){
				$form_data[$file] = FILE_DEFAULT_NAME;
			}
		}
	}

/************************************************/
/* Duplicate info to a CSV file */
/************************************************/
	if (isset($config["csv"])){
		if ($config["csv"]["save"]) {

			$path_csv = directory_check($config["csv"]["directory"]);

			/* New file for every form submission */
			if ( $config["csv"]["new_file"] ) {
				$single_name = date("Ymd_His")."_".mt_rand(1000,9999);
				$file_csv = $path_csv.$single_name.".csv";
			}

			/* General file */
			if ( $config["csv"]["general_file"] ){
				$file_csv = $path_csv.$config["csv"]["general_file_name"].".csv";
			}
			
			/* Debug */
			if (!isset($file_csv)){
				if ($config["debug"]){
					debugger( array(DEBUG_MESSAGE, CSV_ERROR_MESSAGE) );
					exit;
				}
				debugger( array(DEBUG_GENERAL_MESSAGE) );
				exit;
			}

			// Split the array with data to headers and values
			foreach ($form_data as $header => $value) {
				/* Skip service values */
				if ($header === "_"){
					continue;
				}
				$header_csv[] = $header;		// headers for rows in the CSV file
				$value_csv[] = $value;			// values for rows in the CSV file
			}

			/* If CSV file doesn't exist */
			if (!file_exists($file_csv)) {

				// Open CSV file
				$processing_csv = fopen($file_csv, 'a');
				// Add special symbols for correct encoding
				fwrite($processing_csv, "\xEF\xBB\xBF");
				// Add headers for the rows
				fputcsv($processing_csv, $header_csv);
				// Add variables to the file
				fputcsv($processing_csv, $value_csv);

			/* If CSV file exists */
			} else {

				// Open CSV file
				$processing_csv = fopen($file_csv, 'a');
				// Add variables to the file
				fputcsv($processing_csv, $value_csv);
			}

			fclose($processing_csv);

			/* Add to total array */
			$form_data["_"]["csv"] = $file_csv;
		}
	}

/************************************************/
/* Duplicate info to a PDF file */
/************************************************/
	if (isset($config["pdf"])){
		if ($config["pdf"]["save"]) {

			$path_pdf = directory_check($config["pdf"]["directory"]);

			/* New file for every form submission */
			if ( $config["pdf"]["new_file"] ) {
				$single_name = date("Ymd_His")."_".mt_rand(1000,9999);
				$file_pdf = $path_pdf.$single_name.".pdf";
			}

			/* General file */
			if ( $config["pdf"]["general_file"] ){
				$file_pdf = $path_pdf.$config["pdf"]["general_file_name"].".pdf";
			}
			
			/* Debug */
			if (!isset($file_pdf)){
				if ($config["debug"]){
					debugger( array(DEBUG_MESSAGE, PDF_ERROR_MESSAGE) );
					exit;
				}
				debugger( array(DEBUG_GENERAL_MESSAGE) );
				exit;
			}

			/* Create new record */
			require_once dirname(__FILE__)."/tcpdf/tcpdf.php";
			$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, "UTF-8", false);
			$pdf->AddPage();
			
			/* Header */
			$pdf->SetFont("freeserif", "", 20);
			$pdf->Cell(190, 15, $config["your_subject"], 1, 1, "C");

			/* Body */
			foreach ($form_data as $field => $value) {
				/* Skip service values */
				if ($field === "_"){
					continue;
				}
				// Fields
				$pdf->SetFont("freeserif", "", 13);
				$pdf->Cell(35, 10, row_name($field).":", 0, 0);
				// Values
				$pdf->SetFont("freeserif", "", 15);
				// If value is longer than 74 chars
				if (mb_strlen($value, "UTF-8") > 74) {
					$pdf->MultiCell(155, 10, $value, 0, 1);
					continue;
				}
				$pdf->Cell(155, 10, $value, 0, 1);
			}
			
			/* If PDF file doesn't exist */
			if (!file_exists($file_pdf)) {
				$pdf->Output($file_pdf, "F");
			} else {
				require_once dirname(__FILE__)."/tcpdf/fpdf_merge.php";
				// Temporary PDF file
				$temp_pdf = dirname(__FILE__).$config["pdf"]["directory"]."temp.pdf";
				// Create temporay PDF file
				$pdf->Output($temp_pdf, "F");
				// Merge main PDF file with temporary PDF file
				$merge = new FPDF_Merge();
				$merge->add($file_pdf);
				$merge->add($temp_pdf);
				$merge->output($file_pdf, "F");
				unlink($temp_pdf);
			}

			/* Add to total array */
			$form_data["_"]["pdf"] = $file_pdf;
		}
	}

/************************************************/
/* Duplicate info to a database */
/************************************************/
	if (isset($config["database"])){
		if ($config["database"]["save"]) {

			require_once dirname(__FILE__)."/database_helpers.php";

			/* Remove service values */
			if (array_key_exists("_", $form_data)) {
				unset($form_data["_"]);
			}

			/* Mysqli connection to DB */
			if ($config["database"]["mysqli"]) {
				$db_result = mysqli($form_data);
			}
			/* PDO connection to DB */
			if ($config["database"]["pdo"]) {
				$db_result = pdo($form_data);
			}

			/* Debug */
			if (is_string($db_result)){
				if ($config["debug"]){
					debugger( array(DEBUG_MESSAGE, $db_result) );
					exit;
				}
				debugger( array(DEBUG_GENERAL_MESSAGE) );
				exit;
			}
		}
	}

/************************************************/
/* Send letter */
/************************************************/
	if (isset($config["data"])){

		/* Send letter */
		if (isset($config["data"]["send"]) && $config["data"]["send"]) {

			require_once dirname(__FILE__)."/phpmailer/PHPMailerAutoload.php";
			require_once dirname(__FILE__)."/template_mail.php";

			/* Send letter using sendmail or mail function */
			if ($config["data"]["method"]["sendmail"] || $config["data"]["method"]["mail"]) {
				$mail = new PHPMailer;

				if (!$config["data"]["method"]["mail"]){
					$mail->isSendmail();
				}
				
				$mail->IsHTML(true);
				$mail->CharSet = "UTF-8";
				$mail->From = $config["your_email"];
				$mail->FromName = $config["your_name"];
				$mail->Encoding = "base64";
				$mail->ContentType = "text/html";
				$mail->addAddress($config["your_email"], $config["your_name"]);
				$mail->Subject = $config["your_subject"];
				$mail->Body = $letter;
				$mail->AltBody = "Use an HTML compatible email client";
			}

			/* Send letter using smtp function */
			if ($config["data"]["method"]["smtp"]["use_smtp"]){
				$mail = new PHPMailer;
				$mail->isSMTP();
				$mail->Host 		= $config["data"]["method"]["smtp"]["host"];
				$mail->SMTPAuth		= $config["data"]["method"]["smtp"]["auth"];
				$mail->Username 	= $config["data"]["method"]["smtp"]["username"];
				$mail->Password 	= $config["data"]["method"]["smtp"]["password"];
				$mail->SMTPSecure	= $config["data"]["method"]["smtp"]["secure"];
				$mail->Port 		= $config["data"]["method"]["smtp"]["port"];
				$mail->IsHTML(true);
				$mail->From = $config["your_email"];
				$mail->CharSet = "UTF-8";
				$mail->FromName = $config["your_name"];
				$mail->Encoding = "base64";
				$mail->Timeout = 200;
				$mail->SMTPDebug = $config["data"]["method"]["smtp"]["debug"];
				$mail->ContentType = "text/html";
				$mail->addAddress($config["your_email"], $config["your_name"]);
				$mail->Subject = $config["your_subject"];
				$mail->Body = $letter;
				$mail->AltBody = "Use an HTML compatible email client";
			}

			/* Sending form files as an attachments */
			if (isset($config["file"])){
				foreach ($config["file"] as $file => $rules){
					if ($file === "directory"){
						continue;
					}
					foreach ($rules as $rule => $value) {
						if ($rule === "attachment" && $value === true) {
							if ( is_file($form_data["_"]["files"][$file]) ){
								$mail->AddAttachment($form_data["_"]["files"][$file]);
							}
						}
					}
				}
			}

			/* Sending CSV file */
			if (isset($config["csv"])){
				if ($config["csv"]["attachment"]){
					if ( is_file($form_data["_"]["csv"]) ){
						$mail->AddAttachment($form_data["_"]["csv"]);
					}
				}
			}

			/* Sending PDF file */
			if (isset($config["pdf"])){
				if ($config["pdf"]["attachment"]){
					if ( is_file($form_data["_"]["pdf"]) ){
						$mail->AddAttachment($form_data["_"]["pdf"]);
					}
				}
			}

			/* Multiple letter recepients */
			if (isset($config["data"]["recipient"]) && $config["data"]["recipient"]){
				if (isset($config["data"]["recipient_data"])){
					foreach ($config["data"]["recipient_data"] as $email => $name){

						/* Set a user as a recipient */
						if ( isset($form_data[$email]) ){
							if ( isset($form_data[$name]) ){
								$mail->AddBCC($form_data[$email], $form_data[$name]);
								continue;
							}
							$mail->AddBCC($form_data[$email]);

						/* Use data from config */
						} else {
							$mail->AddBCC($email, $name);
						}
					}
				}
			}

			/* If error occurs while letter sending */
			if (!$mail->send()) {
				if ($config["debug"]){
					debugger( array(MAILER_ERROR_MESSAGE, $mail->ErrorInfo) );
					exit;
				}
				debugger( array(DEBUG_GENERAL_MESSAGE) );
				exit;
			}

			/* Autoresponse */
			if (isset($config["data"]["autoresponse"]) && $config["data"]["autoresponse"]) {
				if (isset($config["data"]["autoresponse_data"])) {

					/* Create autoresponse data */
					foreach ($config["data"]["autoresponse_data"] as $email => $name){

						/* Set a user as a autoresponse recipient */
						if ( isset($form_data[$email]) ){
							if ( isset($form_data[$name]) ){
								$autores_email = $form_data[$email];
								$autores_name = $form_data[$name];
								continue;
							}
							$autores_email = $form_data[$email];
							$autores_name = "Anonymous User";

						/* Use data from config */
						} else {
							$autores_email = $email;
							$autores_name = $name;
						}
					}

					require_once dirname(__FILE__)."/template_autoresponse.php";

					/* Send letter using sendmail or mail function */
					if ($config["data"]["method"]["sendmail"] || $config["data"]["method"]["mail"]) {
						$response = new PHPMailer;

						if (!$config["data"]["method"]["mail"]){
							$response->isSendmail();
						}
						
						$response->IsHTML(true);
						$response->CharSet = "UTF-8";
						$response->From = $config["your_email"];
						$response->FromName = $config["your_name"];
						$response->Encoding = "base64";
						$response->ContentType = "text/html";
						$response->addAddress($autores_email, $autores_name);
						$response->Subject = $config["your_subject"];
						$response->Body = $autoresponse;
						$response->AltBody = "Use an HTML compatible email client";
					}

					/* Send letter using smtp function */
					if ($config["data"]["method"]["smtp"]["use_smtp"]){
						$response = new PHPMailer;
						$response->isSMTP();
						$response->Host 		= $config["data"]["method"]["smtp"]["host"];
						$response->SMTPAuth		= $config["data"]["method"]["smtp"]["auth"];
						$response->Username 	= $config["data"]["method"]["smtp"]["username"];
						$response->Password 	= $config["data"]["method"]["smtp"]["password"];
						$response->SMTPSecure	= $config["data"]["method"]["smtp"]["secure"];
						$response->Port 		= $config["data"]["method"]["smtp"]["port"];
						$response->IsHTML(true);
						$response->From = $config["your_email"];
						$response->CharSet = "UTF-8";
						$response->FromName = $config["your_name"];
						$response->Encoding = "base64";
						$response->Timeout = 200;
						$response->SMTPDebug = $config["data"]["method"]["smtp"]["debug"];
						$response->ContentType = "text/html";
						$response->addAddress($autores_email, $autores_name);
						$response->Subject = $config["your_subject"];
						$response->Body = $autoresponse;
						$response->AltBody = "Use an HTML compatible email client";
					}

					/* Sending form files as an attachments */
					if (isset($config["data"]["autoresponse_attachment"])){
						$autores_files = $config["data"]["autoresponse_attachment"];
					}
					if ( isset($autores_files) && is_array($autores_files) ){
						foreach ($autores_files as $file) {

							if ( isset($form_data["_"]["files"][$file]) && is_file($form_data["_"]["files"][$file]) ){
								$response->AddAttachment($form_data["_"]["files"][$file]);
								continue;
							}
							if ( isset($form_data["_"][$file]) && is_file($form_data["_"][$file]) ){
								$response->AddAttachment($form_data["_"][$file]);
								continue;
							}
							$path_file = get_file(ROOT, $file);
							if ($path_file){
								$response->AddAttachment($path_file);
								continue;
							}
						}
					}

					/* If error occurs while letter sending */
					if (!$response->send()) {
						if ($config["debug"]){
							debugger( array(AUTORESPONSE_ERROR_MESSAGE, $response->ErrorInfo) );
							exit;
						}
						debugger( array(DEBUG_GENERAL_MESSAGE) );
						exit;
					}
				}
			}
			/* end Autoresponse */
		}
		/* end Send letter */
	}

/************************************************/
/* Success message */
/************************************************/
	echo json_encode(array("success" => SUCCESS_MESSAGE));

/************************************************/
/* File processing */
/************************************************/
	/* Delete form files */
	if (isset($config["file"])){
		foreach ($config["file"] as $file => $rules) {
			if ($file === "directory"){
				continue;
			}
			foreach ($rules as $rule => $value) {
				if ($rule === "delete" && $value === true) {
					if ( is_file($form_data["_"]["files"][$file]) ){
						unlink($form_data["_"]["files"][$file]);
					}
				}
			}
		}
	}

	/* Delete CSV file */
	if (isset($config["csv"])){
		if ($config["csv"]["delete"]) {
			if ( is_file($form_data["_"]["csv"]) ){
				unlink($form_data["_"]["csv"]);
			}
		}
	}

	/* Delete PDF file  */
	if (isset($config["pdf"])){
		if ($config["pdf"]["delete"]) {
			if ( is_file($form_data["_"]["pdf"]) ){
				unlink($form_data["_"]["pdf"]);
			}
		}
	}
?>