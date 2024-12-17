import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config()

import { connectDB, db } from './config/dbConfig';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swaggerConfig'; // Importation de la configuration Swagger

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import ingredientRoutes from './routes/ingredientRoutes';

const app: Application = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', beerRoutes);
app.use('/api', breweryRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ingredientRoutes);

connectDB()
    .then(() => {
        console.log("Connexion à PostgreSQL réussie");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => console.error("Erreur de connexion à PostgreSQL", err));