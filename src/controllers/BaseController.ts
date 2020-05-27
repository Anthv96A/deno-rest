import ICrudService from '../services/ICrudService.ts';
import ITypeConverter from '../services/TypeConverter/ITypeConverter.ts';
import { Request, Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';

abstract class BaseController<T, ISevice extends ICrudService<T>> {

    constructor(
        protected readonly _service: ISevice,
        protected readonly _typeConverter: ITypeConverter
    ){}

    async createAsync({ response, request }: { response: Response, request: Request }){ 
        const created: T = await this.onCreateAsync(request);
        
        response.status = 201;
        response.body = created;
    }

    async updateAsync({ response, request, params }: { response: Response, request: Request, params: RouteParams }){ 
        const updated: T = await this.onUpdateAsync(request, params);

        response.status = 202;
        response.body = updated;
    }

    async deleteAsync({ response, params }: { response: Response, params: RouteParams }){ 
        await this.onDeleteAsync(params);

        response.status = 204;
        response.body = {};
    }

    async getOneAsync({ response, params }: { response: Response, params: RouteParams }){ 
        const model: T = await this.onGetOneAsync(params);

        response.status = 200;
        response.body = model;
    }

    async getAsync({ response }: { response: Response }){ 
        const models: T[] = await this.onGetAsync();

        response.status = 200;
        response.body = { resources: models };
    }

    protected async abstract onCreateAsync(request: Request) : Promise<T>;
    protected async abstract onUpdateAsync(request: Request, params: RouteParams) : Promise<T>;
    protected async abstract onDeleteAsync(params: RouteParams): Promise<any>;
    protected async abstract onGetOneAsync(params: RouteParams): Promise<T>;
    protected async abstract onGetAsync(): Promise<T[]>;
}

export default BaseController;