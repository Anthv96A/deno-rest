import BeerModel from '../models/Beer-Model.ts';
import Query from './Query.ts';

interface IBeerRepository {
    createBeerAsync(beer: BeerModel): Promise<BeerModel>;
    updateBeerAsync(beer: BeerModel): Promise<BeerModel>;
    deleteBeerAsync(query: Query): Promise<any>;
    getBeerAsync(query: Query): Promise<BeerModel>;
    getBeersAsync(): Promise<BeerModel[]>;
}

export default IBeerRepository;