import { Router } from "express";
import { IngredientController } from "../controllers/ingredientController";

const router: Router = Router();

const ingredientController = new IngredientController;

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Get all ingredients.
 *     description: Retrieve all ingredients.
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
 *                   ingredient_id: number
 *                   name: string
 *             example:
 *               - ingredient_id: 1
 *                 name: "Houblon"
 *               - ingredient_id: 2
 *                 name: "Eau"
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/ingredients', ingredientController.getIngredients);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Get a ingredient by id.
 *     description: "Retrieve one ingredient by id."
 *     parameters:
 *       - name: ingredient_id
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
 *                 ingredient_id: number
 *                 name: string
 *             example:
 *               ingredient_id: 1
 *               name: "Houblon"
 *       404:
 *         description: the ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/ingredients/:id', ingredientController.getIngredientById);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     tags:
 *       - ingredients
 *     summary: Create ingredient.
 *     description: Create a ingredient and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: string
 *             example:
 *               name: "Houblon"
 *     responses:
 *       201:
 *         description: ingredient is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredient_id: number
 *                 name: string
 *             example:
 *               ingredient_id: 1
 *               name: "Houblon"
 *       404:
 *         description: the ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/ingredients', ingredientController.createIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   patch:
 *     tags:
 *       - Ingredients
 *     summary: Update ingredient.
 *     description: Update a ingredient and retrieve it in response body.
 *     parameters:
 *       - name: ingredient_id
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
 *               value: "Houblon"
 *     responses:
 *       200:
 *         description: ingredient is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredient_id: number
 *                 name: string
 *             example:
 *               ingredient_id: 1
 *               name: "Houblon"
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: the ingredient is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/ingredients/:id', ingredientController.updateIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     tags:
 *       - Ingredients
 *     summary: Delete ingredient.
 *     description: "Delete a ingredient by id."
 *     parameters:
 *       - name: ingredient_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, ingredients is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/ingredients/:id', ingredientController.deleteIngredient);

export default router;


