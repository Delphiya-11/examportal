<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->roll<1) {
    return http_response_code(400);
  }

  // Sanitize.
  $roll = mysqli_real_escape_string($con, (int)$request->roll);
  $marks = mysqli_real_escape_string($con, $request->marks);
  //$amount = mysqli_real_escape_string($con, (float)$request->amount);

  // Update.
  $sql = "UPDATE `result` SET `marks`='$marks' WHERE `roll` = '" . $roll . "'";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_scode(422);
  }  
}