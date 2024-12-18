import { User } from "../models/User";
import { db } from "../config/dbConfig";

export class UserService {

    public findAll(): Promise<User[] | any> {
        const query = 'SELECT * FROM users'
        return db.query(query);
    }

    public findOne(id: number): Promise<User | any> {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        return db.query(query, [id]);
    }

    public create(user: User): Promise<User | any> {
        const query = 'INSERT INTO users (email, password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        return db.query(query, [
            user.email, 
            user.password, 
            user.username, 
            user.firstname, 
            user.lastname
        ]);
    }

    public update(id: number, property: string, value: string): Promise<any> {
        const query = 'UPDATE users SET ' + property + ' = $1 WHERE user_id = $2 RETURNING *';
        return db.query(query, [
            value,
            id
        ]);
    }

    public delete(id: number): Promise<any> {
        const query = 'DELETE FROM users WHERE user_id = $1';
        return db.query(query, [id]);
    }
}