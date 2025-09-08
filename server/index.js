import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://aashi:1234@e-complaint.t4vkfk9.mongodb.net/?retryWrites=true&w=majority&appName=E-complaint', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Basic route
app.get('/', (req, res) => {
  res.send('E-Complaint Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
