import IBeerRepository from "../repos/IBeerRepository.ts";
import BeerModel from "../models/Beer-Model.ts";

class BeerController {
    constructor(
        private readonly _beerRepository: IBeerRepository
    ){}

    async createBeerAsync(http: any){ 
        const newBodyBeer = (await http.request.body()).value as BeerModel;
        const created: BeerModel = await this._beerRepository.createBeerAsync(newBodyBeer);

        http.response.status = 201;
        http.response.body = {
            message: `Beer created with ID ${created.id}`
        }
    }
    async updateBeerAsync(http: any){ 
        const beerId = http.params.id;
        const updatedBeer = (await http.request.body()).value as BeerModel;
        await this._beerRepository.updateBeerAsync(beerId, updatedBeer);

        http.response.status = 202;
        http.response.body = {
            message: `Beer updated with ID ${beerId}`
        }
    }

    async deleteBeerAsync(http: any){ 
        const beerId: string = http.params.id;
        await this._beerRepository.deleteBeerAsync(beerId);

        http.response.status = 204;
        http.response.body = {
            message: `Beer deleted with ID ${beerId}`
        }
    }

    async getBeerAsync(http: any){ 
        const beerId = http.params.id;
        const beer: BeerModel = await this._beerRepository.getBeerAsync(beerId);

        http.response.status = 200;
        http.response.body = beer;
    }
    async getBeersAsync(http: any){ 
        const beers: BeerModel[] = await this._beerRepository.getBeersAsync();

        http.response.status = 200;
        http.response.body = {resources: beers};
    }
}


export default BeerController;