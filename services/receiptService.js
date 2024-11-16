const { v4: uuidv4 } = require('uuid');
const { storeReceipt, getReceipt } = require('../data/Storage');

function processReceipt(receipt) {
    // Validate receipt
    if (!isValidReceipt(receipt)) {
        throw new Error('Invalid receipt');
    }

    // Calculate points
    const points = calculatePoints(receipt);

    // Generate ID and store receipt
    const receiptId = uuidv4();
    storeReceipt(receiptId, points);
    return receiptId;
}

function getPoints(receiptId) {
    return getReceipt(receiptId);
}

function calculatePoints(receipt) {
    let points = 0;

    // Rule 1: One point per alphanumeric character in retailer name
    points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

    // Rule 2: 50 points if total is a round dollar amount
    const total = parseFloat(receipt.total);
    if (total === Math.floor(total)) {
        points += 50;
    }

    // Rule 3: 25 points if total is multiple of 0.25
    if (total % 0.25 === 0) {
        points += 25;
    }

    // Rule 4: 5 points for every two items
    points += Math.floor(receipt.items.length / 2) * 5;

    // Rule 5: Points for item descriptions with length multiple of 3
    receipt.items.forEach(item => {
        const descLength = item.shortDescription.trim().length;
        if (descLength % 3 === 0) {
            const price = parseFloat(item.price);
            points += Math.ceil(price * 0.2);
        }
    });

    // Rule 6: 6 points if purchase date is odd
    const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
    if (day % 2 !== 0) {
        points += 6;
    }

    // Rule 7: 10 points if purchase time is between 2pm and 4pm
    const [hour] = receipt.purchaseTime.split(':').map(Number);
    if (hour >= 14 && hour < 16) {
        points += 10;
    }

    return points;
}

function isValidReceipt(receipt) {
    return (
        typeof receipt.retailer === 'string' &&
        typeof receipt.purchaseDate === 'string' &&
        typeof receipt.purchaseTime === 'string' &&
        Array.isArray(receipt.items) &&
        receipt.items.length > 0 &&
        typeof receipt.total === 'string'
    );
}

module.exports = { processReceipt, getPoints };
