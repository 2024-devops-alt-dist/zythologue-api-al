import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config()

import { connectDB, db } from './config/dbConfig';
import beerRoutes from './routes/beerRoutes';

const app: Application = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/api', beerRoutes);

connectDB()
    .then(() => {
        console.log("Connexion à PostgreSQL réussie");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => console.error("Erreur de connexion à PostgreSQL", err));