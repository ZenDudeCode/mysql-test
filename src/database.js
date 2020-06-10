// este archivo tiene la conexión con la base de datos
const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            Console.console.error('DATABASE CONNECTION HAS BEEN CLOSED');
        }   
        if(err.code === 'ER_CON_COUNT_ERROR'){
            Console.console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            Console.console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is connected');
    return;
})

// promisify Pool Query estamos convirtiendo promesas  en call backs para hacer consultas
pool.query = promisify(pool.query);

module.exports = pool;
