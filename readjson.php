<?php

require_once('./phplib.php');


$imgsrc = $_POST['img_src'];

$path = getImageOutputPath( $imgsrc , 'dump' , 'json' );

$dumpData = readJson( $path );

echo $dumpData;


?>