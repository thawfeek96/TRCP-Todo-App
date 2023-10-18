import { trpc } from "../lib/trpc";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(() => {
    return prisma.todos.findMany(); // Assuming your Prisma model is named 'todo'
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const title = input.title;
      return prisma.todos.create({
        data: {
          title: title,
          isCompleted: false,
        },
      });
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.todos.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: trpc.procedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ input }) => {
      return prisma.todos.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),
});
