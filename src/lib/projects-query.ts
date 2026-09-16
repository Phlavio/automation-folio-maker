import { queryOptions } from "@tanstack/react-query";
import { listProjects } from "./projects.functions";

export const projectsQueryOptions = queryOptions({
  queryKey: ["projects"],
  queryFn: () => listProjects(),
  staleTime: 60_000,
});
