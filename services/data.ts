
interface User {
  projects: Project[];
}

interface Project {
  [id: string]: {
    badges: Badge[]
  }
}

interface Badge {
  [id: string]: {
    value: string,
    valueSource: string | null,
    style: BadgeStyle
  }
}

enum BadgeStyle {
  ForTheBadge
}

export class DataService {
  // Imagine this was more permanent
  users: { [id: string]: User};

  constructor() {
    this.users = {};
  }

  ensureUser(id: string): void {
    // Make sure the user doesn't exist already
    if (this.users[id]) return;

    // Create default project and badges
    const starterBadge: Badge = {
      "Welcome to": {
        value: "Maintained.cc",
        valueSource: null,
        style: BadgeStyle.ForTheBadge
      }
    }
    const starterProject: Project = {
      id: { badges: [ starterBadge ] }
    }
    const newUser: User = {
      projects: [ starterProject ]
    }

    this.users[id] = newUser;
  }

  getUserInfo(id: string): User | undefined {
    const info = this.users[id];
    if (info) return info;
    else return undefined;
  }
}