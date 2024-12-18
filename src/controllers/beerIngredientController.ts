import { Request, Response } from "express";
import { BeerIngredientService } from "../services/beerIngredientService";

const beerIngredientService = new BeerIngredientService;

export class BeerIngredientController {

    public getBeerIngredients = async (req: Request, res: Response) => {
        try {
            const result = await beerIngredientService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getBeerIngredientById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await beerIngredientService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createBeerIngredient = async (req: Request, res: Response) => {
        try {
            const beerIngredient = {
                beerId: req.body.beer_id,
                ingredientId: req.body.ingredient_id,
            }
            const result = await beerIngredientService.create(beerIngredient);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateBeerIngredient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const beerIngredient = await beerIngredientService.findOne(id);
            if(beerIngredient.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'beer_id', 
                'ingredient_id', 
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
                const update = await beerIngredientService.update(id, property, value);
            }
            const result = await beerIngredientService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteBeerIngredient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const BeerIngredient = await beerIngredientService.findOne(id);
            if(BeerIngredient.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await beerIngredientService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}