interface ICrudService<T> {
    createAsync(body: T): Promise<T>;
    updateAsync(body: T): Promise<T>;
    deleteAsync(id: string): Promise<any>;
    getOneAsync(id: string): Promise<T>;
    getAsync(): Promise<T[]>;
}

export default ICrudService;