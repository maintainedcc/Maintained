
export interface User {
	name: string // UUID
	firstTime: boolean
	projects: Project[]
	teams?: string[]
}

export interface Project {
	title: string
	badges: Badge[],
	defaultBadge: Badge
}

export interface Badge {
	id: number
	fields: BadgeField[]
	redirect?: string
	style: BadgeStyle
	// Frontend only
	hash?: string
}

export interface BadgeField {
	content: string
	color: BadgeColor
	iconURI?: string // Icon Resource
	source?: string // DVS URL
	width: number
}

export enum BadgeColor {
	Simple,
	Slate,
	Seabed,
	Subterranean,
	Savannah,
	Sahara,
	Sunset
}

export enum BadgeStyle {
	Plastic,
	Flat,
	ForTheBadge
}