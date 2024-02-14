import { readFileSync } from "fs"
import { Client } from 'ssh2';
import mysql from 'mysql2/promise';
import { getHost, getUser, getPassword, getDatabase, getSshHost, getSshUser, getSshPrivateKey } from './../config/database.js'

const dbServer = {
    host: getHost(),
    port: 3306,
    user: getUser(),
    password: getPassword(),
    database: getDatabase()
}

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

const getDb = new Promise(function(resolve, reject) {
    const ssh : Client = new Client();

    ssh.on('ready', () => {
        console.log('Client :: ready');

        ssh.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            async (err, stream) => {
                const updatedDbServer = {...dbServer, stream};

                // create the connection
                const connection = await mysql.createConnection(updatedDbServer);

                resolve(connection);

                // send connection back in variable depending on success or not
                //connection.connect(function(err) {
                //    if (err) {
                //        resolve(connection);
                //    } else {
                //        reject(err);
                //    }
                //});

                
                //const sql: string = `SELECT * FROM store_website`

                // query database
                //const [rows, fields] = await connection.execute(sql, ['Morty', 14]);

                //console.log(fields); 
                //console.log(rows);
            
                connection.destroy();

                console.log('destroy');
                ssh.end();
            });

    })
    .connect({
        host: getSshHost(),
        port: 22,
        username: getSshUser(),
        privateKey: readFileSync(getSshPrivateKey())
    });
});


export { getDb }