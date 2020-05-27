import ITypeConverter from './ITypeConverter.ts';
import { Request } from 'https://deno.land/x/oak/mod.ts';

class HttpTypeConverter implements ITypeConverter {
    async convertToTypeAsync<T extends Object>(request: Request, type: (new () => T)) : Promise<T> {
        try {
            const actual: any = (await request.body()).value;  
            const keys: string[] = Object.keys(actual);
            const instance: T = this.createInstance<T>(type)

            keys.forEach((k: any) => this.createProp(instance, k, actual));
        
            return instance;
        } catch {
            return await Promise.resolve({} as T);
        }
    }

    private createInstance<T>(type: (new () => T)) : T {
        return new type();
    }
    private createProp<T, K extends keyof T>(target: T, key: K, value: T){
        if(key in target)
            target[key] = value[key];
    }    
}

export default HttpTypeConverter;