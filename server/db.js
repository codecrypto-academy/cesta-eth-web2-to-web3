const mysql = require('mysql8')

var conexiones = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'northwind'
});

function consulta(sql, parameters) {
    return new Promise((resolve, reject) => {
        conexiones.query(sql, parameters, function (error, results, fields) {
            if (error) reject(error);
                return resolve([results, fields]);
        });
    });
}

module.exports = {
    consulta
}