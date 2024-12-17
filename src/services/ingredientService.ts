import { Ingredient } from "../models/Ingredient";
import { db } from "../config/dbConfig";

export class IngredientService {

    public findAll(): Promise<Ingredient[] | any> {
        const query = 'SELECT * FROM ingredient'
        return db.query(query);
    }

    public findOne(id: number): Promise<Ingredient | any> {
        const query = 'SELECT * FROM ingredient WHERE ingredient_id = $1';
        return db.query(query, [id]);
    }

    public create(ingredient: Ingredient): Promise<Ingredient | any> {
        const query = 'INSERT INTO ingredient (name) VALUES ($1) RETURNING *'
        return db.query(query, [
            ingredient.name 
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE ingredient SET ' + property + ' = $1 WHERE ingredient_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM ingredient WHERE ingredient_id = $1';
        return db.query(query, [id]);
    }
}