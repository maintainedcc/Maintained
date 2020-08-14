
import { Badge, BadgeStyle } from './data.ts';

export class BadgeService {
  constructor() {}

  badge(badge: Badge): string {
    switch(badge.style) {
      case BadgeStyle.Flat:
        return this.flat(badge.title, badge.value, badge.titleWidth, badge.valueWidth);
      default:
        return this.plastic(badge.title, badge.value, badge.titleWidth, badge.valueWidth);
    }
  }

  plastic(key: string, value: string, keyW: number, valW: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW}" height="20">
      <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <rect rx="3" width="${keyW + valW}" height="20" fill="#555"/>
      <rect rx="3" x="${keyW}" width="${valW}" height="20" fill="#4c1"/>
      <rect rx="3" width="${keyW + valW}" height="20" fill="url(#a)"/>
      <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${key}</text>
        <text x="${keyW / 2}" y="14">${key}</text>
        <text x="${keyW + (valW / 2)}" y="15" fill="#010101" fill-opacity=".3">${value}</text>
        <text x="${keyW + (valW / 2)}" y="14">${value}</text>
      </g>
    </svg>
    `
  }

  flat(key: string, value: string, keyW: number, valW: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW}" height="20">
      <rect width="${keyW + valW}" height="20" fill="#555"/>
      <rect x="${keyW}" width="${valW}" height="20" fill="#4c1"/>
      <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${key}</text>
        <text x="${keyW / 2}" y="14">${key}</text>
        <text x="${keyW + (valW / 2)}" y="15" fill="#010101" fill-opacity=".3">${value}</text>
        <text x="${keyW + (valW / 2)}" y="14">${value}</text>
      </g>
    </svg>
    `
  }
}