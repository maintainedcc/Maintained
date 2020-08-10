
interface Identifier {
  userName: string;
  expires: Date;
}

export class IdentityService {
  users: { [id: string]: Identifier };

  constructor() {
    this.users = {};
  }

  authorizeToken(token: string, user: string): void {
    // 10 Minute Expiry
    const newIdentifier: Identifier = {
      userName: user,
      expires: new Date(Date.now() + 600000)
    };
    this.users[token] = newIdentifier;
  }

  isAuthorized(token: string): boolean {
    if (this.users[token]?.expires.valueOf() > Date.now()) {
      return true;
    }
    else {
      delete this.users[token];
      return false;
    }
  }

  getAuthorization(token: string): string {
    if (this.users[token])
      return this.users[token].userName;
    else return "";
  }
}