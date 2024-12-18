import { Router } from "express";
import { BeerIngredientController } from "../controllers/beerIngredientController";

const router: Router = Router();

const beerIngredientController = new BeerIngredientController;

/**
 * @swagger
 * /api/beerIngredients:
 *   get:
 *     tags:
 *       - BeerIngredients
 *     summary: Get all beerIngredients.
 *     description: Retrieve all beerIngredients.
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
 *                   beer_ingredient_id: number
 *                   beer_id: number
 *                   ingredient_id: number
 *             example:
 *               - beer_ingredient_id: 1
 *                 beer_id: 1
 *                 ingredient_id: 1
 *               - beer_ingredient_id: 2
 *                 beer_id: 1
 *                 ingredient_id: 1
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/beerIngredients', beerIngredientController.getBeerIngredients);

/**
 * @swagger
 * /api/beerIngredients/{id}:
 *   get:
 *     tags:
 *       - BeerIngredients
 *     summary: Get a beer_ingredient by id.
 *     description: "Retrieve one beer_ingredient by id."
 *     parameters:
 *       - name: beer_ingredient_id
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
 *                 beer_ingredient_id: number
 *                 beer_id: number
 *                 ingredient_id: number
 *             example:
 *               beer_ingredient_id: 1
 *               beer_id: 1
 *               ingredient_id: 1
 *       404:
 *         description: the beer_ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/beerIngredients/:id', beerIngredientController.getBeerIngredientById);

/**
 * @swagger
 * /api/beerIngredients:
 *   post:
 *     tags:
 *       - BeerIngredients
 *     summary: Create beer_ingredient.
 *     description: Create a beer_ingredient and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beer_id: number
 *               ingredient_id: number
 *             example:
 *               beer_id: 1
 *               ingredient_id: 1
 *     responses:
 *       201:
 *         description: beer_ingredient is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 beer_ingredient_id: number
 *                 beer_id: number
 *                 ingredient_id: number
 *             example:
 *               beer_ingredient_id: 1
 *               beer_id: 1
 *               ingredient_id: 1
 *       404:
 *         description: the beer_ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/beerIngredients', beerIngredientController.createBeerIngredient);

/**
 * @swagger
 * /api/beerIngredients/{id}:
 *   patch:
 *     tags:
 *       - BeerIngredients
 *     summary: Update beer_ingredient.
 *     description: Update a beer_ingredient and retrieve it in response body.
 *     parameters:
 *       - name: beer_ingredient_id
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
 *                 beer_ingredient_id: number
 *                 beer_id: number
 *                 ingredient_id: number
 *           example:
 *             - beer_ingredient_id: 1
 *               beer_id: 1
 *               ingredient_id: 1
 *             - beer_ingredient_id: 2
 *               beer_id: 1
 *               ingredient_id: 1
 *     responses:
 *       200:
 *         description: beer_ingredient is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 beer_ingredient_id: number
 *                 beer_id: number
 *                 ingredient_id: number
 *             example:
 *               beer_ingredient_id: 1
 *               beer_id: 1
 *               ingredient_id: 1
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: the beer_ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/beerIngredients/:id', beerIngredientController.updateBeerIngredient);

/**
 * @swagger
 * /api/beerIngredients/{id}:
 *   delete:
 *     tags:
 *       - BeerIngredients
 *     summary: Delete beer_ingredient.
 *     description: "Delete a beer_ingredient by id."
 *     parameters:
 *       - name: beer_ingredient_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, beerIngredients is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/beerIngredients/:id', beerIngredientController.deleteBeerIngredient);

export default router;


