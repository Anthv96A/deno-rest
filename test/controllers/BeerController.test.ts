import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import IBeerService from '../../src/services/beer/IBeerService.ts';
import BeerController from '../../src/controllers/BeerController.ts';
import BeerModel from '../../src/models/Beer-Model.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Request, Response, RouteParams, Body } from 'https://deno.land/x/oak/mod.ts';
import { 
    IBeerServiceCallback,
    RequestCallback,
    ResponseCallback, 
    RouteParamsCallback,
    defaultRequestCallback,
    defaultResponseCallback,
    defaultRouteParamsCallback,
    defaultBeerServiceCallback
 } from '../helpers/unit-helpers.ts';

const test = Deno.test;

test('Create a new beer and returns a status of 201', async () => {
    const beer = { name: 'name', origin: 'origin'} as BeerModel;
    const createdBeer = { ...beer, id: v4.generate() } as BeerModel;
    const req: Request = mockRequest((mock: Request) => {
        mock.body = async () =>  await Promise.resolve({ value: beer, type: 'json' } as Body) as any;
    });

    const res: Response = mockResponse();
    const context = { response: res, request: req };

    const beerService = mockBeerService((mock: IBeerService) => {
        mock.createAsync = async (beer: BeerModel) => {
            return await Promise.resolve(createdBeer)
        }
    });

    const beerController: BeerController = new BeerController(beerService);

    await beerController.createBeerAsync(context);

    assertEquals(res.status, 201);
    assertEquals(res.body, createdBeer);
});
test('Updates an existing beer and returns a status of 202', async () => {
    const id: string = v4.generate();
    const beer = { name: 'name', origin: 'origin', id: id} as BeerModel;
    const updatedBeer = { ...beer, name: 'Changed', id: id } as BeerModel;

    const req: Request = mockRequest((mock: Request) => {
        mock.body = async () => await Promise.resolve({ value: beer, type: 'json' } as Body) as any;
    });

    const res: Response = mockResponse();
    const params: RouteParams = mockRouteParams((mock: RouteParams) => mock.id = id);

    const context = { response: res, request: req, params: params};
    const beerService = mockBeerService((mock: IBeerService) => {
        mock.updateAsync = async (beer: BeerModel) => beer.id === undefined ? await Promise.reject('Not found') : await Promise.resolve(updatedBeer);
    });

    const beerController: BeerController = new BeerController(beerService);

    await beerController.updateBeerAsync(context);

    assertEquals(res.status, 202);
    assertEquals(res.body, updatedBeer);
});

test('Deletes a beer and returns a status of 204', async () => {
    const id: string = v4.generate();

    const res: Response = mockResponse();
    const params: RouteParams = mockRouteParams((mock: RouteParams) => mock.id = id);

    const context = { response: res, params: params};
    const beerService = mockBeerService((mock: IBeerService) => {
        mock.deleteAsync = async (beerId: string) => beerId === undefined ? await Promise.reject('Not found') : await Promise.resolve();
    });

    const beerController: BeerController = new BeerController(beerService);

    await beerController.deleteBeerAsync(context);

    assertEquals(res.status, 204);
});

test('Gets a beer and returns a status of 200', async () => {
    const beers: BeerModel[] = [
        { name: 'name', origin: 'origin', id: v4.generate() },
        { name: 'name2', origin: 'origin2', id: v4.generate() },
        { name: 'name3', origin: 'origin3', id: v4.generate() },
    ];
    const res: Response = mockResponse();
 
    const context = { response: res };
    const beerService = mockBeerService((mock: IBeerService) => {
        mock.getAsync = async () => await Promise.resolve(beers)
    });

    const beerController: BeerController = new BeerController(beerService);

    await beerController.getBeersAsync(context);

    assertEquals(res.status, 200);
    assertEquals(res.body.resources, beers);
});

test('Gets all beers and returns a status of 200', async () => {
    const id: string = v4.generate();
    const beer = { name: 'name', origin: 'origin', id: id } as BeerModel;
    const res: Response = mockResponse();
    const params: RouteParams = mockRouteParams((mock: RouteParams) => mock.id = id);

    const context = { response: res, params: params };
    const beerService = mockBeerService((mock: IBeerService) => {
        mock.getOneAsync = async (beerId: string) => beerId === undefined ? await Promise.reject('Not found') : await Promise.resolve(beer);
    });

    const beerController: BeerController = new BeerController(beerService);

    await beerController.getBeerAsync(context);

    assertEquals(res.status, 200);
    assertEquals(res.body, beer);
});

function mockRequest(config: RequestCallback = defaultRequestCallback): Request {
    const mock = {} as Request;

    config(mock);
    return mock;
}

function mockResponse(config: ResponseCallback = defaultResponseCallback): Response {
    const mock = {} as Response;

    config(mock);
    return mock;
}

function mockRouteParams(config: RouteParamsCallback = defaultRouteParamsCallback): RouteParams {
    const mock = {} as RouteParams;

    config(mock);
    return mock;
}

function mockBeerService(config: IBeerServiceCallback = defaultBeerServiceCallback): IBeerService {
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

