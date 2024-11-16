const receiptStore = {};

function storeReceipt(id, points) {
    receiptStore[id] = points;
}

function getReceipt(id) {
    return receiptStore[id];
}

module.exports = { storeReceipt, getReceipt };
