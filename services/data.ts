
interface User {
  name: string,
  projects: Project[]
}

interface Project {
  title: string,
  badges: Badge[]
}

interface Badge {
  title: string,
  value: string,
  valueSource: string | null,
  style: BadgeStyle
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

  ensureUser(userId: string): void {
    // Make sure the user doesn't exist already
    if (this.users[userId]) return;

    // Create default project and badges
    const starterBadge: Badge = {
      title: "Welcome to",
      value: "Maintained",
      valueSource: null,
      style: BadgeStyle.ForTheBadge
    }
    const starterProject: Project = {
      title: userId,
      badges: [ starterBadge ]
    };
    const newUser: User = {
      name: userId,
      projects: [ starterProject ]
    }

    this.users[userId] = newUser;
  }

  getUserInfo(userId: string): User | undefined {
    const info = this.users[userId];
    if (info) return info;
    else return undefined;
  }

  getBadge(userId: string, project: string, badge: string): string {
    const userData = this.users[userId].projects;
    const userProj = userData.find(p => p.title === project);
    if (!userProj) return "";
    const userBadge = userProj.badges.find(b => b.title === decodeURI(badge));
    if (!userBadge) return "";
    else return userBadge.value;
  }
}