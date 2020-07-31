<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if (trim($request->roll)<1 || (int)$request->marks<0) {
    return http_response_code(400);
  }

  // Sanitize.
  $roll = mysqli_real_escape_string($con, trim($request->roll));
  $marks = mysqli_real_escape_string($con, (int)$request->marks);
  
  // Update.
  $sql = "INSERT INTO `result`(`roll`, `marks`) VALUES ('{$roll}','{$marks}')";

  if(mysqli_query($con, $sql))
  {
    http_response_code(201);
    $result = [
      'roll' => $roll,
      'marks' => $marks,
    ];
    echo json_encode($result);
  }
  else
  {
    return http_response_scode(422);
  }  
}