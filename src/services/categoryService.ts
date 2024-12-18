import { Category } from "../models/Category";
import { db } from "../config/dbConfig";

export class CategoryService {

    public findAll(): Promise<Category[] | any> {
        const query = 'SELECT * FROM category'
        return db.query(query);
    }

    public findOne(id: number): Promise<Category | any> {
        const query = 'SELECT * FROM category WHERE category_id = $1';
        return db.query(query, [id]);
    }

    public create(category: Category): Promise<Category | any> {
        const query = 'INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *'
        return db.query(query, [
            category.name, 
            category.description, 
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE category SET ' + property + ' = $1 WHERE category_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM category WHERE category_id = $1';
        return db.query(query, [id]);
    }
}