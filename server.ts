import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from "./src/routes/routes.ts";

const HOST = 'localhost',
    PORT = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port:${PORT}...`);

await app.listen(`${HOST}:${PORT}`);