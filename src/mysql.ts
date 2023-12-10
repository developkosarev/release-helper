//import mysql from 'mysql2';
import mysql from 'mysql2/promise';

const dbServer = {
    host: '127.0.0.1',
    port: 3306,
    user: 'db',
    password: 'db',
    database: 'db'
}

const connect = async (): Promise<void> => {
    
    // create the connection to database
    //const connection = mysql.createConnection(dbServer);
    
    // simple query
    //connection.query(
    //    'SELECT * FROM store_website',
    //        function(err, results, fields) {
    //        console.log(results); // results contains rows returned by server
    //        console.log(fields); // fields contains extra meta data about results, if available
    //    }
    //);


    // create the connection
    const connection = await mysql.createConnection(dbServer);
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM store_website', ['Morty', 14]);

    console.log(rows); 
  
    connection.destroy();

    console.log('Connect');
}

await connect();

console.log('end');
