import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

class MongoDb {
    private readonly _dbName: string;
    private readonly _urlHost: string
    private _client: MongoClient;

    constructor(dbName: string, urlHost: string){
        this._dbName = dbName;
        this._urlHost = urlHost;
        this._client = {} as MongoClient;
    }

    connect(){
        const client = new MongoClient();
        client.connectWithUri(this._urlHost);
        this._client = client;
    }

    getDatabase(){
        return this._client.database(this._dbName);
    }
}

const dbName = Deno.env.get("DB_NAME") || "deno_mongo";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";

const db = new MongoDb(dbName, dbHostUrl);
db.connect();

export default db;