'''
Created on 2012/9/12

@author: Tirth Wong
'''

import sqlite3,os


myDebugON=0;


def connectDB(dbName=None,dbPath=None):
    
    if dbName == None:
        dbName= 'test_04.sqlite';
        # read sql commands
        
        dbPath= 'D:\\dropbox\\dropbox\\paper_project.sync\\image_enhance\\sqlite3_database';
    
    con = sqlite3.connect(os.path.join(dbPath,dbName)); 
    return con

def createDB(sqlFile,dbName=None,dbPath=None):
    # connect DB test03
    con = connectDB(dbName,dbPath); 
    with open(dbPath+sqlFile, 'r') as f:
        alltext = f.read();
    
    with con:
        cur = con.cursor()    
        #cur.execute("SELECT * FROM Cars")
        cur.executescript(alltext)
        while True:
            row = cur.fetchone()
            
            if row == None:
                break
                
            print row[0], row[1], row[2]
    
        con.commit()

def queryDB(query,dbName=None,dbPath=None):
    con = connectDB(dbName,dbPath);
    
    with con:
        cur = con.cursor()    
        cur.execute(query)
        
    return cur;

def getFuncID(scirptName,dbName=None,dbPath=None ):
    
    q1 = 'SELECT id FROM [function] WHERE [script_filename] ="{0}"'.format( scirptName ) ;
    
    cur=queryDB(q1,dbName,dbPath) ;
    id = cur.fetchone()
    
    if id != None:
        return id[0]
    else :
        return None

def execScripts( scripts , connect ):
    
    cur = connect.cursor()   
    
    cur.executescript(scripts)
    
    return cur.fetchall()
    
def getImageIdByPath( imgDir , imgName ):
    
    query = 'SELECT id FROM image \
     WHERE "dir_path" = "{0}" and "filename"="{1}"'.format(imgDir,imgName);
    if myDebugON :
        print query;
        
    id= queryDB(query).fetchone()
    if id != None :
        id = id[0]
    
    return id;

def execScrAndGetLastID( scripts ,table_name,dbName=None,dbPath=None):
    con = connectDB(dbName,dbPath);
    
    with con:
        results = execScripts(scripts,con)
        print 'SQL> exec result:',results
    
    id = queryDB('SELECT MAX([id]) FROM "{0}" ;'.format(table_name , )).fetchone()
        
    if id != None:
        id = id[0];

    return id
        

if __name__ == '__main__':
    
    dbName= 'test03.db';
    # read sql commands
    sqlFile ='create_table.sql';
    
    dbPath= 'D:\\dropbox\\dropbox\\paper_project.sync\\image_enhance\\sqlite3_database';
    
    sqlFile ='create_table.sql';
    print getFuncID('scanlineSample.m',dbName, dbPath);
    
    print execScrAndGetLastID('select * from function','function');
    
    
    