<?php
/******************************************************************************/
/* Database processing*/
/******************************************************************************/
	/* PDO */
	function pdo($data_array) {

		/* Variables */
		$error_exists = false;
		$error_pdo = "";

		/* Add quotes to the values */
		foreach ($data_array as $key => $value) {
			$data_array[$key] = "'".$value."'";
		}

		/* Create column names and column values using an array with data */
		$column_name = implode(", ", array_keys($data_array));
		$column_value = implode(", ", array_values($data_array));

		try {
			/* Connection to DB */
			$pdo = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_DATABASE."", DB_USER, DB_PASSWORD,
							array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
			$pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			/* Query to DB */
			/* Add data to DB */
			$smt = $pdo->prepare("INSERT INTO ".DB_TABLE." (".$column_name.") VALUES (".$column_value.")");
			$smt -> execute();

			/* Close connection */
			$pdo = null;

			/* If error occurs */
			} catch (PDOException $e) {
				$error_exists = true;
				$error_pdo =  PDO_ERROR_MESSAGE . $e->getMessage();
			}

		/* Return result */
		return $error_exists ? $error_pdo : false;
	}

	/* MySQLi */
	function mysqli($data_array) {

		/* Variables */
		$error_exists = false;
		$error_mysql = "";

		/* Connection to DB */
		$link = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
		if (mysqli_connect_error()) {
			return MYSQL_CONNECT_ERROR_MESSAGE . "(" . mysqli_connect_errno() . ") ". mysqli_connect_error();
		}

		mysqli_set_charset($link, 'utf8');


		/* Add quotes to the values */
		foreach ($data_array as $key => $value) {
			$data_array[$key] = "'".$value."'";
		}

		/* Create column names and column values using an array with data */
		$column_name = implode(", ", array_keys($data_array));
		$column_value = implode(", ", array_values($data_array));

		/* Query to DB */
		/* Add data to DB */
		$result = mysqli_query($link, "INSERT INTO ".DB_TABLE." (".$column_name.") VALUES (".$column_value.")");

		/* If error occurs */
		if (!$result){
			$error_exists = true;
			$error_mysql = MYSQL_QUERY_ERROR_MESSAGE . mysqli_error($link);
		}

		/* Return result */
		mysqli_close($link);
		return $error_exists ? $error_mysql : false;
	}
/******************************************************************************/
/* end Database processing*/
/******************************************************************************/
?>