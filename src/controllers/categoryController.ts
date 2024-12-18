import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

const categoryService = new CategoryService;

export class CategoryController {

    public getCategories = async (req: Request, res: Response) => {
        try {
            const result = await categoryService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getCategoryById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await categoryService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createCategory = async (req: Request, res: Response) => {
        try {
            const category = {
                name: req.body.name,
                description: req.body.description,
            }
            const result = await categoryService.create(category);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateCategory = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const category = await categoryService.findOne(id);
            if(category.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
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
                if(typeof value !== "string") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a string." });
                    return;
                }
                const update = await categoryService.update(id, property, value);
            }
            const result = await categoryService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteCategory = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const Category = await categoryService.findOne(id);
            if(Category.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await categoryService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}