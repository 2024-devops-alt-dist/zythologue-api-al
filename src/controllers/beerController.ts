import { Request, Response } from "express";
import { BeerService } from "../services/beerService";

const beerService = new BeerService;

export class BeerController {

    public getBeers = async (req: Request, res: Response) => {
        try {
            const result = await beerService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getBeerById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await beerService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createBeer = async (req: Request, res: Response) => {
        try {
            const beer = {
                breweryId: req.body.brewery_id,
                categoryId: req.body.category_id,
                name: req.body.name,
                description: req.body.description,
                abv: req.body.abv,
                ibu: req.body.ibu
            }
            const result = await beerService.create(beer);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateBeer = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const beer = await beerService.findOne(id);
            if(beer.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'brewery_id', 
                'category_id', 
                'name', 
                'description', 
                'abv', 
                'ibu'
            ];
            const stringProperties = [
                'name', 
                'description', 
            ];

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
                if(!stringProperties.includes(property) && typeof value !== "number") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a number." });
                    return;
                }
                const update = await beerService.update(id, property, value);
            }
            const result = await beerService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteBeer = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const beer = await beerService.findOne(id);
            if(beer.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await beerService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}