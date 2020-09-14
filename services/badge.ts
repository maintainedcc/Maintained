
import { Badge, BadgeStyle, BadgeColor } from './data.ts';
import { IconService } from "./icon.ts";

interface MappedBadge extends Badge {
  keyCString?: string,
  valCString?: string,
  keyIconURI?: string,
  valIconURI?: string,
  dvsValue?: string
}

export class BadgeService {
  private iconService: IconService;

  constructor() {
    this.iconService = new IconService();
  }

  // Returns an SVG string
  async badge(badge: Badge): Promise<string> {
    const mapped = await this.processor(badge);

    switch(badge.style) {
      case BadgeStyle.Plastic:
        return await this.plastic(mapped);
      case BadgeStyle.Flat:
        return await this.flat(mapped);
      case BadgeStyle.ForTheBadge:
        return await this.ftb(mapped);
    }
  }

  // Processes and validates badges
  private async processor(badge: Badge): Promise<MappedBadge> {
    const m: MappedBadge = badge;

    m.keyCString = this.colorMap(badge.titleColor);
    m.valCString = this.colorMap(badge.valueColor);

    m.dvsValue = badge.valueSource ? await this.dvsFetch(badge.valueSource ?? "") : undefined;

    //m.keyIconURI = await this.iconService.getIconDataURL("microsoftonenote", true);
    //m.valIconURI = await this.iconService.getIconDataURL("microsoftword", false);

    return m;
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
    }
  }

  private async dvsFetch(url: string): Promise<string | undefined> {
    return await fetch(url)
    .then(res => res.text())
    .catch(() => undefined);
  }

  async plastic(badge: MappedBadge): Promise<string> {
    // Map badge widths
    let keyW = badge.titleWidth;
    let valW = badge.valueWidth;

    // If an icon exists, shift the widths
    let keyX = keyW / 2;
    if (badge.keyIconURI) {
      keyW += 30;
      keyX += 25;
    }
    let valX = keyW + (valW / 2);
    let valWO = 0;
    if (badge.valIconURI) {
      valWO = 30;
      valX += 25;
    }

    // Plastic style gradient
    const gradientDef = `
    <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>`;

    // Return different styles for mono badges
    if (badge.isMono)
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW}" height="20">
        ${gradientDef}
        <rect rx="3" width="${keyW}" height="20" fill="${badge.keyCString}"/>
        <rect rx="3" width="${keyW}" height="20" fill="url(#a)"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyW / 2}" y="14">${badge.title}</text>
        </g>
      </svg>`;
    else {
      valW = badge.dvsValue ? badge.dvsValue.length * 5.2 + 30 : badge.valueWidth;
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW + valWO}" height="20">
        ${gradientDef}
        <rect rx="3" width="${keyW + valW}" height="20" fill="${badge.keyCString}"/>
        <rect rx="3" x="${keyW}" width="${valW + valWO}" height="20" fill="${badge.valCString}"/>
        <rect rx="3" width="${keyW + valW + valWO}" height="20" fill="url(#a)"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <image x="12" y="3" height="14px" width="14px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyX}" y="14">${badge.title}</text>
          <image x="${keyW + 12}" y="3" height="14px" width="14px" href="${badge.valIconURI ?? ""}" />
          <text x="${valX}" y="15" fill="#010101" fill-opacity=".3">${badge.dvsValue ?? badge.value}</text>
          <text x="${valX}" y="14">${badge.dvsValue ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }

  async flat(badge: MappedBadge): Promise<string> {
    // Map badge widths
    let keyW = badge.titleWidth;
    let valW = badge.valueWidth;

    // If an icon exists, shift the widths
    let keyX = keyW / 2;
    if (badge.keyIconURI) {
      keyW += 30;
      keyX += 25;
    }
    let valX = keyW + (valW / 2);
    let valWO = 0;
    if (badge.valIconURI) {
      valWO = 30;
      valX += 25;
    }

    if (badge.isMono)
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW}" height="20">
        <rect width="${keyW}" height="20" fill="${badge.keyCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <image x="12" y="3" height="14px" width="14px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyX}" y="14">${badge.title}</text>
        </g>
      </svg>`;
    else {
      valW = badge.dvsValue ? badge.dvsValue.length * 5.2 + 30 : badge.valueWidth;
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW + valWO}" height="20">
        <rect width="${keyW + valW}" height="20" fill="${badge.keyCString}"/>
        <rect x="${keyW}" width="${valW + valWO}" height="20" fill="${badge.valCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <image x="12" y="3" height="14px" width="14px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyX}" y="14">${badge.title}</text>
          <image x="${keyW + 12}" y="3" height="14px" width="14px" href="${badge.valIconURI ?? ""}" />
          <text x="${valX}" y="15" fill="#010101" fill-opacity=".3">${badge.dvsValue ?? badge.value}</text>
          <text x="${valX}" y="14">${badge.dvsValue ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }

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
          <image x="12" y="3" height="20px" width="20px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
        </g>
      </svg>`;
    else {
      valW = badge.dvsValue ? badge.dvsValue.length * 8 + 30 : valW;
      return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${keyW + valW + valWO}" height="28">
        <rect width="${keyW}" height="28" fill="${badge.keyCString}"/>
        <rect x="${keyW}" width="${valW + valWO}" height="28" fill="${badge.valCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10">
          <image x="12" y="3" height="20px" width="20px" href="${badge.keyIconURI ?? ""}" />
          <text x="${keyX}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
          <image x="${keyW + 12}" y="3" height="20px" width="20px" href="${badge.valIconURI ?? ""}" />
          <text x="${valX}" y="17" font-weight="bold" textLength="${valW - 30}">${badge.dvsValue?.toUpperCase() ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }
}