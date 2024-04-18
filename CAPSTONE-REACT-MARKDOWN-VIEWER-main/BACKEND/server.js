const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Define a schema for Markdown data
const markdownSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
});

// Create a model
const Markdown = mongoose.model('Markdown', markdownSchema);

// Define routes
app.get('/api/markdown', async (req, res) => {
    try {
        const markdowns = await Markdown.find();
        res.json(markdowns);
    } catch (error) {
        console.error('Error fetching markdown:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
