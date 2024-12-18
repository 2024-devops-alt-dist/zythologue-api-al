import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router: Router = Router();

const categoryController = new CategoryController;

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories.
 *     description: Retrieve all categories.
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
 *                   category_id: number
 *                   name: string
 *                   description: string
 *             example:
 *               - category_id: 1
 *                 name: "Blond"
 *                 description: "category description."
 *               - category_id: 2
 *                 name: "Stout"
 *                 description: "categories description."
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get a category by id.
 *     description: "Retrieve one category by id."
 *     parameters:
 *       - name: category_id
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
 *                 category_id: number
 *                 name: string
 *                 description: string
 *             example:
 *               category_id: 1
 *               name: "IPA"
 *               description: "categories description."
 *       404:
 *         description: the category is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/categories/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create category.
 *     description: Create a category and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: string
 *               description: string
 *             example:
 *               name: "Blonde"
 *               description: "categories description."
 *     responses:
 *       201:
 *         description: category is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id: number
 *                 name: string
 *                 description: string
 *             example:
 *               category_id: 1
 *               name: "Duvel"
 *               description: "categories description."
 *       404:
 *         description: the category is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/categories', categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update category.
 *     description: Update a category and retrieve it in response body.
 *     parameters:
 *       - name: category_id
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
 *               value: "Blonde"
 *             - property: "description"
 *               value: "test"
 *     responses:
 *       200:
 *         description: category is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id: number
 *                 name: string
 *                 description: string
 *             example:
 *               category_id: 1
 *               name: "IPA"
 *               description: "categories description."
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: the category is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/categories/:id', categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete category.
 *     description: "Delete a category by id."
 *     parameters:
 *       - name: category_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, categories is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;


