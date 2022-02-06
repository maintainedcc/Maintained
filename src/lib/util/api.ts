
import { user } from "$lib/util/data";
import type { User } from "$lib/util/schema";

// https://stackoverflow.com/a/15724300
function getCookie(name: string): string {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = import.meta.env.VITE_MAINTAINED_API_BASE;
function options(method = "GET") {
	return {
		credentials: "include" as any,
		headers: { "Authorization": getCookie("jwt") },
		method: method
	};
};

export async function getUser(): Promise<void> {
	await fetch(`${baseUrl}/v1/user/data`, options())
		.then(r => r.json())
		.then(r => user.set(r as User));
}

export async function createProject(project: string): Promise<void> {
	const query = `${baseUrl}/v1/project/create?project=${project}`;
	await fetch(query, options("POST"))
		.then(r => getUser());
}