import { z } from "zod";
import { router } from "./trpc";
import { publicProcedure } from "./trpc";

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

export const appRouter = router({
	unusedRoute: publicProcedure
		// The input is unknown at this time.
		// A client could have sent us anything
		// so we won't assume a certain data type.
		.input(z.object({ id: z.string() }))
		.output(
			z.object({
				name: z.unknown(),
			})
		)
		.query(({ input }) => {
			const user = userList.find((u) => u.id === input.id);

			console.log(user);
			return { name: user?.name };
		}),
});
