import IBeerService from './IBeerService.ts';
import IBeerRepository from '../../repos/IBeerRepository.ts';
import Query from '../../repos/Query.ts';
import BeerModel from '../../models/BeerModel.ts';

class BeerService implements IBeerService {

    constructor(
        private readonly _beerRepository: IBeerRepository
    ){};

    async createAsync(beer: BeerModel): Promise<BeerModel> {
        BeerService.validate(beer);
        try {
            const created: BeerModel = await this._beerRepository.createBeerAsync(beer);

            if(!created)
                throw new Error('Beer was not created');
                
            return created;
        } catch (error) {
            throw error;
        }
    }
    async updateAsync(beer: BeerModel): Promise<BeerModel> {
        BeerService.validate(beer);
        try {
            const created: BeerModel = await this._beerRepository.updateBeerAsync(beer);

            if(!created)
                throw new Error('Beer was not updated');
                
            return created;
        } catch (error) {
            throw error;
        }
    }
    async deleteAsync(id: string): Promise<any> {
        try {
            const query = new Query();
            query.where = { _id: id };
            await this._beerRepository.deleteBeerAsync(query);
        } catch (error) {
            throw error;
        }
    }
    async getOneAsync(id: string): Promise<BeerModel>{
        try {
            const query = new Query();
            query.where = { _id: id };
            
            const beer: BeerModel = await this._beerRepository.getBeerAsync(query);
            if(!beer)
                throw new Error('Beer not found');
            return beer;
        } catch (error) {
            throw error;
        }
    }
    async getAsync(): Promise<BeerModel[]>{
        return await this._beerRepository.getBeersAsync();
    }

    static validate(beer: BeerModel){
        if(beer?.name?.trim() === '' || beer?.origin?.trim() === '')
            throw new Error('Invalid beer type');
    }
}

export default BeerService;