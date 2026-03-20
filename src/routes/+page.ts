import type {PageLoad} from "./$types";
import {projects} from "./assets_layout/projects";
import {fetchWithCache} from "$lib/fetchWithCache";
import {browser} from "$app/environment";

export const prerender = true;

export const load: PageLoad = async ({fetch}) => {
  const projectsWithDescriptions = projects.map((project) => {
    if (project.desc_external) {
      const promise = fetchWithCache<string>(fetch, project.description, project.desc_external_key).catch(
        () => "Description unavailable"
      );

      return {...project, fetchedDescription: promise};
    }
    return {...project, fetchedDescription: project.description};
  });

  // resolve all promises on server for ssg/ssr, return promises on client for loading states
  if (!browser) {
    const resolved = await Promise.all(
      projectsWithDescriptions.map(async (p) => ({
        ...p,
        fetchedDescription: await p.fetchedDescription
      }))
    );
    return {projects: resolved};
  }

  return {projects: projectsWithDescriptions};
};
