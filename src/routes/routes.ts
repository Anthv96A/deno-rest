import { Router } from 'https://deno.land/x/oak/mod.ts';
import BeerController from '../controllers/BeerController.ts';
import BeerService from '../services/beer/BeerService.ts';
import IBeerService from '../services/beer/IBeerService.ts';
import ITypeConverter from '../services/TypeConverter/ITypeConverter.ts';
import HttpTypeConverter from '../services/TypeConverter/HttpTypeConverter.ts';
import MongoRepository from '../repos/mongo/MongoRepository.ts';
import InMemoryBeerStorage from '../repos/inmemory/InMemoryBeerStorage.ts';
import IBeerRepository from '../repos/IBeerRepository.ts';

const typeConverter: ITypeConverter = new HttpTypeConverter();
const beerRepo: IBeerRepository = new MongoRepository();
const beerService: IBeerService = new BeerService(beerRepo);
const beerController: BeerController = new BeerController(beerService, typeConverter);

const router: Router = new Router();

router
    .get('/', context => { context.response.body = 'Hello World, landing page!' })
    .get('/beers', beerController.getAsync.bind(beerController))
    .get('/beers/:id', beerController.getOneAsync.bind(beerController))
    .post('/beers', beerController.createAsync.bind(beerController))
    .put('/beers/:id', beerController.updateAsync.bind(beerController))
    .delete('/beers/:id', beerController.deleteAsync.bind(beerController));

export default router;