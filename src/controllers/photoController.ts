import { Request, Response } from "express";
import { PhotoService } from "../services/photoService";

const photoService = new PhotoService;

export class PhotoController {

    public getPhotos = async (req: Request, res: Response) => {
        try {
            const result = await photoService.findAll();
            res.status(200).json(result.rows);
            console.log(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };
}