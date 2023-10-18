import { trpc } from "../lib/trpc";
import { todoRouter } from "../handler/todoRouter";

export const appRoute = trpc.router({
  todo: todoRouter
});

export type AppRouter = typeof appRoute;
