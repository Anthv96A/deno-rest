import ICrudService from '../services/ICrudService.ts';
import ITypeConverter from '../services/TypeConverter/ITypeConverter.ts';
import { Request, Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';
import BaseModel from '../models/BaseModel.ts';

abstract class BaseController<T extends BaseModel, IService extends ICrudService<T>> {

    constructor(
        protected readonly _service: IService,
        protected readonly _typeConverter: ITypeConverter
    ){}

    async createAsync({ response, request }: { response: Response, request: Request }){ 
        const body: any = await this.extractRequestBody(request);
        const created: T = await this.onCreateAsync(body);
        
        response.status = 201;
        response.body = created;
    }

    async updateAsync({ response, request, params }: { response: Response, request: Request, params: RouteParams }){ 
        const body: any = await this.extractRequestBody(request);
        const updated: T = await this.onUpdateAsync(body, params);

        response.status = 202;
        response.body = updated;
    }

    async deleteAsync({ response, params }: { response: Response, params: RouteParams }){ 
        const id = <string> params?.id;
        await this.onDeleteOneAsync(id);

        response.status = 204;
        response.body = {};
    }

    async getOneAsync({ response, params }: { response: Response, params: RouteParams }){ 
        const id = <string> params?.id;
        const model: T = await this.onGetOneAsync(id);

        response.status = 200;
        response.body = model;
    }

    async getAsync({ response }: { response: Response }){ 
        const models: T[] = await this.onGetAsync();

        response.status = 200;
        response.body = { resources: models };
    }

    protected async abstract onCreateAsync(body: any) : Promise<T>;
    protected async abstract onUpdateAsync(body: any, params: RouteParams) : Promise<T>;
    protected async abstract onDeleteOneAsync(id: string) : Promise<any>;
    protected async abstract onGetOneAsync(id: string): Promise<T>;
    protected async abstract onGetAsync(): Promise<T[]>;

    private async extractRequestBody(request: Request) : Promise<any> {
        return (await request.body()).value;
    }
}

export default BaseController;