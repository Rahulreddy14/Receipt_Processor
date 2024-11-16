const express = require('express');
const bodyParser = require('body-parser');
const receiptRoutes = require('./routes/receipts');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/receipts', receiptRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
