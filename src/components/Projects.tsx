import { useEffect } from "react"
import { useWindowStore } from "../store/window"
import Content from "./Content"
import Project from "./Project"

const BANNED_PROJECTS = ["kakxem"]

export default function Projects() {
  const projects = useWindowStore(state => state.projects)
  const getProjects = useWindowStore(state => state.getProjects)

  useEffect(() => {
    if (projects.length === 0) getProjects()
  }, [getProjects, projects])

  return (
    <Content>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-4">
          {projects.map((project, index) => {
            if (BANNED_PROJECTS.includes(project?.name)) return null

            return (
              <Project
                key={project?.id}
                title={project?.name}
                link={project?.html_url}
                description={project?.description}
                language={project?.language}
                index={index}
              />
            )
          })}
        </div>
      </div>
    </Content>
  )
}
