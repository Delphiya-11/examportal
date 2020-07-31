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
$sql = "SELECT `qid`,`qname`,`opno_1`,`opno_2`,`opno_3`,`opno_4`,`corop` FROM `ques` WHERE `qid` = '" . $qid . "'";
//$result = mysqli_query($con,$sql);
if($result = mysqli_query($con,$sql))
{
  $i=0;
  //$row = mysqli_fetch_assoc($result)
  while($row = mysqli_fetch_assoc($result))
  {
    //array_push($ques,$row);
    $ques[$i]['qid'] = $row['qid'];
    $ques[$i]['qname'] = $row['qname'];
    $ques[$i]['opno_1'] = $row['opno_1'];
    $ques[$i]['opno_2'] = $row['opno_2'];
    $ques[$i]['opno_3'] = $row['opno_3'];
    $ques[$i]['opno_4'] = $row['opno_4'];
    $ques[$i]['corop']=$row['corop'];
    $i++;
  }

  echo json_encode($ques);
}
else
{
  http_response_code(404);
}