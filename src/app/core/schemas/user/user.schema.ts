
import { Project } from '../';

export interface User {
  name: string;
  projects: Project[];
  firstTime: boolean;
}
