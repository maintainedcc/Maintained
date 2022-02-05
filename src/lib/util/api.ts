
import type { User } from "$lib/util/schema";

const baseUrl = import.meta.env.VITE_MAINTAINED_API_BASE;

// https://stackoverflow.com/a/15724300
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function getUser(): Promise<User> {
	const options = {
		credentials: "include" as any,
		headers: { "Authorization": getCookie("jwt") }};
	return await fetch(`${baseUrl}/v1/user/data`, options)
		.then(r => r.json());
}