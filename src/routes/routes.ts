import { Router } from "oak/mod.ts";
import BeerController from '../controllers/BeerController.ts';
import BeerService from '../services/beer/BeerService.ts';
import IBeerService from '../services/beer/IBeerService.ts';
import InMemoryBeerStorage from '../repos/InMemoryBeerStorage.ts';
import IBeerRepository from '../repos/IBeerRepository.ts';

const beerRepo: IBeerRepository = new InMemoryBeerStorage();
const beerService: IBeerService = new BeerService(beerRepo);
const beerController: BeerController = new BeerController(beerService);

const router: Router = new Router();

router
    .get('/beers', beerController.getBeersAsync.bind(beerController))
    .get('/beers/:id', beerController.getBeerAsync.bind(beerController))
    .post('/beers', beerController.createBeerAsync.bind(beerController))
    .put('/beers/:id', beerController.updateBeerAsync.bind(beerController))
    .delete('/beers/:id', beerController.deleteBeerAsync.bind(beerController));

export default router;