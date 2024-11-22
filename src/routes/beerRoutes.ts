import { Router } from "express";
import { BeerController } from "../controllers/beerController";

const router: Router = Router();

const beerController = new BeerController;

router.get('/beers', beerController.getBeers);
router.get('/beers/:id', beerController.getBeerById);
router.post('/beers', beerController.createBeer);
router.patch('/beers/:id', beerController.updateBeer);
router.delete('/beers/:id', beerController.deleteBeer);

export default router;


