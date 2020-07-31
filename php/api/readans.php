<?php
/**
 * Returns the list of questions.
 */
require 'database.php';

//$postdata = file_get_contents("php://input");
$qid = ($_GET['qid'] !== null)? mysqli_real_escape_string($con, $_GET['qid']) : false;

if(!$qid)
{
  return http_response_code(400);
}

//Retrieve

$ques = [];
$sql = "SELECT `qid`,`corop` FROM `ques` WHERE `qid` = '" . $qid . "'";
//$result = mysqli_query($con,$sql);
if($result = mysqli_query($con,$sql))
{
  $i=0;
  //$row = mysqli_fetch_assoc($result)
  while($row = mysqli_fetch_assoc($result))
  {
    //array_push($ques,$row);
    $ques[$i]['qid'] = $row['qid'];
    $ques[$i]['corop'] = $row['corop'];
    $i++;
  }

  echo json_encode($ques);
}
else
{
  http_response_code(404);
}