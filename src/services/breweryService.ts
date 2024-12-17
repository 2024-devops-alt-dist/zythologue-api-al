import { Brewery } from "../models/Brewery";
import { db } from "../config/dbConfig";

export class BreweryService {

    public findAll(): Promise<Brewery[] | any> {
        const query = 'SELECT * FROM brewery'
        return db.query(query);
    }

    public findOne(id: number): Promise<Brewery | any> {
        const query = 'SELECT * FROM brewery WHERE brewery_id = $1';
        return db.query(query, [id]);
    }

    public create(brewery: Brewery): Promise<Brewery | any> {
        const query = 'INSERT INTO brewery (brewery_id, name, address, country, description, link, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        return db.query(query, [
            brewery.name,
            brewery.address,
            brewery.country,
            brewery.description,
            brewery.link,
            brewery.email
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE brewery SET ' + property + ' = $1 WHERE brewery_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM brewery WHERE brewery_id = $1';
        return db.query(query, [id]);
    }
}