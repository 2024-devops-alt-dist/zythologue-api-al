import { Photo } from "../models/Photo";
import { db } from "../config/dbConfig";

export class PhotoService {

    public findAll(): Promise<Photo[] | any> {
        const query = 'SELECT * FROM photo'
        return db.query(query);
    }
}