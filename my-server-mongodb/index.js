const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function connectDB() {

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("PandaStore");

    const productsCollection    = database.collection("products");
    const categoriesCollection  = database.collection("categories");
    const customersCollection   = database.collection("customers");
    const employeesCollection   = database.collection("employees");
    const ordersCollection      = database.collection("orders");
    const orderDetailsCollection = database.collection("orderDetails");

    /* ================================================
       AUTH
    ================================================ */

    // POST /auth/login
    app.post("/auth/login", async (req, res) => {
        try {
            const { username, password } = req.body;

            // Tìm trong customers trước
            let user = await customersCollection.findOne({ username });
            let role = 'customer';

            // Nếu không có thì tìm trong employees
            if (!user) {
                user = await employeesCollection.findOne({ username });
                role = 'employee';
            }

            if (!user) {
                return res.status(401).json({ message: 'Username not found' });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: 'Wrong password' });
            }

            res.json({
                message: 'Login successful',
                user: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /auth/register-customer
    app.post("/auth/register-customer", async (req, res) => {
        try {
            const existing = await customersCollection.findOne({ username: req.body.username });
            if (existing) return res.status(400).json({ message: 'Username already exists' });
            const result = await customersCollection.insertOne(req.body);
            res.json({ message: 'Registered successfully', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       PRODUCTS
    ================================================ */

    // GET /products  (with optional search: ?minPrice=&maxPrice=&category=)
    app.get("/products", async (req, res) => {
        try {
            const { minPrice, maxPrice, category } = req.query;
            const filter = {};

            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = parseFloat(minPrice);
                if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
            }

            if (category && category !== 'all') {
                filter.category_Id = category;
            }

            const data = await productsCollection.find(filter).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET /products/:id
    app.get("/products/:id", async (req, res) => {
        try {
            const data = await productsCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!data) return res.status(404).json({ message: 'Product not found' });
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /products
    app.post("/products", async (req, res) => {
        try {
            const result = await productsCollection.insertOne(req.body);
            res.json({ message: 'Product created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /products/:id
    app.put("/products/:id", async (req, res) => {
        try {
            const result = await productsCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'Product updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /products/:id
    app.delete("/products/:id", async (req, res) => {
        try {
            const result = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'Product deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       CATEGORIES
    ================================================ */

    // GET /categories
    app.get("/categories", async (req, res) => {
        try {
            const data = await categoriesCollection.find().toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET /categories/:id
    app.get("/categories/:id", async (req, res) => {
        try {
            const data = await categoriesCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!data) return res.status(404).json({ message: 'Category not found' });
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /categories
    app.post("/categories", async (req, res) => {
        try {
            const result = await categoriesCollection.insertOne(req.body);
            res.json({ message: 'Category created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /categories/:id
    app.put("/categories/:id", async (req, res) => {
        try {
            const result = await categoriesCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'Category updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /categories/:id
    app.delete("/categories/:id", async (req, res) => {
        try {
            const result = await categoriesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'Category deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       CUSTOMERS
    ================================================ */

    // GET /customers
    app.get("/customers", async (req, res) => {
        try {
            const data = await customersCollection.find().toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET /customers/:id
    app.get("/customers/:id", async (req, res) => {
        try {
            const data = await customersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!data) return res.status(404).json({ message: 'Customer not found' });
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /customers
    app.post("/customers", async (req, res) => {
        try {
            const result = await customersCollection.insertOne(req.body);
            res.json({ message: 'Customer created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /customers/:id
    app.put("/customers/:id", async (req, res) => {
        try {
            const result = await customersCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'Customer updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /customers/:id
    app.delete("/customers/:id", async (req, res) => {
        try {
            const result = await customersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'Customer deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       EMPLOYEES
    ================================================ */

    // GET /employees
    app.get("/employees", async (req, res) => {
        try {
            const data = await employeesCollection.find().toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /employees
    app.post("/employees", async (req, res) => {
        try {
            const result = await employeesCollection.insertOne(req.body);
            res.json({ message: 'Employee created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /employees/:id
    app.put("/employees/:id", async (req, res) => {
        try {
            const result = await employeesCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'Employee updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /employees/:id
    app.delete("/employees/:id", async (req, res) => {
        try {
            const result = await employeesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'Employee deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       ORDERS
    ================================================ */

    // GET /orders  (optional: ?customerId=)
    app.get("/orders", async (req, res) => {
        try {
            const filter = {};
            if (req.query.customerId) filter.customerId = req.query.customerId;
            const data = await ordersCollection.find(filter).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET /orders/:id
    app.get("/orders/:id", async (req, res) => {
        try {
            const data = await ordersCollection.findOne({ _id: new ObjectId(req.params.id) });
            if (!data) return res.status(404).json({ message: 'Order not found' });
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /orders
    app.post("/orders", async (req, res) => {
        try {
            const order = { ...req.body, createdAt: new Date() };
            const result = await ordersCollection.insertOne(order);
            res.json({ message: 'Order created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /orders/:id  (update status: pending → paid)
    app.put("/orders/:id", async (req, res) => {
        try {
            const result = await ordersCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'Order updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /orders/:id
    app.delete("/orders/:id", async (req, res) => {
        try {
            const result = await ordersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'Order deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       ORDER DETAILS
    ================================================ */

    // GET /orderdetails  (optional: ?orderId=)
    app.get("/orderdetails", async (req, res) => {
        try {
            const filter = {};
            if (req.query.orderId) filter.orderId = req.query.orderId;
            const data = await orderDetailsCollection.find(filter).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST /orderdetails
    app.post("/orderdetails", async (req, res) => {
        try {
            const result = await orderDetailsCollection.insertOne(req.body);
            res.json({ message: 'OrderDetail created', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // PUT /orderdetails/:id
    app.put("/orderdetails/:id", async (req, res) => {
        try {
            const result = await orderDetailsCollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.json({ message: 'OrderDetail updated', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE /orderdetails/:id
    app.delete("/orderdetails/:id", async (req, res) => {
        try {
            const result = await orderDetailsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ message: 'OrderDetail deleted', result });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    /* ================================================
       REVENUE & VIP (Employee only)
    ================================================ */

    // GET /revenue?year=2024
    app.get("/revenue", async (req, res) => {
        try {
            const year = parseInt(req.query.year) || new Date().getFullYear();
            const data = await ordersCollection.aggregate([
                { $match: {
                    status: 'paid',
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }},
                { $group: {
                    _id: { $month: '$createdAt' },
                    revenue: { $sum: '$totalAmount' },
                    orderCount: { $sum: 1 }
                }},
                { $sort: { '_id': 1 } }
            ]).toArray();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // GET /vip-customers?n=5
    app.get("/vip-customers", async (req, res) => {
        try {
            const n = parseInt(req.query.n) || 5;
            const data = await ordersCollection.aggregate([
                { $match: { status: 'paid' } },
                { $group: {
                    _id: '$customerId',
                    totalSpent: { $sum: '$totalAmount' },
                    orderCount: { $sum: 1 }
                }},
                { $sort: { totalSpent: -1 } },
                { $limit: n }
            ]).toArray();

            // Enrich with customer info
            const enriched = await Promise.all(data.map(async (item) => {
                let customer = null;
                try {
                    customer = await customersCollection.findOne({ _id: new ObjectId(item._id) });
                } catch (_) {}
                return { ...item, customer };
            }));

            res.json(enriched);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

}

connectDB().catch(console.error);

/* ================================================
   TEST SERVER
================================================ */

app.get("/", (req, res) => {
    res.send(`
        <h2>🐼 Panda Store API</h2>
        <p>Server running on port ${port}</p>
        <ul>
            <li>GET /products</li>
            <li>GET /categories</li>
            <li>GET /customers</li>
            <li>GET /employees</li>
            <li>GET /orders</li>
            <li>GET /orderdetails</li>
            <li>POST /auth/login</li>
            <li>GET /revenue?year=2024</li>
            <li>GET /vip-customers?n=5</li>
        </ul>
    `);
});

app.listen(port, () => {
    console.log(`🐼 Panda Store Server listening on port ${port}`);
});