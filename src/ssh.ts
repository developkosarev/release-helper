import { readFileSync } from "fs"
import { Client } from 'ssh2'
import mysql from 'mysql2/promise'
import { getHost, getUser, getPassword, getDatabase, getSshHost, getSshUser, getSshPrivateKey } from './config/database.js'
import { WebsiteRepository } from "./repository/WebsiteRepository.js";
import { Website } from "./entities/Website.js";

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

const connect = async (): Promise<void> => {
    const conn : Client = new Client();

    conn.on('ready', () => {
        console.log('Client :: ready');

        conn.exec('uptime', (err, stream) => {
            console.log('update');
            if (err) throw err;
            
            stream.on('close', (code: string, signal: string) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data: any) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);
            });
        });

        conn.exec('pwd', (err, stream) => {
            console.log('update');
            if (err) throw err;
            
            stream.on('close', (code: string, signal: string) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data: any) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);

            });
        });

    })
    .connect({
        host: getSshHost(),
        port: 22,
        username: getSshUser(),
        privateKey: readFileSync(getSshPrivateKey())
    });

    console.log('Connect');
}


const connectMysql = async (): Promise<void> => {
    const conn : Client = new Client();

    conn.on('ready', () => {
        console.log('Client :: ready');

        conn.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            async (err, stream) => {
                //console.log(stream);
                
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };

                // create the connection
                const connection = await mysql.createConnection(updatedDbServer);

                const repo : WebsiteRepository = new WebsiteRepository(connection);
                const result: Website = await repo.findOne(1);
                console.log(result)

                connection.destroy();

                console.log('destroy');
                conn.end();
            });

    })
    .connect({
        host: getSshHost(),
        port: 22,
        username: getSshUser(),
        privateKey: readFileSync(getSshPrivateKey())
    });

    console.log('Connect');
}

//await connect();
await connectMysql();
