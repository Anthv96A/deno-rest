import ITypeConverter from './ITypeConverter.ts';
import { Request, Body } from 'https://deno.land/x/oak/mod.ts';

class HttpTypeConverter implements ITypeConverter {
    async convertToTypeAsync<T>(request: Request) : Promise<T> {
        try {
             const model = {} as T;
             const body: Body = await request.body();  
             const valueKeys: string[] = Object.keys(body.value);
             valueKeys.forEach((vk: any) => {
                try {
                    createProp(model, vk, body.value);
                } catch{}
             });
            return model;
        } catch {
            return await Promise.resolve({} as T);
        }
    }
}

function createProp<T, K extends keyof T>(target: T, key: K, value: any){
    target[key] = value[key];
}

export default HttpTypeConverter;