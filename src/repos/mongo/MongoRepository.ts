import db from './MongoClient.ts';
import IBeerRepository from '../IBeerRepository.ts';
import Query from '../Query.ts';
import BeerModel from '../../models/BeerModel.ts';

class MongoRepository implements IBeerRepository {

    private readonly _beers: any;

    constructor(){
        this._beers = db.collection('beers');
    }

    async createBeerAsync(beer: BeerModel): Promise<BeerModel> {
        const result: BeerModel = await this._beers.insertOne(beer);
        return result;
    }

    async updateBeerAsync(beer: BeerModel): Promise<BeerModel> {
        const query = new Query();
        query.where._id = beer.id;
        const result: BeerModel = await this._beers.updateOne(query.where, beer);
        return result;
    }

    async deleteBeerAsync(query: Query): Promise<any> {
        await this._beers.deleteOne(query.where);
    }
    async getBeerAsync(query: Query): Promise<BeerModel> {
        return await this._beers.findOne(query.where) as BeerModel;
    }
    async getBeersAsync(): Promise<BeerModel[]> {
        return await this._beers.find() as BeerModel[];
    }
}

export default MongoRepository;