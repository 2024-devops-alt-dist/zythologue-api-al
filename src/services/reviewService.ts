import { Review } from "../models/Review";
import { db } from "../config/dbConfig";

export class ReviewService {

    public findAll(): Promise<Review[] | any> {
        const query = 'SELECT * FROM review'
        return db.query(query);
    }

    public findOne(id: number): Promise<Review | any> {
        const query = 'SELECT * FROM review WHERE review_id = $1';
        return db.query(query, [id]);
    }

    public create(review: Review): Promise<Review | any> {
        const query = 'INSERT INTO review (user_id, beer_id, rate, comment, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        return db.query(query, [
            review.userId,
            review.beerId,
            review.rate,
            review.comment,
            review.createdAt
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE review SET ' + property + ' = $1 WHERE review_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM review WHERE review_id = $1';
        return db.query(query, [id]);
    }
}