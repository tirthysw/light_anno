<?php

require_once('./phplib.php');

//---------------------------------------------------------------------

$datas = json_decode($_POST['json_string'],true);
//------------------------------
//write out json file
//------------------------------
if (!$handle = fopen('./result/test2.json', 'w')) {
	errorHeader("Cannot open file");
	die();
}

if (fwrite($handle, $_POST['json_string']) === FALSE) {
	errorHeader("Cannot write to file  ");
	die();
}
fclose($handle);

//------------------------------
//write out .six file
//------------------------------


$x = array();
$y = array();

//var_dump($datas);

$front = $datas['front'];
$back = $datas['back'];

//simple guards
if( is_null($front) || is_null($back) || empty($back) || empty($front) ){
	errorHeader("x,y not found ");
	die();
}

//create points
foreach ($front as $k =>$val) {
	$x[]=$val['x'];
	$y[]=$val['y'];
}
foreach ($back as $k =>$val) {
	$x[]=$val['x'];
	$y[]=$val['y'];
}
print_r($x);
print_r($y);
$text='';
foreach ($x as $k =>$val) {
	$text = $text . strval($x[$k]).' '.strval($y[$k]).' '; 
} 
print_r($text);

//write .six file;
if (!$handle = fopen('./result/test.six', 'w')) {
	errorHeader("Cannot open file");
	die();
}

if (fwrite($handle, $text) === FALSE) {
	errorHeader("Cannot write to file ");
	die();
}
fclose($handle);


//$data = print_r_xml($obj);
$stdDatas = json_decode($_POST['json_string']);

$xmlData = (XMLSerializer::generateValidXmlFromObj($stdDatas));


//------------------------------
//wirte out XML result
//------------------------------
if (!$handle = fopen('./result/test.xml', 'w')) {
	echo "Cannot open file";
	exit;
}

if (fwrite($handle, $xmlData) === FALSE) {
	echo "Cannot write to file  ";
	exit;
}
fclose($handle);



 
?>