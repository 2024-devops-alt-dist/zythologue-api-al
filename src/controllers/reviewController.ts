import { Request, Response } from "express";
import { ReviewService } from "../services/reviewService";

const reviewService = new ReviewService;

export class ReviewController {

    public getReviews = async (req: Request, res: Response) => {
        try {
            const result = await reviewService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getBeerById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await reviewService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createReview = async (req: Request, res: Response) => {
        try {
            const review = {
                userId: req.body.user_id,
                beerId: req.body.beer_id,
                rate: req.body.rate,
                comment: req.body.comment,
                createdAt: req.body.created_at,
            }
            const result = await reviewService.create(review);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateReview = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const review = await reviewService.findOne(id);
            if(review.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'user_id', 
                'beer_id', 
                'rate', 
                'comment', 
                'created_at', 
            ];
            const stringProperties = [
                'comment'
            ];
            const numberProperties = [
                'user_id',
                'beer_id',
                'rate'
            ]

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const property = element.property;
                const value = element.value;
                if(!allowedProperties.includes(property)) {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "Not allowed property." });
                    return;
                }
                if(stringProperties.includes(property) && typeof value !== "string") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a string." });
                    return;
                }
                if(numberProperties.includes(property) && typeof value !== "number") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a number." });
                    return;
                }
                if(property === "created_at" && value !instanceof Date) {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a date." });
                    return;
                }
                const update = await reviewService.update(id, property, value);
            }
            const result = await reviewService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteReview = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const review = await reviewService.findOne(id);
            if(review.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await reviewService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}