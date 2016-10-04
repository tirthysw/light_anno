<?php

require_once('./phplib.php');

//---------------------------------------------------------------------

if( is_null($_POST['json_string']) || is_null($_POST['is_all_dump']) || empty($_POST['json_string']) || $_POST['is_all_dump'] ){

	$datas = json_decode($_POST['json_string'],true);
	//------------------------------
	//write out json file
	//------------------------------
	$outpath = getImageOutputPath(  $datas['imgSrc'] , 'dump' , 'json' );

	writeJson( $_POST['json_string'], $outpath );

}
 
?>