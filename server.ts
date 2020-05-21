import { Application } from "oak/mod.ts";
import router from "./src/routes/routes.ts";

const port = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port:${port}...`);

await app.listen({port});