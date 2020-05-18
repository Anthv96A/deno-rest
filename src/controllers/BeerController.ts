import IBeerService from "../services/beer/IBeerService.ts";
import BeerModel from "../models/Beer-Model.ts";

class BeerController {
    constructor(
        private readonly _beerService: IBeerService
    ){}

    async createBeerAsync(http: any){ 
        const newBodyBeer = <BeerModel> await bodyTransformAsync(http);
        const created: BeerModel = await this._beerService.createAsync(newBodyBeer);

        http.response.status = 201;
        http.response.body = {
            message: `Beer created with ID ${created.id}`
        }
    }
    async updateBeerAsync(http: any){ 
        const updatedBeer = <BeerModel> await bodyTransformAsync(http);
        const result: BeerModel = await this._beerService.updateAsync(updatedBeer);

        http.response.status = 202;
        http.response.body = {
            message: `Beer updated with ID ${result.id}`
        }
    }

    async deleteBeerAsync(http: any){ 
        const beerId: string = http.params.id;
        await this._beerService.deleteAsync(beerId);

        http.response.status = 204;
        http.response.body = {};
    }

    async getBeerAsync(http: any){ 
        const beerId = http.params.id;
        const beer: BeerModel = await this._beerService.getOneAsync(beerId);

        http.response.status = 200;
        http.response.body = beer;
    }
    async getBeersAsync(http: any){ 
        const beers: BeerModel[] = await this._beerService.getAsync();

        http.response.status = 200;
        http.response.body = { resources: beers };
    }
}

async function bodyTransformAsync(http: any): Promise<BeerModel> {
    const tranformed = (await http.request.body()).value as BeerModel;
    if(http.params.id !== undefined)
        tranformed.id = http.params.id;

    return tranformed;
}

export default BeerController;