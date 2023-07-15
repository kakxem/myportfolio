import { useState } from "react"
import gtk_img from "../assets/images/gtk_logo.webp"
import {
  DockerIcon,
  GitIcon,
  GraphQLIcon,
  JavaScriptIcon,
  KubernetesIcon,
  LinuxIcon,
  NestJSIcon,
  NextJSIcon,
  NoSQLIcon,
  NodeJSIcon,
  PythonIcon,
  ReactIcon,
  RustIcon,
  SQLIcon,
  SvelteIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
} from "../assets/svg/skills"
import Content from "./Content"
import Skill from "./Skill"
import SkillSection from "./SkillSection"

interface Skill {
  name: string
  img?: string
  svg?: JSX.Element
  score: number
}

interface SkillSection {
  title: string
  skills: Skill[]
}

const SKILL_SECTIONS: SkillSection[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", svg: <PythonIcon />, score: 2 },
      { name: "JavaScript", svg: <JavaScriptIcon />, score: 3 },
      { name: "TypeScript", svg: <TypeScriptIcon />, score: 3 },
      { name: "Rust", svg: <RustIcon />, score: 1 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", svg: <ReactIcon />, score: 3 },
      { name: "NextJS", svg: <NextJSIcon />, score: 3 },
      { name: "GTK+", img: gtk_img, score: 1 },
      { name: "Svelte", svg: <SvelteIcon />, score: 2 },
      { name: "TailwindCSS", svg: <TailwindCSSIcon />, score: 2 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Linux", svg: <LinuxIcon />, score: 4 },
      { name: "Docker", svg: <DockerIcon />, score: 3 },
      { name: "Kubernetes", svg: <KubernetesIcon />, score: 3 },
      { name: "Git", svg: <GitIcon />, score: 3 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "SQL", svg: <SQLIcon />, score: 1 },
      { name: "NoSQL", svg: <NoSQLIcon />, score: 3 },
      { name: "NestJS", svg: <NestJSIcon />, score: 3 },
      { name: "NodeJS", svg: <NodeJSIcon />, score: 3 },
      { name: "GraphQL", svg: <GraphQLIcon />, score: 2 },
    ],
  },
]

export default function Skills() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  const handleEnter = (sectionIndex: number) => {
    setSelectedSection(sectionIndex)
  }

  const handleLeave = () => {
    setSelectedSection(null)
  }

  return (
    <Content>
      <div className="flex justify-center flex-wrap gap-5">
        {SKILL_SECTIONS.map(({ title, skills }, index) => {
          const isSelected =
            selectedSection != null && selectedSection !== index

          return (
            <div
              key={index}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              className={`${
                isSelected && "opacity-10"
              } transition-opacity duration-200`}
            >
              <SkillSection
                index={index}
                title={title}
                skills={skills}
                selectedSection={selectedSection}
              />
            </div>
          )
        })}
      </div>
    </Content>
  )
}
