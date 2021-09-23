const { Router }  = require('express');
const { conn } = require('../bd/bd');
require('../bd/bd');
const router = Router();

// Index
router.get('/', (req, res) => {
   res.json({});
});

// GET
router.get('/colaboradores', async(req, res) => {
    const query = "SELECT IDCOLABORADOR, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL FROM colaborador";
    conn.query(query, (err, results, fields)=>{
        if(err) throw err;
        res.send(results);
    });
    
});

// GET/ID
router.get('/colaboradores/:id', (req, res) => {
    const query = `SELECT IDCOLABORADOR, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL FROM colaborador WHERE IDCOLABORADOR = ${req.params.id}`;
    conn.query(query, (err, results, fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

//  POST
router.post('/colaboradores/add', (req, res) => {
    let {NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL} = req.body;
    // BAD PRACTICE, ALLOWED SQL INJECTION?
    const query = `INSERT INTO colaborador(NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL) VALUES ('${NOMBRE}', '${APELLIDO}', '${DIRECCION}', '${EDAD}', '${PROFESION}', '${ESTADOCIVIL}')`;
    conn.query(query, (err, results, fields)=>{
        if(err) throw err;
        res.json(results);
    });
});
        
//  PUT
router.put('/colaboradores/edit/:id', (req, res) => {
    // FRONTEND RESPONSE / Change for new names 
    let {E_NOMBRE, E_APELLIDO, E_DIRECCION, E_EDAD, E_PROFESION, E_ESTADOCIVIL} = req.body;
    const query = `UPDATE colaborador SET NOMBRE='${E_NOMBRE}', APELLIDO='${E_APELLIDO}', DIRECCION='${E_DIRECCION}', EDAD='${E_EDAD}', PROFESION='${E_PROFESION}', ESTADOCIVIL='${E_ESTADOCIVIL}' WHERE IDCOLABORADOR = ${req.params.id}`;
    conn.query(query, (err, results, fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

//  DELETE
router.delete('/colaboradores/delete/:id', (req, res) => {
    const query = `DELETE FROM colaborador WHERE IDCOLABORADOR=${req.params.id}`;
    conn.query(query, (err, results, fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

module.exports = router;