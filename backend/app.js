const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const Mongoose = require('mongoose');

const itemRoutes = require('./router/itemRouter');

app.use('/api', itemRoutes);

Mongoose.connect(`mongodb+srv://nishant9:Nishant9@cluster3.13x5uc7.mongodb.net/DataTesting_1`)
const db = Mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});