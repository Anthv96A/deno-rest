import { Router } from 'https://deno.land/x/oak/mod.ts';
import BeerController from '../controllers/BeerController.ts';
import BeerService from '../services/beer/BeerService.ts';
import IBeerService from '../services/beer/IBeerService.ts';
import ITypeConverter from '../services/TypeConverter/ITypeConverter.ts';
import HttpTypeConverter from '../services/TypeConverter/HttpTypeConverter.ts';
import InMemoryBeerStorage from '../repos/InMemoryBeerStorage.ts';
import IBeerRepository from '../repos/IBeerRepository.ts';

const typeConverter: ITypeConverter = new HttpTypeConverter();
const beerRepo: IBeerRepository = new InMemoryBeerStorage();
const beerService: IBeerService = new BeerService(beerRepo);
const beerController: BeerController = new BeerController(beerService, typeConverter);

const router: Router = new Router();

router
    .get('/beers', beerController.getBeersAsync.bind(beerController))
    .get('/beers/:id', beerController.getBeerAsync.bind(beerController))
    .post('/beers', beerController.createBeerAsync.bind(beerController))
    .put('/beers/:id', beerController.updateBeerAsync.bind(beerController))
    .delete('/beers/:id', beerController.deleteBeerAsync.bind(beerController));

export default router;