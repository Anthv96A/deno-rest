import BeerModel from '../models/Beer-Model.ts';

interface IBeerRepository {
    createBeerAsync(beer: BeerModel): Promise<BeerModel>;
    updateBeerAsync(beerId: string, beer: BeerModel): Promise<BeerModel>;
    deleteBeerAsync(beerId: string): Promise<any>;
    getBeerAsync(beerId: string): Promise<BeerModel>;
    getBeersAsync(): Promise<BeerModel[]>;
}

export default IBeerRepository;