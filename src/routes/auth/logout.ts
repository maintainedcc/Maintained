
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({url}): Promise<EndpointOutput> {
  // Clear JWT cookie
	const expiry = new Date().toUTCString();
	const cookie = `jwt=; expires=${expiry}; path=/`;

	return {
		status: 302,
		headers: {
			"location": "/",
			"set-cookie": cookie
		}
	}
}