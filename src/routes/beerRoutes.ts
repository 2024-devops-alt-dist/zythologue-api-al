import { Router } from "express";
import { BeerController } from "../controllers/beerController";

const router: Router = Router();

const beerController = new BeerController;

/**
 * @swagger
 * /api/beers:
 *   get:
 *     tags:
 *       - Beers
 *     summary: Get all beers.
 *     description: Retrieve all beers.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   beer_id: number
 *                   brewery_id: number
 *                   category_id: number
 *                   name: string
 *                   description: string
 *                   abv: number
 *                   ibu: number
 *             example:
 *               - beer_id: 1
 *                 brewery_id: 1
 *                 category-id: 1
 *                 name: "Duvel"
 *                 description: "beers description."
 *                 abv: 10
 *                 ibu: 20
 *               - beer_id: 2
 *                 brewery_id: 3
 *                 category-id: 4
 *                 name: "Chouffe"
 *                 description: "beers description."
 *                 abv: 10
 *                 ibu: 20
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/beers', beerController.getBeers);

/**
 * @swagger
 * /api/beers/{id}:
 *   get:
 *     tags:
 *       - Beers
 *     summary: Get a beer by id.
 *     description: "Retrieve one beer by id."
 *     parameters:
 *       - name: beer_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 beer_id: number
 *                 brewery_id: number
 *                 category_id: number
 *                 name: string
 *                 description: string
 *                 abv: number
 *                 ibu: number
 *             example:
 *               beer_id: 1
 *               brewery_id: 1
 *               category_id: 1
 *               name: "Duvel"
 *               description: "beers description."
 *               abv: 10
 *               ibu: 20
 *       404:
 *         description: Beer is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/beers/:id', beerController.getBeerById);

/**
 * @swagger
 * /api/beers:
 *   post:
 *     tags:
 *       - Beers
 *     summary: Create beer.
 *     description: Create a beer and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beer_id: number
 *               brewery_id: number
 *               category_id: number
 *               name: string
 *               description: string
 *               abv: number
 *               ibu: number
 *             example:
 *               beer_id: 1
 *               brewery_id: 1
 *               category-id: 1
 *               name: "Duvel"
 *               description: "beers description."
 *               abv: 10
 *               ibu: 20
 *     responses:
 *       201:
 *         description: Beer is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 beer_id: number
 *                 brewery_id: number
 *                 category_id: number
 *                 name: string
 *                 description: string
 *                 abv: number
 *                 ibu: number
 *             example:
 *               beer_id: 1
 *               brewery_id: 1
 *               category-id: 1
 *               name: "Duvel"
 *               description: "beers description."
 *               abv: 10
 *               ibu: 20
 *       404:
 *         description: Beer is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/beers', beerController.createBeer);

/**
 * @swagger
 * /api/beers/{id}:
 *   patch:
 *     tags:
 *       - Beers
 *     summary: Update beer.
 *     description: Update a beer and retrieve it in response body.
 *     parameters:
 *       - name: beer_id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 property: string
 *                 value: any
 *           example:
 *             - property: "name"
 *               value: "Duvel"
 *             - property: "abv"
 *               value: 10
 *     responses:
 *       200:
 *         description: Beer is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 beer_id: number
 *                 brewery_id: number
 *                 category_id: number
 *                 name: string
 *                 description: string
 *                 abv: number
 *                 ibu: number
 *             example:
 *               beer_id: 1
 *               brewery_id: 1
 *               category-id: 1
 *               name: "Duvel"
 *               description: "beers description."
 *               abv: 10
 *               ibu: 20
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: Beer is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/beers/:id', beerController.updateBeer);

/**
 * @swagger
 * /api/beers/{id}:
 *   delete:
 *     tags:
 *       - Beers
 *     summary: Delete beer.
 *     description: "Delete a beer by id."
 *     parameters:
 *       - name: beer_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, beers is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/beers/:id', beerController.deleteBeer);

export default router;


