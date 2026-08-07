const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// Handle new orders submitted from order.html
app.post('/order', (req, res) => {
  const { name, phone, address, item, quantity } = req.body || {};

  if (!name || !phone || !address || !item || !quantity) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  const order = {
    id: Date.now().toString(36),
    name: String(name).trim(),
    phone: String(phone).trim(),
    address: String(address).trim(),
    item: String(item).trim(),
    quantity: qty,
    status: 'received',
    createdAt: new Date().toISOString()
  };

  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);

  console.log('New order received:', order);

  res.status(201).json({
    message: `Thanks ${order.name}! Your order for ${qty} x ${order.item} has been received.`,
    orderId: order.id
  });
});

// Simple endpoint to view all orders (useful for you, not linked from the site)
app.get('/orders', (req, res) => {
  res.json(readOrders());
});

app.listen(PORT, () => {
  console.log(`Spicy Hut server running at http://localhost:${PORT}`);
});
