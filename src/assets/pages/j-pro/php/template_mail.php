<?php
$letter = '
<html>
<head>
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Just Forms Pro - HTML Email Template</title>
</head>
<body bgcolor="#f6f6f6" style="width: 100% !important; height: 100%; font-family: Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
	<table style="width: 100%; padding: 20px;"><tr>
		<td></td>
		<td bgcolor="#fff" style="display: block !important; max-width: 600px !important; clear: both !important; color: #8c949e; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0;">
				<div style="max-width: 600px; display: block; margin: 0 auto;">
					<table style="width: 100%;">
						<tr>
							<td style="border-bottom-width: 1px; border-bottom-color: #f0f0f0; border-bottom-style: solid;">
								<h2 style="font-family: Arial, sans-serif; color: #63676d; line-height: 1.2; font-weight: 200; text-align: center; font-size: 28px; margin: 18px 0;" align="center">'.$config["your_subject"].'</h2>
							</td>
						</tr>
					</table>
				</div>
				<div style="max-width: 600px; display: block; margin: 0 auto;">
					<table style="width: 100%;">
						<tr>
							<td>';
								// Add fields and values
								foreach ($form_data as $field => $value) {
									if ($field === "_"){
										continue;
									}
									$letter .= '<p style="margin-bottom: 10px; font-weight: normal; font-size: 18px;"><span style="font-weight: bold; color: #6d7279;">'.row_name($field).': </span>'.$value.'</p>';
								}
				$letter .= '</td>
						</tr>
					</table>
				</div>
			</td>
			<td></td>
		</tr>
	</table>
	<table style="width: 100%; clear: both !important;">
		<tr>
			<td></td>
			<td style="display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;">
				<div style="max-width: 600px; display: block; margin: 0 auto;">
					<table style="width: 100%;">
						<tr>
							<td align="center">
								<p style="font-size: 12px; color: #666; margin-bottom: 10px; font-weight: normal;">Developed by: <a target="_blank" href="http://lazy-coding.com/j-forms-pro-full/" style="color: #999; font-size: 14px;">Just Forms Pro</a>
								</p>
							</td>
						</tr>
					</table>
				</div>
			</td>
			<td></td>
		</tr>
	</table>
</body>
</html>';
?>