<?php
 
require_once('./phplib.php');



function makeUrl($url , $words){
	return '<a href="'.$url.'" target="_blank"> '.$words. '</a>';
}
//force no cache
nocache();

$sid =  0 ;
$num = 300 ;


$list = getImglist($sid,$num);

$lastId = end($list);

$lastId = $lastId['id'];  

//http://127.0.0.1:4680/lightnote/getimglist.php?start_id=2&num=10

$split = (int)$_GET['split'];
if( is_null($split) || empty($split)    ){

	errorHeader("Invalid _GET['split']  ");
	die();
}

$count=1;
$sid = $list[0];

$next_start = $list[0]['id'];

echoBR();
echoBR();
echo 'output files :' ;
echo makeUrl('./results/Image/James/Indoor_data','annotation file');
echoBR();
echoBR();

foreach($list as $key=>$row) {
	
	if( $count %  $split   == 0 ){ 
 
		$no = $count/$split;
		
		$curstart = $next_start;
		$next_start = $list[$key]['id'];
		
		$link = 'getimglist.php?start_id=' . $curstart  .'&num='. $split;
		echoBR();
		echoBR(); 
		
		echo makeUrl( $link, "No.". strval( $no ) .'> ' . $link ) ;
		echoBR();
		echoBR();
		
	} 	
	
	$count = $count +1;
	 
	
	//$url= joinPaths($row['dir_path'],$row['file_name']) ;
	//$redoUrl = 'lightDraw2.html?img=' . $url.'&imid='.$row['id'] . '&dbsid='.$sid.'&dbnum='.$num ;
	//$viewUrl = 'reloadtest.html?img=' . $url.'&imid='.$row['id'] . '&dbsid='.$sid.'&dbnum='.$num ;
	
	//$redohtml = '<a href="'.$redoUrl.'" > '.'click to redo'. '</a>';
	//$viewhtml = '<a href="'.$viewUrl.'" > '.'click to view'. '</a>';
	 
	
}
 

?> 