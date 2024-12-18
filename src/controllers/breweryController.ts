import { Request, Response } from "express";
import { BreweryService } from "../services/breweryService";

const breweryService = new BreweryService

export class BreweryController {

    public getBreweries = async (req: Request, res: Response) => {
        try {
            const result = await breweryService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getBreweryById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await breweryService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createBrewery = async (req: Request, res: Response) => {
        try {
            const brewery = {
                name: req.body.name,
                address: req.body.address,
                country: req.body.country,
                description: req.body.description,
                link: req.body.link,
                email: req.body.email
            }
            const result = await breweryService.create(brewery);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateBrewery = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const beer = await breweryService.findOne(id);
            if(beer.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'name', 
                'address', 
                'country', 
                'description', 
                'link', 
                'email'
            ];
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const property = element.property;
                const value = element.value;
                if(!allowedProperties.includes(property)) {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "Not allowed property." });
                    return;
                }
                if(typeof value !== "string") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a string." });
                    return;
                }
                const update = await breweryService.update(id, property, value);
            }
            const result = await breweryService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteBrewery = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const beer = await breweryService.findOne(id);
            if(beer.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await breweryService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}