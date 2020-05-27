import ITypeConverter from './ITypeConverter.ts';

class HttpTypeConverter implements ITypeConverter {
    async convertToTypeAsync<T extends Object>(body: any, type: (new () => T)) : Promise<T> {
        try {
            const instance: T = this.createInstance<T>(type)
            Object.keys(body).forEach((k: any) => this.createProp(instance, k, body));
        
            return await Promise.resolve(instance);
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