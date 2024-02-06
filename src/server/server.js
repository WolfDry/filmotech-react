import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

// MongoDB Connection
const uri = 'mongodb+srv://filmotech:jn2U5c4x5zNw8Knt@filmotech.roycvfe.mongodb.net/filmotech?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

// Example route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
    const db = client.db();
    const collection = db.collection('cinema');
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
