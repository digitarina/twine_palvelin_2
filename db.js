(function(){

    'use strict';

    const mysql = require('mysql');

    var pool;

    const connectDatabase = ()=>{

        if (!pool) {
            pool = mysql.createPool({
                connectionLimit : 100    ,
                host            : 'localhost',
                user            : 'root',
                password        : '',
                database        : 'twine_stories'
            });
        }
        pool.on('enqueue', function () {
            console.log('Waiting for available connection slot');
        });
        pool.on('acquire', function (connection) {
            console.log('Connection %d acquired', connection.threadId);
        });
        pool.on('release', function (connection) {
            console.log('Connection %d released', connection.threadId);

        });


        return pool;
    }    
    
    module.exports = connectDatabase();

})();

