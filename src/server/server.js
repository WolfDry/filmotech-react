import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const port = 3000;

// MongoDB Connection
const uri = 'mongodb+srv://filmotech:jn2U5c4x5zNw8Knt@filmotech.roycvfe.mongodb.net/filmotech?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

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

// Configure body-parser to accept larger payloads
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit according to your needs
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors(corsOptions));

// Example route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
    const db = client.db();
    const collection = db.collection('cinema');
    const data = await collection.find({}).toArray();
    res.json(data);
});

// Example route to fetch data from MongoDB
app.post('/api/insert', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('cinema');
        const data = req.body; // Assuming data is sent as JSON in the request body
        const result = await collection.insertMany(data);
        res.json({ message: `${result.insertedCount} documents inserted` });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
