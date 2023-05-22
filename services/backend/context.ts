import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import clerk, { type User } from "@clerk/clerk-sdk-node";
import { prisma } from "database";
import { getAuth } from "./utils/getAuth";

type IUserProps = {
	user: User | null;
};

export const createContextInner = async ({ user }: IUserProps) => {
	return {
		user,
		prisma,
	};
};

// created for each request
export const createContext = async (opts: CreateExpressContextOptions) => {
	// checking auth status
	async function getUser() {
		// request for ID
		const { userId } = getAuth(opts.req);
		// use Id to fetch user
		const user = userId ? await clerk.users.getUser(userId) : null;

		return user;
	}
	const user = await getUser();

	return await createContextInner({ user });
};

export type Context = inferAsyncReturnType<typeof createContext>;
