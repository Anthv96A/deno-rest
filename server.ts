import { Application } from 'https://deno.land/x/oak/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import router from "./src/routes/routes.ts";

const port: number = Number(Deno.env.get("APP_PORT")) || 8080;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port:${port}...`);

await app.listen({ port });