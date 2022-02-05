
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({url}): Promise<EndpointOutput> {
	const jwt = url.searchParams.get("jwt");
	if (!jwt) return { status: 302, headers: { location: "/" } };

	/*
	TODO: Validate JWT originates from Maintained-ID
	Low-severity since JWT is verified by Maintained-API
	which means no user data / actions can be performed
	*/
	
	const expiry = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
	const cookie = `jwt=${url.searchParams.get("jwt")}; expires=${expiry.toUTCString()}; path=/`;

	return {
		status: 302,
		headers: {
			"location": "/dashboard",
			"set-cookie": cookie
		}
	}
}