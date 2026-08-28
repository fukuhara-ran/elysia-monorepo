import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { env } from "./libs/env.lib";
import { auth } from "./libs/auth.lib";
import { errorMiddleware } from "./middlewares/error.middleware";
import { employeeRoute } from "./modules/employee/employee.route";

const app = new Elysia()
  .use(errorMiddleware)
  .use(cors({ origin: env.CLIENT_URL, credentials: true }))
  .use(swagger())
  .mount(auth.handler)
  .use(employeeRoute)
  .listen(env.PORT);

export type App = typeof app;

console.log(`server running at http://localhost:${env.PORT}`);
