import express from 'express';
import { connectMongoDB } from './config.js';
import youtubeRoutes from "./routes/youtubeRoutes.js";
import authentication from './routes/authentication.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Conectar a MongoDB
connectMongoDB();

app.use(cors());

// Middleware para JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/users', authentication);

app.use("/api", youtubeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

