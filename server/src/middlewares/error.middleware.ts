import { Elysia } from "elysia";

export const errorMiddleware = new Elysia({ name: "error-middleware" }).onError(
  { as: "global" },
  ({ error, set }) => {
    const status = "status" in error && typeof error.status === "number" ? error.status : 500;
    set.status = status;
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error"
    };
  }
);
