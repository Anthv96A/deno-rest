import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import BeerService from '../../src/services/beer/BeerService.ts';
import IBeerRepository from '../../src/repos/IBeerRepository.ts';
import BeerModel from '../../src/models/Beer-Model.ts';

Deno.test('Creates a new beer', async (): Promise<any> => {
    const mockRepo = mockBeerRepo(defaultRepoCallback);
    const beer = {
        name: 'Test',
        origin: 'England'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    const created = await beerService.createAsync(beer);

    assertEquals(created, beer);
});

Deno.test('Fails to validate on create a new beer with no name', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo(defaultRepoCallback);

    const beer = {
        name: '',
        origin: 'England'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.createAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Invalid beer type');
    }
});

Deno.test('Fails to validate on create a new beer with no origin', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo(defaultRepoCallback);

    const beer = {
        name: 'test',
        origin: ''
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.createAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Invalid beer type');
    }
});

Deno.test('Fails to save on create a new beer with no origin', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.createBeerAsync = async (beer: BeerModel) => {  
            const result = await Promise.resolve(null);
            return result as any;
        };
    });

    const beer = {
        name: 'test',
        origin: 'test'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.createAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Beer was not created');
    }
});


function mockBeerRepo(config: IRepoCallback) : IBeerRepository {
    const mock = {
        createBeerAsync : async (beer: BeerModel) => await Promise.resolve(beer),
    } as IBeerRepository;

    if(config !== undefined){
        config(mock);
    }

    return mock;
}

function defaultRepoCallback(repo: IBeerRepository) : void {}

type IRepoCallback = (repo: IBeerRepository) => void;