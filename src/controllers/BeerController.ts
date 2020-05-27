import BaseController from './BaseController.ts';
import IBeerService from "../services/beer/IBeerService.ts";
import ITypeConverter from "../services/TypeConverter/ITypeConverter.ts";
import BeerModel from "../models/BeerModel.ts";
import { Request, RouteParams } from 'https://deno.land/x/oak/mod.ts';

class BeerController extends BaseController<BeerModel, IBeerService> {

    constructor(service: IBeerService, typeConverter: ITypeConverter){
        super(service, typeConverter);
    }

    protected async onCreateAsync(body: any): Promise<BeerModel> {
        const newBodyBeer: BeerModel = await this._typeConverter.convertToTypeAsync(body, BeerModel);
        return await this._service.createAsync(newBodyBeer);
    }

    protected async onUpdateAsync(request: Request, params: RouteParams): Promise<BeerModel> {
        const updatedBeer: BeerModel = await this._typeConverter.convertToTypeAsync(request, BeerModel);
        if(updatedBeer.id === undefined) updatedBeer.id = params.id;
        return await this._service.updateAsync(updatedBeer);
    }

    protected async onDeleteOneAsync(id: string): Promise<any> {
        await this._service.deleteAsync(id);
    }

    protected async onGetOneAsync(id: string): Promise<BeerModel> {
        return await this._service.getOneAsync(id);
    }

    protected async onGetAsync(): Promise<BeerModel[]> {
        return await this._service.getAsync();
    }
}



export default BeerController;