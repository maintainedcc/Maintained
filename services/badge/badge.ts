
import { IconService } from "./icon/icon.ts";
import { 
  Badge, 
  BadgeStyle, 
  BadgeColor, 
  BadgeField,
  BadgeFieldDynamic
} from "../mod.defs.ts";

interface BadgePartial {
  content: string // SVG or HTML string
  title: string // Accessible title string
  width: number // Width calculation (SVG)
}

export class BadgeService {
  private iconService: IconService;

  constructor() {
    this.iconService = new IconService();
  }

  async generate(badge: Badge): Promise<string> {
    const title = await this.generatePartial(badge.title, badge.style, 0);
    let offset = title.width;
    let innerContent = title.content;
    let accessibleTitle: string[] = [ title.title ];
    // FIX ASYNC HERE
    if (badge.values)
      for (let i = 0; i < (badge.values ?? []).length; i++) {
        const part = await this.generatePartial(badge.values[i], badge.style, offset);
        offset += part.width;
        innerContent += part.content;
        accessibleTitle.push(part.title);
      }

    const aTitle = accessibleTitle.join(" ");
    return this.generateWrapper(badge.style, innerContent, aTitle, offset);
  }

  private async generatePartial(field: BadgeField|BadgeFieldDynamic, style: BadgeStyle, offset = 0): Promise<BadgePartial> {
    // Parse potential icon
    let iconURI, iconMatch = field.content.toLowerCase().match(/^:([A-z]+):/);
    if (iconMatch) {
      field.content = field.content.replace(iconMatch[0], "").trim();
      iconURI = await this.iconService.getIconDataURL(iconMatch[1], true);
    }

    // If Dynamic, get the DVS content
    const f = field as BadgeFieldDynamic;
    if (f.source) {
      await fetch(f.source)
      .then(res => res.text())
      .then(res => { field.content = res; })
      .catch(ex => console.warn(ex));
    }

    // Hex color string of partial
    const colorString = this.colorMap(field.color);

    switch (style) {
      case BadgeStyle.Plastic:
        return {
          content: this.plastic(field, colorString, iconURI ?? null, offset),
          title: field.content,
          width: field.content.length * 5.2 + 50
        }
      case BadgeStyle.Flat:
        return {
          content: this.flat(field, colorString, iconURI ?? null, offset),
          title: field.content,
          width: field.content.length * 5.2 + 50
        }
      default:
        return { content: "", title: "", width: 0 };
    }
  }

  private generateWrapper(style: BadgeStyle, innerContent: string, title: string, totalWidth: number): string {
    switch (style) {
      case BadgeStyle.Plastic:
        return this.plasticWrapper(innerContent, title, totalWidth);
      case BadgeStyle.Flat:
        return this.flatWrapper(innerContent, title, totalWidth);
      default: throw EvalError("generateWrapper: Invalid badge style.");
    }
  }

  private colorMap(color: BadgeColor): string {
    switch(color) {
      case BadgeColor.Simple:
        return "#555";
      case BadgeColor.Slate:
        return "#556";
      case BadgeColor.Seabed:
        return "#013";
      case BadgeColor.Subterranean:
        return "#111";
      case BadgeColor.Savannah:
        return "#AB2";
      case BadgeColor.Sahara:
        return "#F80";
      case BadgeColor.Sunset:
        return "#F20";
      default: return "";
    }
  }

  private plastic(field: BadgeField, color: string, iconURI: string|null = null, offset = 0): string {
    field.width = field.content.length * 5.2 + 30;
    let x = field.width + 20;
    if (iconURI) x += 36;

    return `
    <rect x="${offset}" rx="3" width="${x}" height="20" fill="${color}"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <image x="${12 + offset}" y="3" height="14px" width="14px" href="${iconURI ?? ""}" />
      <text x="${x/2 + offset}" y="15" fill="#010101" fill-opacity=".3">${field.content}</text>
      <text x="${x/2 + offset}" y="14">${field.content}</text>
    </g>
    `;
  }

  private plasticWrapper(internalContent: string, title: string, totalWidth: number): string {
    // Plastic style gradient
    const gradientDef = `
    <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>`;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
      <title>${title}</title>
      ${gradientDef}
      <rect rx="3" width="${totalWidth}" height="20" fill="url(#a)"/>
      ${internalContent}
    </svg>
    `;
  }

  private flat(field: BadgeField, color: string, iconURI: string|null = null, offset = 0): string {
    field.width = field.content.length * 5.2 + 30;
    let x = field.width + 20;
    if (iconURI) x += 36;

    return `
    <rect x="${offset}" width="${x}" height="20" fill="${color}"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <image x="${12 + offset}" y="3" height="14px" width="14px" href="${iconURI ?? ""}" />
      <text x="${x/2 + offset}" y="15" fill="#010101" fill-opacity=".3">${field.content}</text>
      <text x="${x/2 + offset}" y="14">${field.content}</text>
    </g>
    `;
  }

  private flatWrapper(internalContent: string, title: string, totalWidth: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
      <title>${title}</title>
      ${internalContent}
    </svg>
    `;
  }

  /*
  async ftb(badge: MappedBadge): Promise<string> {
    // Map badge widths
    let keyW = badge.titleWidth + 30;
    let valW = badge.valueWidth + 30;

    // Text transform
    badge.title = badge.title.toUpperCase();
    badge.value = badge.value.toUpperCase();

    // If an icon exists, shift the widths
    let keyX = keyW / 2;
    if (badge.keyIconURI) {
      keyW += 34;
      keyX += 28;
    }
    valW = badge.dvsValue ? badge.dvsValue.length * 8 + 30 : valW;
    let valX = keyW + (valW / 2);
    let valWO = 0;
    if (badge.valIconURI) {
      valWO = 34;
      valX += 28;
    }

    if (badge.isMono)
      return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${keyW}" height="28">
        <rect width="${keyW}" height="28" fill="${badge.keyCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10">
          <image x="12" y="3.5" height="20px" width="20px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
        </g>
      </svg>`;
    else {
      return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${keyW + valW + valWO}" height="28">
        <rect width="${keyW}" height="28" fill="${badge.keyCString}"/>
        <rect x="${keyW}" width="${valW + valWO}" height="28" fill="${badge.valCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10">
          <image x="12" y="3.5" height="20px" width="20px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
          <image x="${keyW + 12}" y="3.5" height="20px" width="20px" href="${badge.valIconURI ?? ""}" />
          <text x="${valX}" y="17" font-weight="bold" textLength="${valW - 30}">${badge.dvsValue?.toUpperCase() ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }*/
}