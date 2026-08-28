import { Elysia } from "elysia";
import { z } from "zod";
import { createEmployeeSchema, updateEmployeeSchema } from "@elysia-monorepo/shared";
import { employeeService } from "./employee.service";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const employeeRoute = new Elysia({ prefix: "/employees" })
  .use(authMiddleware)
  .get("/", () => employeeService.list())
  .get("/:id", ({ params }) => employeeService.getById(params.id), {
    params: z.object({ id: z.uuid() })
  })
  .post("/", ({ body }) => employeeService.create(body), {
    body: createEmployeeSchema
  })
  .patch("/:id", ({ params, body }) => employeeService.update(params.id, body), {
    params: z.object({ id: z.uuid() }),
    body: updateEmployeeSchema
  })
  .delete("/:id", ({ params }) => employeeService.remove(params.id), {
    params: z.object({ id: z.uuid() })
  });
