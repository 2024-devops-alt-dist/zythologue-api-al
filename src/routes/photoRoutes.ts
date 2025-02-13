import { Router } from "express";
import { PhotoController } from "../controllers/photoController";


const router: Router = Router();

const photoController = new PhotoController;

/**
 * @swagger
 * /api/photos:
 *   get:
 *     tags:
 *       - photos
 *     summary: Get all photos.
 *     description: Retrieve all photos.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/photos', photoController.getPhotos);

export default router;