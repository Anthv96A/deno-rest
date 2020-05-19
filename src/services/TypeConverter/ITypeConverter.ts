import { Request } from 'https://deno.land/x/oak/mod.ts';

interface ITypeConverter {
    convertToTypeAsync<T>(request: Request) : Promise<T>;
}

export default ITypeConverter;