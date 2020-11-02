
// Transient identifier
interface Identifier {
  userName: string;
  expires: Date;
}

export class AuthIdentityService {
  // Transient local store of authorized users
  // This is different to the authorization / database services
  users: { [id: string]: Identifier };

  constructor() {
    this.users = {};
  }

  // Authorizes a token locally based on an API call
  authorizeToken(token: string, user: string): void {
    // 10 Minute Expiry
    const newIdentifier: Identifier = {
      userName: user,
      expires: new Date(Date.now() + 600000)
    };
    this.users[token] = newIdentifier;
  }

  // Check if a token is authorized
  isAuthorized(token: string): boolean {
    if (this.users[token]?.expires.valueOf() > Date.now()) {
      return true;
    }
    else {
      // Delete the auth if not authorized / expired
      delete this.users[token];
      return false;
    }
  }

  // Gets username based on an authorized token
  getAuthorization(token: string): string {
    if (this.users[token])
      return this.users[token].userName;
    else return "";
  }
}