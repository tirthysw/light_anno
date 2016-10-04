
import os
import sys
import sqlite3

def connectDB(dbName=None,dbPath=None):
	
	if dbName == None or dbPath == None:
		dbName = './sql/testDB.sqlite3';
		dbPath = 'C:/xampp/htdocs/lightnote';
	
	con = sqlite3.connect(os.path.join(dbPath,dbName)); 
	return con

	
#may raise EXCEPTION
def queryDB(query,con=None,dbName=None,dbPath=None):
	
	if con == None:
		con = connectDB(dbName,dbPath);
		
	#with con:
	cur = con.cursor()	  
	cur.execute(query)
	cur = cur.fetchone()
	return cur;


if __name__ == '__main__':
	
	rootdir = 'C:/xampp/htdocs/'
	projdir = 'anno/heavynote/'
	dbName = 'testDB.sqlite3';
	dbPath = os.path.join(rootdir,projdir,'sql/',dbName);
	con = sqlite3.connect(os.path.join(dbPath,dbName)); 

	
	#dirpath = os.path.dirname(os.getcwd()).replace('\\', '/').find('Image');
	dirpath = 'Image/room_anno/indoor_data/has_ceil'
 
	lsfile = open( os.path.join(rootdir,"DATASET",dirpath,"list.txt"))
	
	query =	 'INSERT INTO dirlist ( "dir_path" ) VALUES("{0}")'.format( dirpath )

	#
	res = queryDB(query,con)

	
	query = 'SELECT last_insert_rowid();'
	
	id = queryDB('SELECT id FROM "{0}" WHERE "dir_path" = "{1}" ;'.format( 'dirlist' ,	dirpath ) , con)
	
	res = queryDB(query,con);

	print 'dir_id='+str(res)

	if res == None:
		print 'Failed :' + res 
		sys.exit(1)
	
	dir_id= res[0];

	for line in lsfile:
		unixline = line.replace('\\', '/')
		dirpath.replace('\\','/')
		list = unixline.split(' ')
		
		print '>> {0}/{1}'.format( dirpath ,unixline)
		query='INSERT INTO imglist ( "file_name" ,"dir_id" ) VALUES("{0}","{1}")'.format(unixline , dir_id ); 
		res = queryDB(query,con);
	
	print 'done'
	
	
	
	#save the change
	
	#con.commit()
	
	con.close()
	
	