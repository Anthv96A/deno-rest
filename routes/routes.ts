import { Router } from "https://deno.land/x/oak/mod.ts";
import BeerController from '../controllers/BeerController.ts';
import InMemoryBeerStorage from "../repos/InMemoryBeerStorage.ts";

const beerController: BeerController = new BeerController(new InMemoryBeerStorage());


const router: Router = new Router();

router
    .get('/beers', beerController.getBeersAsync.bind(beerController))
    .get('/beers/:id', beerController.getBeerAsync.bind(beerController))
    .post('/beers', beerController.createBeerAsync.bind(beerController))
    .put('/beers/:id', beerController.updateBeerAsync.bind(beerController))
    .delete('/beers/:id', beerController.deleteBeerAsync.bind(beerController));

export default router;