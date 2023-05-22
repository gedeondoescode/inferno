import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { OpenApiMeta } from "trpc-openapi";
import { type Context } from "./context";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

const t = initTRPC.meta<OpenApiMeta>().context<Context>().create({
	transformer: SuperJSON,
});

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
