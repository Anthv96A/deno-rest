import IBeerService from "../services/beer/IBeerService.ts";
import BeerModel from "../models/Beer-Model.ts";
import { Request, Response, RouteParams, Body } from 'https://deno.land/x/oak/mod.ts';

class BeerController {
    constructor(
        private readonly _beerService: IBeerService 
        // TODO add in type convertToTypeAsync
    ){}

    async createBeerAsync({ response, request } : { response: Response, request: Request}){ 
        const newBodyBeer = <BeerModel> await this.bodyTransformAsync(request);
        const created: BeerModel = await this._beerService.createAsync(newBodyBeer);

        response.status = 201;
        response.body = created;
    }
    async updateBeerAsync({ response, request, params } : { response: Response, request: Request, params: RouteParams }){ 
        const updatedBeer = <BeerModel> await this.bodyTransformAsync(request, params);
        const result: BeerModel = await this._beerService.updateAsync(updatedBeer);

        response.status = 202;
        response.body = result;
    }

    async deleteBeerAsync({ response, params } : { response: Response, params: RouteParams }){ 
        const beerId: string = params.id as string;
        await this._beerService.deleteAsync(beerId);

        response.status = 204;
        response.body = {};
    }

    async getBeerAsync({ response, params } : { response: Response, params: RouteParams }){ 
        const beerId: string = params.id as string;
        const beer: BeerModel = await this._beerService.getOneAsync(beerId);

        response.status = 200;
        response.body = beer;
    }
    async getBeersAsync({ response } : { response: Response }){ 
        const beers: BeerModel[] = await this._beerService.getAsync();

        response.status = 200;
        response.body = { resources: beers };
    }

    private async bodyTransformAsync(request: Request, params?: RouteParams): Promise<BeerModel> {
        const body: Body = await request.body()
        const tranformed = body.value as BeerModel;
        if(params?.id !== undefined)
            tranformed.id = params.id;
    
        return tranformed;
    }
}



export default BeerController;