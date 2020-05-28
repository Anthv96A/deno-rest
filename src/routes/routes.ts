import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { Collection } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import BeerController from '../controllers/BeerController.ts';
import BeerService from '../services/beer/BeerService.ts';
import IBeerService from '../services/beer/IBeerService.ts';
import ITypeConverter from '../services/TypeConverter/ITypeConverter.ts';
import HttpTypeConverter from '../services/TypeConverter/HttpTypeConverter.ts';
import BeerMongoRepository from '../repos/beer/mongo/BeerMongoRepository.ts';
import InMemoryBeerStorage from '../repos/beer/inmemory/InMemoryBeerStorage.ts';
import IBeerRepository from '../repos/IBeerRepository.ts';
import db from '../clients/MongoClient.ts';

const dbModel = db.getDatabase();

const typeConverter: ITypeConverter = new HttpTypeConverter();
const beerRepo: IBeerRepository = beerRepositoryFacade();
const beerService: IBeerService = new BeerService(beerRepo);
const beerController: BeerController = new BeerController(beerService, typeConverter);

const router: Router = new Router();

router
    .get('/', renderDefault)
    .get('/beers', beerController.getAsync.bind(beerController))
    .get('/beers/:id', beerController.getOneAsync.bind(beerController))
    .post('/beers', beerController.createAsync.bind(beerController))
    .put('/beers/:id', beerController.updateAsync.bind(beerController))
    .delete('/beers/:id', beerController.deleteAsync.bind(beerController));

export default router;


function beerRepositoryFacade(): IBeerRepository {
    const db = Deno.env.get('DB_TYPE') || 'inmemory';

    switch (db) {
        case 'mongodb':
            return new BeerMongoRepository(<Collection>dbModel.collection('beers'));
        default:
            return new InMemoryBeerStorage();
    }
}


function renderDefault(context: RouterContext){
    context.response.body = 'Hello World, landing page!' 
    context.response.status = 200;
}