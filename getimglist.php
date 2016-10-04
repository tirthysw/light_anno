<?php
 
require_once('./phplib.php');

$sid =  $_GET['start_id'] ;
$num = $_GET['num'] ;


if( is_null($sid) || empty($sid)  ||  is_null($num) || empty($num)  ){

	errorHeader("Invalid _GET['start_id'] and _GET['num'] ");
	die();
}

$list = getImglist($sid,$num);

$lastId = end($list);

$lastId = $lastId['id'];

$unannolist = getAnnoImglist($sid,$lastId,0);
$annolist = getAnnoImglist($sid,$lastId,1);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Allocate</title>
</head> 

<body>
 
</br>
</br>
<div><h3><a href="./manuel/manuel.html" >Get Start Manuel</a></h3></div>
</br></br>
<h3>UnAnnotated List</h3>
<div style="float:left;width='400px'" >
<?php  
echo "<table border='1' width='400'  >"; 
echo "<tr> <th width='80'>ID</th> <th> URL</th>  </tr>";
foreach($unannolist as $row) {
	$url= joinPaths($row['dir_path'],$row['file_name']) ;
	            
	$url = 'lightDraw2.html?img=' . $url.'&imid='.$row['id'] . '&dbsid='.$sid.'&dbnum='.$num ;
	//$html = '<a href="'.$url.'" target="_blank"> '.$url. '</a>'. '<br/>';
	$html = '<a href="'.$url.'" > '.'click to add annotation'. '</a>';
	echo "<tr align='center'>";
	echo "<td>".$row['id']."</td>"; 
	echo "<td>".$html . "</td>";
	echo "</tr>"; 
}
echo "</table>";

?>
</div> &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp
<img src="manual/example.png" height='500px' style="float:auto;"/>
</br>
</br>
</br>

<div >
<h3>Annotated List</h3>
<?php  
echo "<table border='1' width='400'  >"; 
echo "<tr> <th width='80'>ID</th> <th> RESULT URL</th> <th>RE-ANNOTATE URL</th>  </tr>";
foreach($annolist as $row) {
	
	$url= joinPaths($row['dir_path'],$row['file_name']) ;
	$redoUrl = 'lightDraw2.html?img=' . $url.'&imid='.$row['id'] . '&dbsid='.$sid.'&dbnum='.$num ;
	$viewUrl = 'reloadtest.html?img=' . $url.'&imid='.$row['id'] . '&dbsid='.$sid.'&dbnum='.$num ;
	
	//$html = '<a href="'.$url.'" target="_blank"> '.$url. '</a>'. '<br/>';
	$redohtml = '<a href="'.$redoUrl.'" > '.'click to redo'. '</a>';
	$viewhtml = '<a href="'.$viewUrl.'" > '.'click to view'. '</a>';
	
	echo "<tr align='center'>";
	echo "<td>".$row['id']."</td>"; 
	echo "<td>".$viewhtml . "</td>";
	echo "<td>".$redohtml . "</td>";
	echo "</tr>"; 
}
echo "</table>";

?>
</div>

 
</body>
</html>
