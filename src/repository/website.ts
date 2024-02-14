import { getDb } from './ssh.js'

//database = require('./ssh');

//module.exports.getCats = function(req, res) {
//    // async connection to database
//    database().then(function(connection){
//        // query database 
//        connection.query('SELECT * FROM `cats`', function(error, results, fields) {
//            if (error) {
//                console.log(error);
//                return;
//            }
//            res.send(results);
//        });
//    });
//};
//
//https://medium.com/@devontem/nodejs-express-using-ssh-to-access-mysql-remotely-60372832dd08


const getWebsite = async (): Promise<void> => {
    console.log('Website Connect');

    getDb.then(function(connection: any) {
        console.log('Website Connect 2');

        const sql: string = `SELECT * FROM store_website`

        // query database
        //const [rows, fields] = connection.execute(sql, ['Morty', 14]);

        //console.log(fields); 
        //console.log(rows);
    });
}

export { getWebsite }