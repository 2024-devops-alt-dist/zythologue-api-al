import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config()

export const db = new Pool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // port: parseInt(process.env.DB_PORT!),
    // max: 20,
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
    connectionString: process.env.DATABASE_URL
});

export const connectDB = async (): Promise<void> => {
    try {
      const client = await db.connect();  // Récupérer une connexion depuis le pool
      console.log('Connexion à PostgreSQL réussie');
      client.release(); // Libérer la connexion après utilisation
    } catch (error) {
      console.error('Erreur de connexion à PostgreSQL', error);
      process.exit(1); // Terminer l'application en cas d'erreur de connexion
    }
};