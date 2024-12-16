import { Beer } from "../models/Beer";
import { db } from "../config/dbConfig";

let beer: Beer = {
    id: 1, 
    breweryId: 1, 
    categoryId: 1,
    name: 'test',
    description: 'test',
    abv: 5.2,
    ibu: 20
};

export class BeerService {

    public findAll(): Promise<Beer[] | any> {
        const query = 'SELECT * FROM beer'
        return db.query(query);
    }

    public findOne(id: number): Promise<Beer | any> {
        const query = 'SELECT * FROM beer WHERE beer_id = $1';
        return db.query(query, [id]);
    }

    public create(beer: Beer): Promise<Beer | any> {
        const query = 'INSERT INTO beer (brewery_id, category_id, name, description, abv, ibu) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        return db.query(query, [
            beer.breweryId, 
            beer.categoryId, 
            beer.name, 
            beer.description, 
            beer.abv, 
            beer.ibu
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE beer SET ' + property + ' = $1 WHERE beer_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM beer WHERE beer_id = $1';
        return db.query(query, [id]);
    }
}