var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",  // assign your host name
    user: "root",   // assign your database username
    password: "password", // assign your database password
});

conn.connect(function (err) {        //Connecting to the database
    if (err) throw err;             //If error occurs, throw error
    conn.query("CREATE DATABASE IF NOT EXISTS memes", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    conn.query("USE memes", function (err, result) {
        if (err) throw err;
        console.log("Database connected");
    });
    var sql = `CREATE TABLE IF NOT EXISTS meme (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        url VARCHAR(2000),
        caption VARCHAR(120),
        posted_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        favorite BOOLEAN DEFAULT FALSE,
        likes INT DEFAULT 0,
        dislikes INT DEFAULT 0
    )`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table 1 created");
    });
    var sql2 = `CREATE TABLE IF NOT EXISTS comment (
        cmnt_id INT AUTO_INCREMENT,
        id INT,
        cmnt VARCHAR(120),
        FOREIGN KEY (id)
            REFERENCES meme(id) ON DELETE CASCADE,
        PRIMARY KEY(cmnt_id, id, cmnt)
    )`;
    conn.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Table 2 created");
    });
    console.log('Database is connected successfully !');    //If conncetion is succesfully made, print it on the console
});

module.exports = conn;  //Exporting the conn function