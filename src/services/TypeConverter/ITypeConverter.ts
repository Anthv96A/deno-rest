
interface ITypeConverter {
    convertToTypeAsync<T>(body: any, type: (new () => T)) : Promise<T>;
}

export default ITypeConverter;