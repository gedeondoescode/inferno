import { AuthObject } from "@clerk/backend";
import type { Request as ExpressRequest } from "express";

type ExpressRequestWithAuth = ExpressRequest & { auth: AuthObject };

export const getAuth = (req: ExpressRequest): AuthObject => {
	const authReq = req as ExpressRequestWithAuth;

	return authReq.auth;
};
