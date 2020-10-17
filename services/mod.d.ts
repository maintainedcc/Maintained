
export interface Badge {
  id: number
  title: BadgeField
  values?: BadgeFieldDynamic[]
  redirect?: string
  style: BadgeStyle
}

export interface BadgeField {
  content: string
  color: BadgeColor
  width: number
}

export interface BadgeFieldDynamic extends BadgeField {
  source?: string // Dynamic Value Sources URI
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