
import { MongoClient, Database, Collection } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

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
  titleColor: BadgeColor
  value: string,
  valueWidth: number,
  valueSource: string | null,
  valueColor: BadgeColor,
  style: BadgeStyle
}

export enum BadgeColor {
  Slate,
  Savannah,
  Sunset,
  Serious
}

export enum BadgeStyle {
  Plastic,
  Flat
}

export class DataService {
  private db: Database;
  private dUsers: Collection<User>;

  constructor() {
    const client = new MongoClient();
    client.connectWithUri("mongodb://localhost:27017");

    this.db = client.database("test");
    this.dUsers = this.db.collection<User>("users");
  }

  async ensureUser(uId: string): Promise<void> {
    // Make sure the user doesn't exist already
    if (await this.dUsers.findOne({ name: uId })) return;

    // Create default project and badges
    const starterBadge: Badge = {
      id: 0,
      title: "Welcome to",
      titleWidth: 90,
      titleColor: BadgeColor.Slate,
      value: "Maintained",
      valueWidth: 90,
      valueSource: null,
      valueColor: BadgeColor.Savannah,
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

    this.dUsers.insertOne(newUser);
  }

  async getUserInfo(uId: string): Promise<User | undefined> {
    const info = await this.dUsers.findOne({ name: uId });
    if (info) return info;
    else return undefined;
  }

  async setUserWelcomed(uId: string): Promise<void> {
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { firstTime: false } });
  }

  async createBadge(uId: string, project: string): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const lastId = userProj.badges[userProj.badges.length - 1]?.id;
    const newBadge: Badge = {
      id: (lastId ?? 0) + 1,
      title: "New",
      titleWidth: 30,
      titleColor: BadgeColor.Slate,
      value: "Badge",
      valueWidth: 50,
      valueSource: null,
      valueColor: BadgeColor.Savannah,
      style: BadgeStyle.Plastic
    }

    userProj.badges.push(newBadge);
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { projects: userData } });
    return newBadge;
  }

  async deleteBadge(uId: string, project: string, bId: number): Promise<void> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return;

    const badgeIndex = userProj.badges.findIndex(b => b.id === bId);
    userProj.badges.splice(badgeIndex, 1);
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { projects: userData } });
  }

  async getBadge(uId: string, project: string, bId: number): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === bId);
    if (!userBadge) return undefined;
    else return userBadge;
  }

  async updateBadge(uId: string, project: string, bId: number, 
      newKey = "", newVal = "", keyWidth = 0, valWidth = 0): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === bId);
    if (!userBadge) return undefined;

    if (newKey) { userBadge.title = decodeURI(newKey); userBadge.titleWidth = keyWidth; }
    if (newVal) { userBadge.value = decodeURI(newVal); userBadge.valueWidth = valWidth; }
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { projects: userData } });
    return userBadge;
  }

  async createProject(uId: string, project: string): Promise<Project | undefined> {
    const user = await this.dUsers.findOne({ name: uId });
    if (!user || !project) return undefined;

    if (user.projects.find(p => p.title === project)) return undefined;

    const newBadge: Badge = {
      id: 0,
      title: "Created",
      titleWidth: 50,
      titleColor: BadgeColor.Slate,
      value: "Successfully",
      valueWidth: 90,
      valueSource: null,
      valueColor: BadgeColor.Savannah,
      style: BadgeStyle.Plastic
    }
    const newProject: Project = {
      title: project.replaceAll(" ", "-"),
      badges: [ newBadge ]
    }

    user.projects.push(newProject);
    user.projects.sort((a, b) => 
      ('' + a.title).localeCompare(b.title));
      await this.dUsers.updateOne(
        { name: uId }, 
        { $set: { projects: user.projects } });
    return newProject;
  }

  async deleteProject(uId: string, project: string): Promise<void> {
    const user = await this.dUsers.findOne({ name: uId });
    if (!user || !project) return;

    const projectIndex = user.projects.findIndex(p => p.title === project);
    user.projects.splice(projectIndex, 1);
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { projects: user.projects } });
  }
}