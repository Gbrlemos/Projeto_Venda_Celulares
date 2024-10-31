const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

//GET - Todos os celulares
router.get('/', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM celulares');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }

});



module.exports = router;