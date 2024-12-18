import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";

const router: Router = Router();

const reviewController = new ReviewController;

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews.
 *     description: Retrieve all reviews.
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
 *                   beer_id: number
 *                   rate: number
 *                   comment: string
 *                   created_at: date
 *             example:
 *               - review_id: 1
 *                 user_id: 1
 *                 beer_id: 1
 *                 rate: 5
 *                 comment: test
 *                 created_at: date
 *               - review_id: 2
 *                 user_id: 2
 *                 beer_id: 2
 *                 rate: 7
 *                 comment: test
 *                 created_at: date
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/reviews', reviewController.getReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get a review by id.
 *     description: "Retrieve one review by id."
 *     parameters:
 *       - name: review_id
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
 *                 beer_id: number
 *                 rate: number
 *                 comment: string
 *                 created_at: date
 *             example:
 *               review_id: 1
 *               user_id: 1
 *               beer_id: 1
 *               rate: 5
 *               comment: test
 *               created_at: test
 *       404:
 *         description: review is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/reviews/:id', reviewController.getBeerById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create review.
 *     description: Create a review and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: number
 *               beer_id: number
 *               rate: number
 *               comment: string
 *               created_at: date
 *           example:
 *             review_id: 1
 *             user_id: 1
 *             beer_id: 1
 *             rate: 5
 *             comment: test
 *             created_at: test
 *     responses:
 *       201:
 *         description: review is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id: number
 *                 beer_id: number
 *                 rate: number
 *                 comment: string
 *                 created_at: date
 *             example:
 *               review_id: 1
 *               user_id: 1
 *               beer_id: 1
 *               rate: 5
 *               comment: test
 *               created_at: test
 *       404:
 *         description: review is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/reviews', reviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   patch:
 *     tags:
 *       - Reviews
 *     summary: Update review.
 *     description: Update a review and retrieve it in response body.
 *     parameters:
 *       - name: review_id
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
 *             - property: "rate"
 *               value: 8
 *             - property: "comment"
 *               value: "test"
 *     responses:
 *       200:
 *         description: review is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id: number
 *                 beer_id: number
 *                 rate: number
 *                 comment: string
 *                 created_at: date
 *             example:
 *               review_id: 1
 *               user_id: 1
 *               beer_id: 1
 *               rate: 5
 *               comment: test
 *               created_at: test
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: review is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/reviews/:id', reviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete review.
 *     description: "Delete a review by id."
 *     parameters:
 *       - name: review_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, reviews is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/reviews/:id', reviewController.deleteReview);

export default router;


