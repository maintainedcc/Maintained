import { writable } from "svelte/store";
import type { User } from "$lib/util/schema";

export const user = writable<User>({
	name: "undefined",
	projects: [],
	firstTime: true
});
