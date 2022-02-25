import { writable } from "svelte/store";

interface Preferences {
	appTheme?: string;
}

export const preferences = writable<Preferences>({});
