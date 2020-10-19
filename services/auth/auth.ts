
import { config } from '../../deps.ts';
import { AuthIdentityService } from './auth.identity.ts';

export class AuthService {
  private identity: AuthIdentityService;

  constructor() {
    this.identity = new AuthIdentityService();
  }

  // Wrapper on top of IdentityService function
  isAuthorized(token: string): boolean {
    return this.identity.isAuthorized(token);
  }

  // Authorize a token in the identity cache
  // Returns a UUID based on input token
  async authorizeToken(token: string): Promise<string> {
    if (this.identity.isAuthorized(token))
      return this.identity.getAuthorization(token);
    else
      return this.getUserUUID(token)
      .then(uuid => {
        this.identity.authorizeToken(token, uuid);
        return uuid;
      })
      .catch(ex => {
        throw new EvalError("Failed to auth token: " + ex);
      });
  }

  // Get access token from oauth callback
  async getAccessToken(code: string, state: string): Promise<string> {
    const url = "https://github.com/login/oauth/access_token";
    const tokenParams: string[][] = [
      ["client_id", config.client_id],
      ["client_secret", config.client_secret],
      ["code", code],
      ["state", state]
    ]
    const paramString = new URLSearchParams(tokenParams).toString();

    const headers = new Headers({ "Accept": "application/json" });
    return fetch(`${url}?${paramString}`, { method: "POST", headers: headers })
      .then(res => res.text())
      .then(res => JSON.parse(res)["access_token"])
      .catch(ex => {
        throw new EvalError("Failed to get token: " + ex);
      });
  }

  // Get username from token and API call
  private async getUserUUID(token: string): Promise<string> {
    const headers = new Headers({
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `token ${token}`
    });
    return fetch("https://api.github.com/user", { headers: headers })
      .then(res => res.text())
      .then(res => JSON.parse(res)["login"])
      .catch(ex => {
        throw new EvalError("Failed to get UUID: " + ex);
      });
  }

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
}