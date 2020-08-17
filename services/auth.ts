
import { config } from '../environment.ts';

export class AuthService {
  constructor() {}

  // Get the auth URL from environment file
  getAuthURL(): string {
    const authUrl = "https://github.com/login/oauth/authorize";
    const authParams: string[][] = [
      ["client_id", config.client_id],
      ["redirect_uri", config.redirect_uri],
      ["state", "pog"]
    ];
    const authParamString = new URLSearchParams(authParams).toString();

    return `${authUrl}?${authParamString}`;
  }

  // Get GitHub app token manangement URL
  getManagementURL(): string {
    return `https://github.com/settings/connections/applications/${config.client_id}`;
  }

  // Get access token from oauth callback
  async getAccessToken(code: string, state: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = "https://github.com/login/oauth/access_token";
      const tokenParams: string[][] = [
        ["client_id", config.client_id],
        ["client_secret", config.client_secret],
        ["code", code],
        ["state", state]
      ]
      const paramString = new URLSearchParams(tokenParams).toString();

      const headers = new Headers({ "Accept": "application/json" });
      fetch(`${url}?${paramString}`, { method: "POST", headers: headers })
      .then(res => res.text())
      .then(res => {
        const authRes = JSON.parse(res);
        resolve(authRes["access_token"]);
      })
      .catch(ex => reject(ex));
    });
  }

  // Get username from token and API call
  async getUserUUID(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `token ${token}`
      });
      fetch("https://api.github.com/user", { headers: headers })
      .then(res => res.text())
      .then(res => resolve(JSON.parse(res)["login"]))
      .catch(ex => reject(ex));
    });
  }
}