
interface User {
  name: string,
  projects: Project[]
}

interface Project {
  title: string,
  badges: Badge[]
}

interface Badge {
  id: number;
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
      id: 0,
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

  createBadge(userId: string, project: string): Badge | undefined {
    const userData = this.users[userId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const lastId = userProj.badges[userProj.badges.length - 1]?.id;
    const newBadge: Badge = {
      id: (lastId ?? 0) + 1,
      title: "New",
      value: "Badge",
      valueSource: null,
      style: BadgeStyle.ForTheBadge
    }

    userProj.badges.push(newBadge);
    return newBadge;
  }

  deleteBadge(userId: string, project: string, badgeId: number): void {
    const userData = this.users[userId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return;

    const badgeIndex = userProj.badges.findIndex(b => b.id === badgeId);
    userProj.badges.splice(badgeIndex, 1);
  }

  getBadge(userId: string, project: string, badgeId: number): Badge | undefined {
    const userData = this.users[userId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === badgeId);
    if (!userBadge) return undefined;
    else return userBadge;
  }

  createProject(userId: string, project: string): Project | undefined {
    const user = this.users[userId];
    if (!user) return undefined;

    if (user.projects.find(p => p.title === project)) return undefined;

    const newBadge: Badge = {
      id: 0,
      title: "Created",
      value: "Successfully",
      valueSource: null,
      style: BadgeStyle.ForTheBadge
    }
    const newProject: Project = {
      title: project,
      badges: [ newBadge ]
    }

    user.projects.push(newProject);
    user.projects.sort((a, b) => 
      ('' + a.title).localeCompare(b.title));
    return newProject;
  }

  deleteProject(userId: string, project: string): void {
    const user = this.users[userId];
    if (!user || !project) return;

    const projectIndex = user.projects.findIndex(p => p.title === project);
    user.projects.splice(projectIndex, 1);
  }
}