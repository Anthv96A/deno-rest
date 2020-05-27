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
        if(updatedBeer?.id?.trim() === '') updatedBeer.id = params.id as string;
        return await this._service.updateAsync(updatedBeer);
    }

    protected async onDeleteOneAsync(id: string): Promise<any> {
        await this._service.deleteAsync(id);
    }

    protected async onGetOneAsync(id: string): Promise<BeerModel> {
        const result = await this._service.getOneAsync(id);
        return this._typeConverter.convertToTypeAsync(result, BeerModel);
    }

    protected async onGetAsync(): Promise<BeerModel[]> {
        const results: BeerModel[] = await this._service.getAsync();
        const promises: Promise<BeerModel>[] = results.map(bm => this._typeConverter.convertToTypeAsync(bm, BeerModel));
        return await Promise.all(promises);
    }
}



export default BeerController;