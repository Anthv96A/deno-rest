import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import BeerService from '../../src/services/beer/BeerService.ts';
import IBeerRepository from '../../src/repos/IBeerRepository.ts';
import Query from '../../src/repos/Query.ts';
import BeerModel from '../../src/models/Beer-Model.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const test = Deno.test;

test('Creates a new beer', async (): Promise<any> => {
    const mockRepo = mockBeerRepo(defaultRepoCallback);
    const beer = {
        name: 'Test',
        origin: 'England'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    const created = await beerService.createAsync(beer);

    assertEquals(created, beer);
});

test('Fails to validate on create a new beer with no name', async (): Promise<any> => {
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

test('Fails to validate on create a new beer with no origin', async (): Promise<any> => {
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

test('Fails to save on create a new beer', async (): Promise<any> => {
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

test('Updates a beer successfully', async () => {
    const beer = {
        id: v4.generate(),
        name: 'test',
        origin: 'test'
    } as BeerModel;

    const mockRepo: IBeerRepository = mockBeerRepo(defaultRepoCallback);
    const beerService : BeerService = new BeerService(mockRepo);

    const result: BeerModel = await beerService.updateAsync(beer);

    assertEquals(result, beer)
});

test('Fails to validate on update a new beer with no origin', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo(defaultRepoCallback);

    const beer = {
        id: v4.generate(),
        name: 'test',
        origin: ''
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.updateAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Invalid beer type');
    }
});

test('Fails to validate on update a new beer with no name', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo(defaultRepoCallback);

    const beer = {
        id: v4.generate(),
        name: '',
        origin: 'origin'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.updateAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Invalid beer type');
    }
});

test('Fails to update a beer', async (): Promise<any> => {
    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.updateBeerAsync = async (beer: BeerModel) => await Promise.resolve(null) as any;
    });

    const beer = {
        id: v4.generate(),
        name: 'name',
        origin: 'origin'
    } as BeerModel;

    const beerService : BeerService = new BeerService(mockRepo);
    try {
        await beerService.updateAsync(beer);
    } catch (error) {
        assertEquals(error.message, 'Beer was not updated');
    }
});

test('Deletes a beer', async () => {
    const idToTest: string = v4.generate();
    let counter: number = 0;
    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.deleteBeerAsync = async (query: Query) => {
            counter++;
            return query.where.id === idToTest ? await Promise.resolve(): await Promise.reject(new Error('Not Found'));
        }
    });

    const beerService : BeerService = new BeerService(mockRepo);
    await beerService.deleteAsync(idToTest);

    assertEquals(counter, 1, 'Should be called once');
});

test('Unable to delete beer when not found', async () => {
    const id: string = v4.generate();
    let counter: number = 0;
    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.deleteBeerAsync = async (query: Query) => {
            counter++;
            return query.where.id === id ? await Promise.resolve(): await Promise.reject(new Error('Not Found'));
        }
    });
    const noneMatchingId: string = v4.generate();
    const beerService: BeerService = new BeerService(mockRepo);
   
    try {
        await beerService.deleteAsync(noneMatchingId);
    } catch (error) {
        assertEquals(counter, 1, 'Should be called once');
        assertEquals(error.message, 'Not Found');
    }
});

test('Gets a beer', async () => {
    const idToTest: string = v4.generate();
    let counter: number = 0;
    const beer = {
        id: v4.generate(),
        name: 'name',
        origin: 'origin'
    } as BeerModel;

    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.getBeerAsync = async (query: Query) => {
            counter++;
            return query.where.id === idToTest ? await Promise.resolve(beer): await Promise.reject(new Error('Not Found'));
        }
    });

    const beerService : BeerService = new BeerService(mockRepo);
    const found: BeerModel = await beerService.getOneAsync(idToTest);

    assertEquals(counter, 1, 'Should be called once');
    assertEquals(found, beer);
});

test('Gets a beer', async () => {
    const idToTest: string = v4.generate();
    let counter: number = 0;
    const beer = {
        id: v4.generate(),
        name: 'name',
        origin: 'origin'
    } as BeerModel;

    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.getBeerAsync = async (query: Query) => {
            counter++;
            return query.where.id === idToTest ? await Promise.resolve(beer): await Promise.reject(new Error('Not Found'));
        }
    });

    const beerService : BeerService = new BeerService(mockRepo);
    const found: BeerModel = await beerService.getOneAsync(idToTest);

    assertEquals(counter, 1, 'Should be called once');
    assertEquals(found, beer);
});

test('Fails to get a beer', async () => {
    const idToTest: string = v4.generate();
    let counter: number = 0;
    const beer = {
        id: v4.generate(),
        name: 'name',
        origin: 'origin'
    } as BeerModel;

    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.getBeerAsync = async (query: Query) => {
            counter++;
            return query.where.id === idToTest ? await Promise.resolve(beer): await Promise.resolve(null) as any;
        }
    });

    const beerService : BeerService = new BeerService(mockRepo);

    try {
        await beerService.getOneAsync(idToTest);
    } catch (error) {
        assertEquals(counter, 1, 'Should be called once');
        assertEquals(error.message, 'Beer not found');
    }
});

test('Fails to get a beer with bad repo', async () => {
    const idToTest: string = v4.generate();
    let counter: number = 0;

    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.getBeerAsync = async (query: Query) => {
            counter++;
            return await Promise.reject(new Error('An error occurred'));
        }
    });

    const beerService : BeerService = new BeerService(mockRepo);

    try {
        await beerService.getOneAsync(idToTest);
    } catch (error) {
        assertEquals(counter, 1, 'Should be called once');
        assertEquals(error.message, 'An error occurred');
    }
});

test('Gets all beers', async () => {
    const expectedBeers: BeerModel[] = [
        { name: 'test1', origin: 'test1', id: v4.generate()},
        { name: 'test2', origin: 'test2', id: v4.generate()},
        { name: 'test3', origin: 'test3', id: v4.generate()},
    ];

    const mockRepo: IBeerRepository = mockBeerRepo((mock: IBeerRepository) => {
        mock.getBeersAsync = async () => await Promise.resolve(expectedBeers);
    });

    const beerService : BeerService = new BeerService(mockRepo);

    const actualBeers: BeerModel[] = await beerService.getAsync();

    assertEquals(actualBeers, expectedBeers);
})


function mockBeerRepo(config: IBeerRepoCallback) : IBeerRepository {
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

function defaultRepoCallback(repo: IBeerRepository) : void {}

type IBeerRepoCallback = (repo: IBeerRepository) => void;