import IBeerRepository from "./IBeerRepository.ts";
import BeerModel from "../models/Beer-Model.ts";
import Query from './Query.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

class InMemoryBeerStorage implements IBeerRepository {

    private readonly beers: BeerModel[] = [];

    async createBeerAsync(beer: BeerModel): Promise<BeerModel> {
        beer.id = v4.generate();
        this.beers.push(beer);
        return await Promise.resolve(beer);
    }
   async updateBeerAsync(beer: BeerModel): Promise<BeerModel> {
        const index: number = this.beers.findIndex(b => b.id === beer.id);

        if(index === -1) return await Promise.reject();
        this.beers[index] = beer;
        return await Promise.resolve(beer);
    }
    async deleteBeerAsync(query: Query): Promise<any> {
        const index: number = this.beers.findIndex(b => b.id === query.where.id);

        if(index === -1)return await Promise.reject();
        this.beers.splice(index, 1);
        await Promise.resolve();
    }

    async getBeerAsync(query: Query): Promise<BeerModel> {
        const beer = this.beers.find(beer => beer.id === query.where.id) as BeerModel;
        return await Promise.resolve(beer);
    }
    async getBeersAsync(): Promise<BeerModel[]> {
       return await Promise.resolve(this.beers);
    }
}

export default InMemoryBeerStorage;