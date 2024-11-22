import { Request, Response } from "express";
import { BeerService } from "../services/beerService";
import { log } from "console";
import { exit } from "process";

const beerService = new BeerService;

export class BeerController {

    public getBeers = async (req: Request, res: Response) => {
        try {
            const result = await beerService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: "500 Internal Server Error" });
        }
    };

    public getBeerById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await beerService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ error: "404 Not Found" });
                return;
            }
            res.status(200).json(result.rows);            
        } catch (error) {
            res.status(500).json({ error: "500 Internal Server Error" });
        }
    }

    public createBeer = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            console.log(req);
            
            // if(result.rowCount === 0) {
            //     res.status(404).json({ error: "404 Not Found" });
            //     return;
            // }
            // res.status(200).json(result.rows);            
        } catch (error) {
            res.status(500).json({ error: "500 Internal Server Error" });
        }
    }

    public updateBeer = async (req: Request, res: Response) => {

    }

    public deleteBeer = async (req: Request, res: Response) => {

    }
}


