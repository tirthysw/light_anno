<?php

require_once('./phplib.php');



function setDone( $imid ){
	$query_str='';
	
	try { 
		$file_db = new PDO('sqlite:./sql/testDB.sqlite3');
		 
		// Set errormode to exceptions
		$file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query_str = 'UPDATE imglist SET "annotated"="1" ' . 
				' WHERE id = '. strval($imid) ;

		echo $query_str;
		
		$res = $file_db->query( $query_str );
  
		$file_db = null; 
				
	}catch(PDOException $e) {
		// Print PDOException message
		
		errorHeader( $e->getMessage() .'  ' .$query_str . '  ' );
	}
}
 
//------------------------------
//mark done
//------------------------------
$outpath = getImageOutputPath( $_POST['img_src'], 'six_simple_json' , 'json' );

print_r($_POST);
$id = $_POST['im_db_id'] ;
setDone( $id ); 

?>