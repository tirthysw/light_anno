<?php

function echoBR(){
	echo '<br/>';
}
function nocache(){
	header("Pragma: no-cache");
	header("cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
}
// get imglist start form [sid , end_id ]
// use number of retrived rows to get the end_id
function getImglist( $startID, $num ){
	$query_str='';
	
	try { 
		$file_db = new PDO('sqlite:./sql/testDB.sqlite3');
		 
		// Set errormode to exceptions
		$file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query_str = 'SELECT i.id , i.file_name, d.dir_path FROM imglist as i, dirlist as d  ' . 
				' WHERE i.dir_id = d.id '.
				' and i.id >= '. strval($startID) . ' ORDER BY i.id  LIMIT  ' . $num;
				
		$res = $file_db->query( $query_str );
 
		$result = $res->fetchAll(PDO::FETCH_BOTH);
		$file_db = null;
		
		return $result;
				
	}catch(PDOException $e) {
		// Print PDOException message
		
		echo '<br/>'. $query_str;
		echo $e->getMessage();
	}
}
 

function getAnnoImglist( $startID, $lastID , $annotated=0 , $limit=100){
	
	$query_str='';
 

	try { 

		$file_db = new PDO('sqlite:./sql/testDB.sqlite3');
		// Set errormode to exceptions
		$file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query_str = 'SELECT i.id , i.file_name, d.dir_path FROM imglist as i, dirlist as d  ' . 
				' WHERE i.dir_id = d.id '.
				' and i.id >= ' . strval($startID).
				' and i.id <= ' . strval($lastID) .
				' and i.annotated = '. strval($annotated) .
				' ORDER BY i.id  LIMIT  ' . strval($limit);
		
		$res = $file_db->query( $query_str );
				
		$result = $res->fetchAll(PDO::FETCH_BOTH);
		
			
		/*
		print '<pre>';	
		foreach($result as $row) {
			print_r($row); 
		}		
		print '</pre>';
		*/
		$file_db=null;
		return $result;
			
	}catch(PDOException $e) {
		// Print PDOException message
		echo $e->getMessage();
		echo '<br/>'. $query_str;
		
	}

}

function getALLAnnoImglist(){
	
	$query_str='';
 

	try { 

		$file_db = new PDO('sqlite:./sql/testDB.sqlite3');
		// Set errormode to exceptions
		$file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query_str = 'SELECT i.id , i.file_name, d.dir_path FROM imglist as i, dirlist as d  ' . 
				' WHERE i.annotated = 1';
		
		$res = $file_db->query( $query_str );
				
		$result = $res->fetchAll(PDO::FETCH_BOTH);
		
			
		/*
		print '<pre>';	
		foreach($result as $row) {
			print_r($row); 
		}		
		print '</pre>';
		*/
		$file_db=null;
		return $result;
			
	}catch(PDOException $e) {
		// Print PDOException message
		echo $e->getMessage();
		echo '<br/>'. $query_str;
		
	}

}
function errorHeader($msg=''){
 header("HTTP/1.0 400 ".$msg);
    die();	
}

function joinPaths() {
    $args = func_get_args();
    $paths = array();
    foreach ($args as $arg) {
        $paths = array_merge($paths, (array)$arg);
    }

    $paths = array_map(create_function('$p', 'return trim($p, "/");'), $paths);
    $paths = array_filter($paths);
    return join('/', $paths);
}

function getImageOutputPath(  $image_file_path , $output_category , $output_ext )
{ 
	if( is_null($image_file_path) || empty($image_file_path)   ){
		errorHeader("Invalid image_file_name at handle->". $output_category ." :(" . $image_file_path 
				. ") , " . is_null($image_file_path)  . " , " . empty($image_file_path)   
		);
		die();
	}
	
	$path_parts = pathinfo($image_file_path);
	
	$dir = $path_parts['dirname'] ;
	//extract the part 'Image/aaa/bbb/ccc/ddd/imgname.ext'
	$pos = strpos($dir,'Image/');

	$realdir = substr($dir,$pos);
	
	//$path_parts['basename'] ;
	$ext = $path_parts['extension'] ;
	$fname = $path_parts['filename'] ;
	
	$real_path = './results/'.$realdir.'/'. $output_category .'/'.$fname.'_ext_' . $ext .'__.' .$output_ext ; 
	return $real_path;
} 

function readJson( $path)
{
	if (!$handle = fopen($path, 'r')) {
		errorHeader("Cannot open file at <".$path .'>', 'w');
		die();
	}
	$contents = fread($handle, filesize($path) );
	if ( $contents === FALSE) {
		errorHeader("Cannot read to file   <".$path .'>');
		die();
	}
	
	fclose($handle);
	//$jsonencode= json_encode( $contents );
	
	return $contents;
}

function writeJson( $data ,$path)
{

	if (!$handle = fopen($path, 'w')) {
		errorHeader("Cannot open file at <".$path .'>', 'w');
		die();
	}

	if (fwrite($handle, $data) === FALSE) {
		errorHeader("Cannot write to file   <".$path .'> :' . print_r($data,true) );
		die();
	}
	
	fclose($handle);
}

class XMLSerializer {

    // functions adopted from http://www.sean-barton.co.uk/2009/03/turning-an-array-or-object-into-xml-using-php/

    public static function generateValidXmlFromObj(stdClass $obj, $node_block='nodes', $node_name='node') {
        $arr = get_object_vars($obj);
        return self::generateValidXmlFromArray($arr, $node_block, $node_name);
    }

    public static function generateValidXmlFromArray($array, $node_block='nodes', $node_name='node') {
        $xml = '<?xml version="1.0" encoding="UTF-8" ?>';

        $xml .= '<' . $node_block . '>';
        $xml .= self::generateXmlFromArray($array, $node_name);
        $xml .= '</' . $node_block . '>';

        return $xml;
    }

    private static function generateXmlFromArray($array, $node_name) {
        $xml = '';

        if (is_array($array) || is_object($array)) {
            foreach ($array as $key=>$value) {
                if (is_numeric($key)) {
                    $key = $node_name;
                }

                $xml .= '<' . $key . '>' . self::generateXmlFromArray($value, $node_name) . '</' . $key . '>';
            }
        } else {
            $xml = htmlspecialchars($array, ENT_QUOTES);
        }

        return $xml;
    }

}

/* print the contents of a url */
function print_r_xml($arr,$wrapper = 'data',$cycle = 1)
{
  //useful vars
  $new_line = "\n";

  //start building content
  if($cycle == 1) { $output = '<?xml version="1.0" encoding="UTF-8" ?>'.$new_line; }
  $output.= tabify($cycle - 1).'<'.$wrapper.'>'.$new_line;
  foreach($arr as $key => $val)
  {
    if(!is_array($val))
    {
      $output.= 
	  	tabify($cycle).'<'.htmlspecialchars($key).'>'.$val.'</'.htmlspecialchars($key).'>'.$new_line;
    }
    else
    {
      $output.= print_r_xml($val,$key,$cycle + 1).$new_line;
    }
  }
  $output.= tabify($cycle - 1).'</'.$wrapper.'>';

  //return the value
  return $output;
}

/* tabify */
function tabify($num_tabs)
{ 

  $return='';
  for($x = 1; $x <= $num_tabs; $x++) { $return.= "\t"; }
  return $return;
}


 
?>