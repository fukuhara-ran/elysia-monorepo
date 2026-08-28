import { Elysia } from "elysia";
import { auth } from "../libs/auth.lib";
import { UnauthorizedException } from "../errors/HTTPExceptions/UnauthorizedException";

export const authMiddleware = new Elysia({ name: "auth-middleware" }).derive(
  { as: "scoped" },
  async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) throw new UnauthorizedException("unauthenticated");
    return { user: session.user, session: session.session };
  }
);
