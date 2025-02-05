
import { Project } from "./Types.js";

let projects: Project[] = [];

export const getAllProjects = (): Project[] => {
    return projects;
};

export const createProject = (newProject: Project): Project => {
    projects.push(newProject);
    return newProject;
};