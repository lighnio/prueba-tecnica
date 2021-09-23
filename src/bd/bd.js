const mysql = require('mysql');
const { connect } = require('../routes');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

// Checking Connection
const conectionDB = () =>{
    conn.connect(err => {
    if(err) throw err;
    console.log('BD is connected');
});
}

// METHODS

// const methodQuery = async(query, method) => {
    
//     var response = {"s": "s"};
//     conn.query(query, (err, res) => {
//         if (err) throw err;
//         if (res.length < 0){
//             response = res;
//         } else {
//             response = {};
//         }
        

//     return response;
// });
// }

exports.conn = conn;
exports.conectionDB = conectionDB;
// exports.methodQuery = methodQuery;