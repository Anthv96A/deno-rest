import IBeerService from '../../src/services/beer/IBeerService.ts';
import IBeerRepository from '../../src/repos/IBeerRepository.ts';
import Query from '../../src/repos/Query.ts';
import BeerModel from '../../src/models/BeerModel.ts';
import { Request, Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';

type IBeerServiceCallback = (beerService: IBeerService) => void;
type RequestCallback = (req: Request) => void;
type ResponseCallback = (res: Response) => void;
type RouteParamsCallback = (params: RouteParams) => void;
type IBeerRepoCallback = (repo: IBeerRepository) => void;

export function mockIBeerRepository(config: IBeerRepoCallback = defaultRepoCallback) : IBeerRepository {
    const mock = {
        createBeerAsync : async (beer: BeerModel) => await Promise.resolve(beer),
        updateBeerAsync : async (beer: BeerModel) => await Promise.resolve(beer),
        deleteBeerAsync : async (query: Query) => await Promise.resolve(),
        getBeerAsync : async (query: Query) => await Promise.resolve({} as BeerModel),
        getBeersAsync : async () => await Promise.resolve([] as BeerModel[]),
    } as IBeerRepository;

    config(mock);
    return mock;
}

export function mockRequest(config: RequestCallback = defaultRequestCallback): Request {
    const mock = {} as Request;
    config(mock);
    return mock;
}

export function mockResponse(config: ResponseCallback = defaultResponseCallback): Response {
    const mock = {} as Response;
    config(mock);
    return mock;
}

export function mockRouteParams(config: RouteParamsCallback = defaultRouteParamsCallback): RouteParams {
    const mock = {} as RouteParams;
    config(mock);
    return mock;
}

export function mockBeerService(config: IBeerServiceCallback = defaultBeerServiceCallback): IBeerService {
    const mock = {
        getAsync: async () => await Promise.resolve([] as BeerModel[]),
        getOneAsync: async (id: string) => await Promise.resolve({}) as BeerModel,
        createAsync: async(beer: BeerModel) => await Promise.resolve(beer),
        updateAsync: async(beer: BeerModel) => await Promise.resolve(beer),
        deleteAsync: async(id: string) => await Promise.resolve()
    } as IBeerService;

    config(mock);
    return mock;
}

function defaultRepoCallback(_: IBeerRepository) : void {}
function defaultBeerServiceCallback(_: IBeerService): void {};
function defaultRequestCallback(_: Request): void {};
function defaultResponseCallback(_: Response): void {};
function defaultRouteParamsCallback(_: RouteParams): void {};