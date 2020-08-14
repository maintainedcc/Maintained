
interface User {
  name: string,
  firstTime: boolean;
  projects: Project[]
}

interface Project {
  title: string,
  badges: Badge[]
}

export interface Badge {
  id: number;
  title: string,
  titleWidth: number,
  value: string,
  valueWidth: number,
  valueSource: string | null,
  style: BadgeStyle
}

export enum BadgeStyle {
  Plastic,
  Flat
}

export class DataService {
  // Imagine this was more permanent
  users: { [id: string]: User};

  constructor() {
    this.users = {};
  }

  ensureUser(uId: string): void {
    // Make sure the user doesn't exist already
    if (this.users[uId]) return;

    // Create default project and badges
    const starterBadge: Badge = {
      id: 0,
      title: "Welcome to",
      titleWidth: 90,
      value: "Maintained",
      valueWidth: 90,
      valueSource: null,
      style: BadgeStyle.Plastic
    }
    const starterProject: Project = {
      title: uId,
      badges: [ starterBadge ]
    };
    const newUser: User = {
      name: uId,
      firstTime: true,
      projects: [ starterProject ]
    }

    this.users[uId] = newUser;
  }

  getUserInfo(uId: string): User | undefined {
    const info = this.users[uId];
    if (info) return info;
    else return undefined;
  }

  setUserWelcomed(uId: string): void {
    this.users[uId].firstTime = false;
    console.log(this.users[uId]);
  }

  createBadge(uId: string, project: string): Badge | undefined {
    const userData = this.users[uId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const lastId = userProj.badges[userProj.badges.length - 1]?.id;
    const newBadge: Badge = {
      id: (lastId ?? 0) + 1,
      title: "New",
      titleWidth: 30,
      value: "Badge",
      valueWidth: 50,
      valueSource: null,
      style: BadgeStyle.Plastic
    }

    userProj.badges.push(newBadge);
    return newBadge;
  }

  deleteBadge(uId: string, project: string, bId: number): void {
    const userData = this.users[uId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return;

    const badgeIndex = userProj.badges.findIndex(b => b.id === bId);
    userProj.badges.splice(badgeIndex, 1);
  }

  getBadge(uId: string, project: string, bId: number): Badge | undefined {
    const userData = this.users[uId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === bId);
    if (!userBadge) return undefined;
    else return userBadge;
  }

  updateBadge(uId: string, project: string, bId: number, 
      newKey = "", newVal = "", keyWidth = 0, valWidth = 0): Badge | undefined {
    const userData = this.users[uId]?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === bId);
    if (!userBadge) return undefined;

    if (newKey) { userBadge.title = decodeURI(newKey); userBadge.titleWidth = keyWidth; }
    if (newVal) { userBadge.value = decodeURI(newVal); userBadge.valueWidth = valWidth; }
    return userBadge;
  }

  createProject(uId: string, project: string): Project | undefined {
    const user = this.users[uId];
    if (!user || !project) return undefined;

    if (user.projects.find(p => p.title === project)) return undefined;

    const newBadge: Badge = {
      id: 0,
      title: "Created",
      titleWidth: 50,
      value: "Successfully",
      valueWidth: 90,
      valueSource: null,
      style: BadgeStyle.Plastic
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

  deleteProject(uId: string, project: string): void {
    const user = this.users[uId];
    if (!user || !project) return;

    const projectIndex = user.projects.findIndex(p => p.title === project);
    user.projects.splice(projectIndex, 1);
  }
}