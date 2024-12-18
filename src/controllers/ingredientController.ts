import { Request, Response } from "express";
import { IngredientService } from "../services/ingredientService";

const ingredientService = new IngredientService;

export class IngredientController {

    public getIngredients = async (req: Request, res: Response) => {
        try {
            const result = await ingredientService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getIngredientById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await ingredientService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createIngredient = async (req: Request, res: Response) => {
        try {
            const ingredient = {
                name: req.body.name
            }
            const result = await ingredientService.create(ingredient);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateIngredient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const ingredient = await ingredientService.findOne(id);
            if(ingredient.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'name'
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
                const update = await ingredientService.update(id, property, value);
            }
            const result = await ingredientService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteIngredient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const ingredient = await ingredientService.findOne(id);
            if(ingredient.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await ingredientService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}