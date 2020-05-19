import IBeerService from '../../src/services/beer/IBeerService.ts';
import IBeerRepository from '../../src/repos/IBeerRepository.ts';
import { Request, Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';

export type IBeerServiceCallback = (beerService: IBeerService) => void;
export type RequestCallback = (req: Request) => void;
export type ResponseCallback = (res: Response) => void;
export type RouteParamsCallback = (params: RouteParams) => void;
export type IBeerRepoCallback = (repo: IBeerRepository) => void;

export function defaultRepoCallback(_: IBeerRepository) : void {}
export function defaultBeerServiceCallback(_: IBeerService): void {};
export function defaultRequestCallback(_: Request): void {};
export function defaultResponseCallback(_: Response): void {};
export function defaultRouteParamsCallback(_: RouteParams): void {};