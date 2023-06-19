const express = require('express');
const router = express.Router();

//Get, obtener todos los usuarios

router.get('/', (req, res) => {
    res.send('Get all collection users');
});

//Get, obtener un único usuario por su id
router.get('/:id', (req, res) => {
    res.send(`Get one user ${req.params.id}`);
});

//crear un usuario 
router.post('/', (req, res) => {
    console.log(req.body);
    res.send(`POST one user ${req.body.name}`);
});

//eliminar un usuario
router.delete('/:id', (req, res) => {
    res.send(`DELETE one user ${req.params.id}`);
});

//actualizar un usuario
router.patch('/:id', (req, res) => {
    res.send(`PATCH one user ${req.params.id}`);
});

module.exports = router;