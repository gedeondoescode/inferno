import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./server";
import { OpenApiMeta, createOpenApiExpressMiddleware } from "trpc-openapi";

import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./openapi";
import { createContext } from "./context";

const app = express();

app.use(
	"/api/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
		onError: console.log,
	})
);

app.use(
	"/api",
	createOpenApiExpressMiddleware({ router: appRouter, createContext })
);

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));
app.listen(5000, () => console.log("up and running on", "localhost:5000"));

export type { appRouter } from "./server";
