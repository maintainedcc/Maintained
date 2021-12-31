
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({query}: {query: URLSearchParams}): Promise<EndpointOutput> {
	const jwt = query.get("jwt");
	if (!jwt) return { status: 302, headers: { location: "/" } };

	/*
	TODO: Validate JWT originates from Maintained-ID
	Low-severity since JWT is verified by Maintained-API
	which means no user data / actions can be performed
	*/

	return {
		status: 302,
		headers: {
			"location": "/dashboard",
			"set-cookie": `jwt=${query.get("jwt")}`
		}
	}
}