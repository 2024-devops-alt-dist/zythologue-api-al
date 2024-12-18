import { Router } from "express";
import { BreweryController } from "../controllers/breweryController";


const router: Router = Router();

const breweryController = new BreweryController;

/**
 * @swagger
 * /api/breweries:
 *   get:
 *     tags:
 *       - Breweries
 *     summary: Get all breweries.
 *     description: Retrieve all breweries.
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
 *                   brewery_id: number
 *                   name: string
 *                   address: string
 *                   country: string
 *                   description: string
 *                   link: string
 *                   email: string
 *             example:
 *               - brewery_id: 1
 *                 name: Brasserie Dupont
 *                 address: Rue de l'Industrie, 10, 7340 Pipaix
 *                 country: Belgique
 *                 description: Brasserie belge traditionnelle, célèbre pour sa saison Dupont.
 *                 link: https://www.brasseriedupont.com
 *                 email: contact@brasseriedupont.com
 *               - brewery_id: 2
 *                 name: "Stone Brewing"
 *                 address: "1999 Citracado Parkway, Escondido, CA 92029"
 *                 country: "États-Unis"
 *                 description: "Brasserie californienne connue pour ses bières IPA audacieuses."
 *                 link: "https://www.stonebrewing.com"
 *                 email: "contact@stonebrewing.com"
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.get('/breweries', breweryController.getBreweries);

/**
 * @swagger
 * /api/breweries/{id}:
 *   get:
 *     tags:
 *       - Breweries
 *     summary: Get a brewery by id.
 *     description: "Retrieve one brewery by id."
 *     parameters:
 *       - name: brewery_id
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
 *                 brewery_id: number
 *                 name: string
 *                 address: string
 *                 country: string
 *                 description: string
 *                 link: string
 *                 email: string
 *             example:
 *               brewery_id: 1
 *               name: Brasserie Dupont
 *               address: Rue de l'Industrie, 10, 7340 Pipaix
 *               country: Belgique
 *               description: Brasserie belge traditionnelle, célèbre pour sa saison Dupont.
 *               link: https://www.brasseriedupont.com
 *               mail: contact@brasseriedupont.com
 *       404:
 *         description: Brewery is not found.
 *       500:
 *         description: Internal Server Error.
 *     
 */
router.get('/breweries/:id', breweryController.getBreweryById);

/**
 * @swagger
 * /api/breweries:
 *   post:
 *     tags:
 *       - Breweries
 *     summary: Create brewery.
 *     description: Create a brewery and retrieve it in response body.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brewery_id: number
 *               name: string
 *               address: string
 *               country: string
 *               description: string
 *               link: string
 *               email: string
 *             example:
 *               brewery_id: 1
 *               name: Brasserie Dupont
 *               address: Rue de l'Industrie, 10, 7340 Pipaix
 *               country: Belgique
 *               description: Brasserie belge traditionnelle, célèbre pour sa saison Dupont.
 *               link: https://www.brasseriedupont.com
 *               mail: contact@brasseriedupont.com
 *     responses:
 *       201:
 *         description: Brewery is created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brewery_id: number
 *                 name: string
 *                 address: string
 *                 country: string
 *                 description: string
 *                 link: string
 *                 email: string
 *             example:
 *               brewery_id: 1
 *               name: Brasserie Dupont
 *               address: Rue de l'Industrie, 10, 7340 Pipaix
 *               country: Belgique
 *               description: Brasserie belge traditionnelle, célèbre pour sa saison Dupont.
 *               link: https://www.brasseriedupont.com
 *               mail: contact@brasseriedupont.com
 *       404:
 *         description: Brewery is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.post('/breweries', breweryController.createBrewery);

/**
 * @swagger
 * /api/breweries/{id}:
 *   patch:
 *     tags:
 *       - Breweries
 *     summary: Update brewery.
 *     description: Update a brewery and retrieve it in response body.
 *     parameters:
 *       - name: brewery_id
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
 *               value: "Brasserie Dupont"
 *             - property: "country"
 *               value: "Belgique"
 *     responses:
 *       200:
 *         description: Brewery is updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brewery_id: number
 *                 name: string
 *                 address: string
 *                 country: string
 *                 description: string
 *                 link: string
 *                 email: string
 *             example:
 *               brewery_id: 1
 *               name: Brasserie Dupont
 *               address: Rue de l'Industrie, 10, 7340 Pipaix
 *               country: Belgique
 *               description: Brasserie belge traditionnelle, célèbre pour sa saison Dupont.
 *               link: https://www.brasseriedupont.com
 *               mail: contact@brasseriedupont.com
 *       400:
 *         description: Bad request, wrong property.
 *       404:
 *         description: Brewery is not found.
 *       500:
 *         description: Internal Server Error.
 *               
 */
router.patch('/breweries/:id', breweryController.updateBrewery);

/**
 * @swagger
 * /api/breweries/{id}:
 *   delete:
 *     tags:
 *       - Breweries
 *     summary: Delete brewery.
 *     description: "Delete a brewery by id."
 *     parameters:
 *       - name: brewery_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: No content, breweries is deleted.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/breweries/:id', breweryController.deleteBrewery);

export default router;


