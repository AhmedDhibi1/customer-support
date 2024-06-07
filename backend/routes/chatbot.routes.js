
const express = require('express');
const { col } = require('sequelize');
const router = express.Router();
const ollama = require('ollama').default;

router.post('/', async (req, res) => {
    try {
        console.log(`Running prompt...`)
        const response = await ollama.chat({
            model: 'llama2',
            messages: [{ role: 'user', content: req.body.prompt}],
        });
        res.json(response.message.content); 
    } catch (error) {
        console.log(`Query failed!`)
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

router.post('/CHAT', async (req, res) => {
    try {
        console.log(req.body)
        console.log(`Running prompt...`)
        res.json({message: "Hello"}); 
    } catch (error) {
        console.log(`Query failed!`)
        console.error(error);
        res.status(500).send('Error occurred');
    }
});
module.exports = router;