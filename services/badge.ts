
import { Badge, BadgeStyle, BadgeColor } from './data.ts';

interface MappedBadge extends Badge {
  keyCString?: string,
  valCString?: string,
  dvsValue?: string
}

export class BadgeService {
  constructor() {}

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
    const keyW = badge.titleWidth;
    let valW = badge.valueWidth;

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
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW}" height="20">
        ${gradientDef}
        <rect rx="3" width="${keyW + valW}" height="20" fill="${badge.keyCString}"/>
        <rect rx="3" x="${keyW}" width="${valW}" height="20" fill="${badge.valCString}"/>
        <rect rx="3" width="${keyW + valW}" height="20" fill="url(#a)"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyW / 2}" y="14">${badge.title}</text>
          <text x="${keyW + (valW / 2)}" y="15" fill="#010101" fill-opacity=".3">${badge.dvsValue ?? badge.value}</text>
          <text x="${keyW + (valW / 2)}" y="14">${badge.dvsValue ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }

  async flat(badge: MappedBadge): Promise<string> {
    // Map badge widths
    const keyW = badge.titleWidth;
    let valW = badge.valueWidth;

    if (badge.isMono)
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW}" height="20">
        <rect width="${keyW}" height="20" fill="${badge.keyCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyW / 2}" y="14">${badge.title}</text>
        </g>
      </svg>`;
    else {
      valW = badge.dvsValue ? badge.dvsValue.length * 5.2 + 30 : badge.valueWidth;
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${keyW + valW}" height="20">
        <rect width="${keyW + valW}" height="20" fill="${badge.keyCString}"/>
        <rect x="${keyW}" width="${valW}" height="20" fill="${badge.valCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="${keyW / 2}" y="15" fill="#010101" fill-opacity=".3">${badge.title}</text>
          <text x="${keyW / 2}" y="14">${badge.title}</text>
          <text x="${keyW + (valW / 2)}" y="15" fill="#010101" fill-opacity=".3">${badge.dvsValue ?? badge.value}</text>
          <text x="${keyW + (valW / 2)}" y="14">${badge.dvsValue ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }

  async ftb(badge: MappedBadge): Promise<string> {
    // Map badge widths
    const keyW = badge.titleWidth + 30;
    let valW = badge.valueWidth + 30;

    badge.title = badge.title.toUpperCase();
    badge.value = badge.value.toUpperCase();

    if (badge.isMono)
      return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${keyW}" height="28">
        <rect width="${keyW}" height="28" fill="${badge.keyCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10">
          <text x="${keyW / 2}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
        </g>
      </svg>`;
    else {
      valW = badge.dvsValue ? badge.dvsValue.length * 8 + 30 : valW;
      return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${keyW + valW}" height="28">
        <rect width="${keyW}" height="28" fill="${badge.keyCString}"/>
        <rect x="${keyW}" width="${valW}" height="28" fill="${badge.valCString}"/>
        <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10">
          <text x="${(keyW / 2)}" y="17" textLength="${badge.titleWidth}">${badge.title}</text>
          <text x="${keyW + (valW / 2)}" y="17" font-weight="bold" textLength="${valW - 30}">${badge.dvsValue?.toUpperCase() ?? badge.value}</text>
        </g>
      </svg>`;
    }
  }
}