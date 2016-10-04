<?php

require_once('./phplib.php');



//function writeJson($path , $data )
//function getImageOutputPath(  $image_file_path , $output_category , $output_ext ) 
//---------------------------------------------------------------------
$datas = json_decode($_POST['json_string'],true);

//------------------------------
//write out json file
//------------------------------
$outpath = getImageOutputPath(  $datas['imgSrc'] , 'six_simple_json' , 'json' );
writeJson( $_POST['json_string'], $outpath );
 

//-----------------------------------------------------
//write out .six file
//-----------------------------------------------------

$lines = $datas['sixFileData'];
$outpath = getImageOutputPath(  $datas['imgSrc'] , 'six' , 'six' );
writeJson( $lines, $outpath );
 
?>