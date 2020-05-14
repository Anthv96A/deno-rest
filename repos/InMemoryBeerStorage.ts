import IBeerRepository from "./IBeerRepository.ts";
import BeerModel from "../models/Beer-Model.ts";
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

class InMemoryBeerStorage implements IBeerRepository {

    private readonly beers: BeerModel[] = [];

    async createBeerAsync(beer: BeerModel): Promise<BeerModel> {
        beer.id = v4.generate();
        this.beers.push(beer);
        return await Promise.resolve(beer);
    }
   async updateBeerAsync(beerId: string, beer: BeerModel): Promise<BeerModel> {
        const index: number = this.beers.findIndex(b => b.id === beerId);

        if(index === -1) return await Promise.reject();
        beer.id = beerId;
        this.beers[index] = beer;
        return await Promise.resolve(beer);
    }
    async deleteBeerAsync(beerId: string): Promise<any> {
        const index: number = this.beers.findIndex(b => b.id === beerId);

        if(index === -1)
            return await Promise.reject();

       this.beers.splice(index, 1);
       await Promise.resolve();
    }

    async getBeerAsync(beerId: string): Promise<BeerModel> {
        const beer = this.beers.find(beer => beer.id === beerId) as BeerModel;
        return await Promise.resolve(beer);
    }
    async getBeersAsync(): Promise<BeerModel[]> {
       return await Promise.resolve(this.beers);
    }
}

export default InMemoryBeerStorage;