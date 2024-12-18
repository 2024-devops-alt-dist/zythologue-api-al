import { Router } from "express";
import { UserController } from "../controllers/userController";

const router: Router = Router();

const userController = new UserController;

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users.
 *     description: Retrieve all users.
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
 *                   user_id: number
 *                   email: string
 *                   password: string
 *                   username: string
 *                   firstname: string
 *                   lastname: string
 *             example:
 *               - user_id: 1
 *                 email: string
 *                 password: string
 *                 username: string
 *                 firstname: string
 *                 lastname: string
 *               - user_id: 2
 *                 email: string
 *                 password: string
 *                 username: string
 *                 firstname: string
 *                 lastname: string
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/users', userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by id.
 *     description: "Retrieve one user by id."
 *     parameters:
 *       - name: user_id
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
 *                 user_id: number
 *                 email: string
 *                 password: string
 *                 username: string
 *                 firstname: string
 *                 lastname: string
 *             example:
 *               user_id: number
 *               email: test
 *               password: test
 *               username: test
 *               firstname: test
 *               lastname: test
 *       404:
 *         description: User is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create beer.
 *     description: Create a beer and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: string
 *               password: string
 *               username: string
 *               firstname: string
 *               lastname: string
 *             example:
 *               email: test@test.com
 *               password: test
 *               username: test
 *               firstname: test
 *               lastname: test
 *     responses:
 *       201:
 *         description: Beer is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id: number
 *                 email: string
 *                 password: string
 *                 username: string
 *                 firstname: string
 *                 lastname: string
 *             example:
 *               user_id: number
 *               email: test
 *               password: test
 *               username: test
 *               firstname: test
 *               lastname: test
 *       404:
 *         description: User is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user.
 *     description: Update a user and retrieve it in response body.
 *     parameters:
 *       - name: user_id
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
 *             - property: "email"
 *               value: "test@test.com"
 *             - property: "firstname"
 *               value: "test"
 *     responses:
 *       200:
 *         description: User is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id: number
 *                 email: string
 *                 password: string
 *                 username: string
 *                 firstname: string
 *                 lastname: string
 *             example:
 *               user_id: number
 *               email: test
 *               password: test
 *               username: test
 *               firstname: test
 *               lastname: test
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: User is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/users/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user.
 *     description: "Delete a user by id."
 *     parameters:
 *       - name: user_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, user is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/users/:id', userController.deleteUser);

export default router;


