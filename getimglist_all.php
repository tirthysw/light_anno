<?php
 
require_once('./phplib.php');


$annolist = getALLAnnoImglist();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Allocate</title>
</head> 

<body>  
<?php  
echo "<table border='1' width='600'  >"; 
echo "<tr> <th width='80'>ID</th> <th> RESULT URL</th></tr>";
foreach($annolist as $row) {
	
	$url= joinPaths($row['dir_path'],$row['file_name']) ;
	$viewUrl = 'savemode.html?img=' . $url.'&imid='.$row['id'] . '&dbsid=1&dbnum=10';
	
	$viewhtml = '<a href="'.$viewUrl.'"  target=_blank > '.'click to view'. '</a>';
	
	echo "<tr align='center'>";
	echo "<td>".$row['id']."</td>"; 
	echo "<td>".$viewhtml . "</td>";
	echo "</tr>"; 
}
echo "</table>";

?>
</div>

</body>
</html>
