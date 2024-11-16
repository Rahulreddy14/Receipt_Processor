const express = require('express');
const { processReceipt, getPoints } = require('../services/receiptService');
const router = express.Router();

// POST /receipts/process
router.post('/process', (req, res) => {
    try {
        const receipt = req.body;
        const receiptId = processReceipt(receipt);
        res.status(200).json({ id: receiptId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /receipts/:id/points
router.get('/:id/points', (req, res) => {
    const receiptId = req.params.id;
    const points = getPoints(receiptId);

    if (points !== undefined) {
        res.status(200).json({ points });
    } else {
        res.status(404).json({ error: 'Receipt not found' });
    }
});

module.exports = router;
