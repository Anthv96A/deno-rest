import db from '../../clients/MongoClient.ts';
import IBeerRepository from '../IBeerRepository.ts';
import Query from '../Query.ts';
import BeerModel from '../../models/BeerModel.ts';
import { UpdateResult } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

class MongoRepository implements IBeerRepository {

    private readonly _beers: any;

    constructor(){
        this._beers = db.getDatabase().collection('beers');
    }

    async createBeerAsync(beer: BeerModel): Promise<BeerModel> {
        const result: any = await this._beers.insertOne(beer);
        beer.id = result.$oid;
        return beer;
    }

    async updateBeerAsync(beer: BeerModel): Promise<BeerModel> {
        const query = new Query();
        query.where = { _id: { '$oid': beer.id } };
        const result: UpdateResult = await this._beers.updateOne(query.where, beer);
        if(result.matchedCount === 0)
            throw new Error('Failed to update');
        return beer;
    }

    async deleteBeerAsync(query: Query): Promise<any> {
        query.where = typeof query.where?._id === "string" ? {...query.where, _id: { '$oid': query.where._id }} : query.where;
        await this._beers.deleteOne(query.where);
    }
    async getBeerAsync(query: Query): Promise<BeerModel> {
        query.where = typeof query.where?._id === "string" ? {...query.where, _id: { '$oid': query.where._id }} : query.where;
        const result = await this._beers.findOne(query.where);
        if(!result)
            throw new Error('Not found');
        return {
            ...result,
            id: result._id.$oid
        } as BeerModel
    }
    async getBeersAsync(): Promise<BeerModel[]> {
        try {
            const result = await this._beers.find({}) as BeerModel[];
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default MongoRepository;