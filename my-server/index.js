const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Sample database (in-memory)
const users = [
  { _id: 'cus01', username: 'customer1', password: '123456', email: 'customer1@gmail.com', name: 'Nguyen Minh Anh', phone: '0901111111', address: 'Ho Chi Minh City', role: 'customer' },
  { _id: 'emp01', username: 'emp01', password: 'admin123', email: 'admin@panda.com', name: 'Admin Panda', role: 'employee' }
];

const products = [
  { _id: 'prod01', name: 'Classic White Tee', price: 20, model: 'TS-100', made_by: 'TeeSearch Studio', category_id: 'cat01', stock: 100, image: 'https://via.placeholder.com/200?text=White+Tee' },
  { _id: 'prod02', name: 'Black Oversize Tee', price: 25, model: 'TS-101', made_by: 'TeeSearch Studio', category_id: 'cat01', stock: 80, image: 'https://via.placeholder.com/200?text=Black+Tee' },
  { _id: 'prod03', name: 'Street Hoodie', price: 45, model: 'HD-200', made_by: 'UrbanWear', category_id: 'cat02', stock: 60, image: 'https://via.placeholder.com/200?text=Hoodie' },
  { _id: 'prod04', name: 'Classic Jeans', price: 50, model: 'JN-300', made_by: 'DenimCo', category_id: 'cat03', stock: 75, image: 'https://via.placeholder.com/200?text=Jeans' },
  { _id: 'prod05', name: 'Summer Shorts', price: 30, model: 'ST-400', made_by: 'SnapWear', category_id: 'cat03', stock: 90, image: 'https://via.placeholder.com/200?text=Shorts' }
];

const categories = [
  { _id: 'cat01', name: 'T-Shirts', description: 'Casual cotton t-shirts' },
  { _id: 'cat02', name: 'Hoodies', description: 'Warm hoodies and sweatshirts' },
  { _id: 'cat03', name: 'Bottoms', description: 'Pants, jeans, and shorts' }
];

const orders = [
  { _id: 'order01', customer_id: 'cus01', items: [{ product_id: 'prod01', quantity: 2, price: 20 }], total_amount: 65, status: 'paid', order_date: '2026-03-01' },
  { _id: 'order02', customer_id: 'cus02', items: [{ product_id: 'prod02', quantity: 1, price: 25 }], total_amount: 45, status: 'paid', order_date: '2026-03-02' },
  { _id: 'order03', customer_id: 'cus03', items: [{ product_id: 'prod03', quantity: 1, price: 45 }], total_amount: 70, status: 'pending', order_date: '2026-03-03' },
  { _id: 'order04', customer_id: 'cus01', items: [{ product_id: 'prod05', quantity: 1, price: 50 }], total_amount: 50, status: 'paid', order_date: '2026-03-05' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Panda Store RESTful API - Welcome!' });
});

// ========================
// AUTH ENDPOINTS
// ========================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ 
      user: userWithoutPassword,
      token: `token_${user._id}_${Date.now()}`
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, password, name, phone, address, role } = req.body;
  
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }
  
  const newUser = {
    _id: `cus${Math.random().toString(36).substr(2, 9)}`,
    username,
    email,
    password,
    name,
    phone: phone || '',
    address: address || '',
    role: role || 'customer'
  };
  
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ 
    user: userWithoutPassword,
    token: `token_${newUser._id}_${Date.now()}`
  });
});

// ========================
// PRODUCT ENDPOINTS
// ========================
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/products/search/price', (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || 99999;
  
  const filtered = products.filter(p => p.price >= min && p.price <= max);
  res.json(filtered);
});

app.get('/api/products/category/:categoryId', (req, res) => {
  const filtered = products.filter(p => p.category_id === req.params.categoryId);
  res.json(filtered);
});

// ========================
// CATEGORY ENDPOINTS
// ========================
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c._id === req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// ========================
// ORDER ENDPOINTS
// ========================
app.post('/api/orders', (req, res) => {
  const { customer_id, items, total_amount, status, order_date } = req.body;
  
  const newOrder = {
    _id: `order${Math.random().toString(36).substr(2, 9)}`,
    customer_id,
    items,
    total_amount,
    status: status || 'pending',
    order_date: order_date || new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/orders/customer/:customerId', (req, res) => {
  const customerOrders = orders.filter(o => o.customer_id === req.params.customerId);
  res.json(customerOrders);
});

app.put('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o._id === req.params.orderId);
  
  if (order) {
    order.status = req.body.status || order.status;
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// ========================
// REVENUE ENDPOINTS
// ========================
app.get('/api/revenue/stats', (req, res) => {
  const paidOrders = orders.filter(o => o.status === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const totalOrders = paidOrders.length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const uniqueCustomers = new Set(paidOrders.map(o => o.customer_id)).size;
  
  res.json({
    totalRevenue: totalRevenue.toFixed(2),
    totalOrders,
    averageOrder: averageOrder.toFixed(2),
    uniqueCustomers
  });
});

app.get('/api/revenue/year/:year', (req, res) => {
  const year = parseInt(req.params.year);
  const paidOrders = orders.filter(o => o.status === 'paid' && new Date(o.order_date).getFullYear() === year);
  
  const monthlyRevenue = {};
  paidOrders.forEach(order => {
    const month = new Date(order.order_date).getMonth() + 1;
    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = { orders: 0, revenue: 0 };
    }
    monthlyRevenue[month].revenue += order.total_amount;
    monthlyRevenue[month].orders += 1;
  });
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = Object.entries(monthlyRevenue).map(([month, data]) => ({
    month: months[parseInt(month) - 1],
    revenue: data.revenue.toFixed(2),
    orders: data.orders,
    average: (data.revenue / data.orders).toFixed(2)
  }));
  
  res.json(result);
});

app.get('/api/revenue/top-customers', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const paidOrders = orders.filter(o => o.status === 'paid');
  
  const customerSpending = {};
  paidOrders.forEach(order => {
    if (!customerSpending[order.customer_id]) {
      customerSpending[order.customer_id] = { totalSpent: 0, orders: 0 };
    }
    customerSpending[order.customer_id].totalSpent += order.total_amount;
    customerSpending[order.customer_id].orders += 1;
  });
  
  const topCustomers = Object.entries(customerSpending)
    .map(([customerId, spending]) => {
      const user = users.find(u => u._id === customerId);
      return {
        _id: customerId,
        name: user?.name || 'Unknown',
        email: user?.email || '',
        phone: user?.phone || '',
        totalSpent: spending.totalSpent.toFixed(2),
        orders: spending.orders
      };
    })
    .sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent))
    .slice(0, limit);
  
  res.json(topCustomers);
});

app.listen(port, () => {
  console.log(`🐼 Panda Store API listening on http://localhost:${port}`);
});
