import { user } from "$lib/util/data";
import type { Badge, User } from "$lib/util/schema";

// https://stackoverflow.com/a/15724300
function getCookie(name: string): string {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const baseUrl = import.meta.env.VITE_MAINTAINED_API_BASE;
function options(method = "GET") {
	return {
		credentials: "include" as any,
		headers: { Authorization: getCookie("jwt") },
		method: method
	};
}

export async function ensureUser(jwt: string): Promise<{ ok: boolean; message: string }> {
	return fetch(`${baseUrl}/v1/user/ensure?jwt=${jwt}`).then((r) => r.json());
}

export async function getUser(): Promise<void> {
	await fetch(`${baseUrl}/v1/user/data`, options())
		.then((r) => r.json())
		.then((r) => user.set(r as User));
}

export async function setUserWelcomed(): Promise<void> {
	await fetch(`${baseUrl}/v1/user/welcome`, options("POST")).then(() => getUser());
}

/* creating stuff */

export async function createBadge(project: string): Promise<void> {
	const query = `${baseUrl}/v1/badge/create?project=${project}`;
	await fetch(query, options("POST")).then(() => getUser());
}

export async function createProject(project: string): Promise<void> {
	const query = `${baseUrl}/v1/project/create?project=${project}`;
	await fetch(query, options("POST")).then(() => getUser());
}

/* updating stuff */

export async function updateBadge(project: string, badge: Badge): Promise<void> {
	const query = `${baseUrl}/v1/badge/update?project=${project}`;
	await fetch(query, { ...options("POST"), body: JSON.stringify(badge) });
}

/* deleting stuff */

export async function deleteBadge(project: string, id: number): Promise<void> {
	const query = `${baseUrl}/v1/badge/delete?project=${project}&id=${id}`;
	await fetch(query, options("POST")).then(() => getUser());
}

export async function deleteProject(project: string): Promise<void> {
	const query = `${baseUrl}/v1/project/delete?project=${project}`;
	await fetch(query, options("POST")).then(() => getUser());
}
