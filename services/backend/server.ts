import { TRPCError, initTRPC } from "@trpc/server";
import { z } from "zod";
import { OpenApiMeta } from "trpc-openapi";

const t = initTRPC.meta<OpenApiMeta>().create();

interface User {
	id: string;
	name: string;
}

const userList: User[] = [
	{
		id: "1",
		name: "KATT",
	},
];

export const appRouter = t.router({
	getUser: t.procedure
		.meta({ /* 👉 */ openapi: { method: "GET", path: "/get-user" } })
		.input(
			z.object({
				id: z.string(),
			})
		)
		.output(
			z.object({
				id: z.string(),
				name: z.string(),
			})
		)
		.query(({ input }) => {
			const user = userList.find((u) => u.id === input.id);

			if (!user) {
				throw new TRPCError({
					message: "User not found",
					code: "NOT_FOUND",
				});
			}

			console.log(user);

			return { user };
		}),
});

export type AppRouter = typeof appRouter;
