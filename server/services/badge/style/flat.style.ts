
import type { BadgeField } from '../../mod.defs.ts';

export const Flat = {
  field(field: BadgeField, color: string, iconURI: string|null = null, offset = 0): string {
    // 20px padding
    field.width += 20;
    let x = field.width;
    if (iconURI) x += 36;

    return `
    <rect x="${offset}" width="${x}" height="20" fill="${color}"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <image x="${12 + offset}" y="3" height="14px" width="14px" href="${iconURI ?? ""}" />
      <text x="${x/2 + offset}" y="15" fill="#010101" fill-opacity=".3">${field.content}</text>
      <text x="${x/2 + offset}" y="14">${field.content}</text>
    </g>`;
  },

  wrapper(internalContent: string, title: string, totalWidth: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
      <title>${title}</title>
      ${internalContent}
    </svg>`;
  }
}