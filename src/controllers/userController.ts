import { Request, Response } from "express";
import { UserService } from "../services/userService";
import bcrypt from "bcrypt";

const userService = new UserService;

export class UserController {

    public getUsers = async (req: Request, res: Response) => {
        try {
            const result = await userService.findAll();
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    };

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await userService.findOne(id);        
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(200).json(result.rows[0]);            
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const user = {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            }
            const result = await userService.create(user);            
            if(result.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });        
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.findOne(id);
            if(user.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            const data = req.body;
            const allowedProperties = [
                'email', 
                'password', 
                'username', 
                'firstname', 
                'lastname', 
            ];

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const property = element.property;
                let value = element.value;
                if(property === "password") {
                    value = await bcrypt.hash(value, 10);
                }
                if(!allowedProperties.includes(property)) {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "Not allowed property." });
                    return;
                }
                if(typeof value !== "string") {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "This property value must be a string." });
                    return;
                }
                const update = await userService.update(id, property, value);
            }
            const result = await userService.findOne(id);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const User = await userService.findOne(id);
            if(User.rowCount === 0) {
                res.status(404).json({ status: 404, error: "Not Found" });
                return;
            }
            await userService.delete(id); 
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    }
}