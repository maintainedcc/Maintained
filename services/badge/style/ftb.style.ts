
import type { BadgeField } from '../../mod.defs.ts';

export const FTB = {
  field(field: BadgeField, color: string, iconURI: string|null = null, offset = 0, bold = false): string {
    // Text uppercase transform
    field.content = field.content.toUpperCase();
    // Custom kerning
    const kerning = bold ? 1 : 1.5;
    // 40px padding & width recalculation
    field.width = field.content.length * 11 + 40;
    let x = field.width;
    if (iconURI) x += 36;

    return `
    <rect x="${offset}" width="${x}" height="36" fill="${color}"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="13">
      <image x="${12 + offset}" y="7" height="14px" width="14px" href="${iconURI ?? ""}" />
      <text x="${x/2 + offset}" ${bold ? "font-weight=\"bold\"" : ""} letter-spacing="${kerning}px" y="22">${field.content}</text>
    </g>`;
  },

  wrapper(internalContent: string, title: string, totalWidth: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="36">
      <title>${title}</title>
      ${internalContent}
    </svg>`;
  }
}