const mysql = require("mysql");
const util = require('util');


// ============ development lokal ============= //

// const koneksi = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "todolist",
//   connectionLimit: 100,
//   multipleStatements: true
// })

// ====================================================== //

// ============ development server ============= //

// menggunakan createPool untuk auto handling error connection lost
const koneksi = mysql.createPool({
  host: "remotemysql.com",
	user: "s6vhBzKB10",
	password: "EubfA8eU0x",
	database: "s6vhBzKB10",
  connectionLimit: 100,
  multipleStatements: true
})


// Ping database to check for common exception errors.
koneksi.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('koneksi database berhenti (CLOSED CONNECTION).')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('database menerima terlalu banyak koneksi (MANY CONNECTION).')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('koneksi database ditolak (REFUSED CONNECTION).')
    }
    if(err) throw err;
  }

  if (connection){
    connection.release()
    console.log('Database terkoneksi');
  }

  return
})

// Promisify for Node.js async/await.
koneksi.query = util.promisify(koneksi.query)

// ========================================================= //


module.exports = koneksi;
