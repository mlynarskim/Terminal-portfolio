import type { Project } from '../data/projects'

export default function ProjectIcon({ project, className = 'w-full h-full' }: {
  project: Project
  className?: string
}) {
  return project.icon ? (
    <img src={project.icon} alt="" className={`${className} object-contain rounded-[inherit]`} />
  ) : <>{project.emoji}</>
}
