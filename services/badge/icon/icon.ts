
import { exists } from "../../../deps.ts";

export class IconService {
  constructor() {}

  // Returns an SVG string or empty string
  // Gets icons from simpleicons
  async getIconDataURL(name: string, forceLight: boolean): Promise<string> {
    const path = `services/simpleicons/icons/${name}.svg`;
    if (await exists(path)) {
      const decoder = new TextDecoder("utf-8");
      let svgString = decoder.decode(await Deno.readFile(path));

      // Force fill white
      if (forceLight)
        svgString = svgString.replace("<path", "<path fill='#fff'");

      return "data:image/svg+xml;base64," + btoa(svgString);
    }
    else return "";
  }
}