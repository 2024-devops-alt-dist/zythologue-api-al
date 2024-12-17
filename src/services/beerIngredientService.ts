import { BeerIngredient } from "../models/BeerIngredient";
import { db } from "../config/dbConfig";

export class BeerIngredientService {

    public findAll(): Promise<BeerIngredient[] | any> {
        const query = 'SELECT * FROM beer_ingredient'
        return db.query(query);
    }

    public findOne(id: number): Promise<BeerIngredient | any> {
        const query = 'SELECT * FROM beer_ingredient WHERE beerIngredient_id = $1';
        return db.query(query, [id]);
    }

    public create(beerIngredient: BeerIngredient): Promise<BeerIngredient | any> {
        const query = 'INSERT INTO beer_ingredient (beer_id, ingredient_id) VALUES ($1, $2) RETURNING *'
        return db.query(query, [
            beerIngredient.beerId, 
            beerIngredient.ingredientId, 
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE beer_ingredient SET ' + property + ' = $1 WHERE beer_ingredient_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM beer_ingredient WHERE beer_ingredient_id = $1';
        return db.query(query, [id]);
    }
}