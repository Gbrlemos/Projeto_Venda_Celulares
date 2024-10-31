const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

//GET - Todas as alocações
router.get('/', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM alocacao');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }

});

router.get('/:area', async (req, res) => {
    const area = req.params.area; // Obtém o parâmetro da área
    try {
        // Consulta para pegar os celulares alocados na área
        const [rows] = await pool.query(
            `SELECT c.modelo_celular, c.preco_celular, a.quantidade 
             FROM alocacao a 
             JOIN celulares c ON a.celular_id_celular = c.id_celular 
             WHERE a.area = ?`, 
            [area]
        );
        res.json(rows); // Retorna os dados como JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;