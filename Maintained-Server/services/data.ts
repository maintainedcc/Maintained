
import {
  config,
  MongoClient, 
  Database, 
  Collection 
} from "../deps.ts";
import {
  Badge,
  BadgeColor,
  BadgeStyle
} from "./mod.defs.ts";

// Tightly-coupled interfaces
// Do not need to export these
interface User {
  name: string
  firstTime: boolean
  projects: Project[]
}
interface Project {
  title: string
  badges: Badge[]
}

export class DataService {
  private db: Database;
  private dUsers: Collection<User>;

  constructor() {
    const client = new MongoClient();
    client.connectWithUri("mongodb://localhost:27017");

    this.db = client.database(config.database_name);
    this.dUsers = this.db.collection<User>("users");

    this.dUsers.count().then(num => {
      console.log(`Loaded DB with ${num} users.`);
    });
  }

  // Ensure a user exists
  async ensureUser(uId: string): Promise<void> {
    // Make sure the user doesn't exist already
    if (await this.dUsers.findOne({ name: uId })) return;

    // Create default project and badges
    const starterBadge: Badge = {
      id: 1,
      title: {
        content: "Welcome to",
        color: BadgeColor.Simple,
        width: 90
      },
      values: [{
        content: "Maintained",
        color: BadgeColor.Savannah,
        width: 90
      }],
      style: BadgeStyle.Plastic
    };
    const starterProject: Project = {
      title: uId,
      badges: [ starterBadge ]
    };
    const newUser: User = {
      name: uId,
      firstTime: true,
      projects: [ starterProject ]
    };

    this.dUsers.insertOne(newUser);
  }

  // Returns all of a user's data
  async getUserInfo(uId: string): Promise<User | undefined> {
    const info = await this.dUsers.findOne({ name: uId });
    if (info) return info;
    else return undefined;
  }

  // Hide the new user experience for a user
  async setUserWelcomed(uId: string): Promise<void> {
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { firstTime: false } });
  }

  // Create a new default badge in a user's project and return it
  async createBadge(uId: string, project: string): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const lastId = userProj.badges[userProj.badges.length - 1]?.id;
    const newBadge: Badge = {
      id: (lastId ?? 0) + 1,
      title: {
        content: "New",
        color: BadgeColor.Simple,
        width: 35
      },
      values: [{
        content: "Badge",
        color: BadgeColor.Savannah,
        width: 50
      }],
      style: BadgeStyle.Plastic
    }

    userProj.badges.push(newBadge);
    await this.dUsers.updateOne(
      { name: uId }, 
      { $set: { projects: userData } });
    return newBadge;
  }

  // Delete a badge in a user's project from badge ID
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

  // Get a badge based on username, project, and badge ID
  async getBadge(uId: string, project: string, bId: number): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === bId);
    if (!userBadge) return undefined;
    else return userBadge;
  }

  // Updates all properties of a badge given username, project, and badge
  async updateBadge(uId: string, project: string, badge: Badge): Promise<Badge | undefined> {
    const userData = (await this.dUsers.findOne({ name: uId }))?.projects;
    const userProj = userData?.find(p => p.title === project);
    if (!userProj) return undefined;

    const userBadge = userProj.badges.find(b => b.id === badge.id);
    if (!userBadge) return undefined;

    // Explicitly set values to make sure vital info like
    // badge ID, etc. does not get changed
    userBadge.title = badge.title;
    userBadge.values = badge.values;
    userBadge.style = badge.style;
    userBadge.redirect = badge.redirect;

    // Save changes
    await this.dUsers.updateOne(
      { name: uId },
      { $set: { projects: userData }});
    return userBadge;
  }

  // Create a new project with title and return it
  async createProject(uId: string, project: string): Promise<Project | undefined> {
    const user = await this.dUsers.findOne({ name: uId });
    if (!user || !project) return undefined;

    project = project.replaceAll(" ", "-").replaceAll("/", "-");
    if (user.projects.find(p => p.title === project)) return undefined;

    const newBadge: Badge = {
      id: 1,
      title: {
        content: "Created",
        color: BadgeColor.Simple,
        width: 50
      },
      values: [{
        content: "Successfully",
        color: BadgeColor.Savannah,
        width: 90
      }],
      style: BadgeStyle.Plastic
    }
    const newProject: Project = {
      title: project,
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

  // Delete a project based on username and project name
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