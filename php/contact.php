<?php 

	require_once('config.php');
	require_once('google/appengine/api/mail/Message.php');

	use google\appengine\api\mail\Message;
	
	// Sender Info
	$name = trim($_POST['name']);
	$email = trim($_POST['email']);
	$message = trim($_POST['message']);
	$err = "";
	
	// Check Info
	$pattern = "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$^";
	if(!preg_match_all($pattern, $email, $out)) {
		$err = MSG_INVALID_EMAIL; // Invalid email
	}
	if(!$email) {
		$err = MSG_INVALID_EMAIL; // No Email
	}	
	if(!$message) {
		$err = MSG_INVALID_MESSAGE; // No Message
	}
	if (!$name) {
		$err = MSG_INVALID_NAME; // No name 
	}

	if(!$err)
	{
     	$mail_options = [
  	  		"sender" => "admin@rgyani.com",
		    "to" => "ravigyani@gmail.com",
		    "subject" => SUBJECT,
		    "body" => $message
		];
		
		try 
		{
    		$message = new Message($mail_options);
		    $message->send();
		    echo "SEND"; 
		} 
		catch (\InvalidArgumentException $e) 
		{
			echo MSG_SEND_ERROR; 
		}
	}
	else
		echo MSG_SEND_ERROR; 
		
}
/*
	//define the headers we want passed. Note that they are separated with \r\n
	$headers = "From: ".$name." <".$email.">\r\nReply-To: ".$email."";


	if (!$err){
		
		//send the email
		$sent = mail(TO_EMAIL,SUBJECT,$message,$headers); 
		
		if ($sent) {
				// If the message is sent successfully print
				echo "SEND"; 
			} else {
				// Display Error Message
				echo MSG_SEND_ERROR; 
			}
	} else {
		echo $err; // Display Error Message
	}
*/
?>