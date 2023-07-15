import { motion } from "framer-motion"
import { useWindowStore } from "../store/window"
import Skill from "./Skill"

interface ISkill {
  name: string
  img?: string
  svg?: JSX.Element
  score: number
}

interface SkillSectionProps {
  title: string
  skills: ISkill[]
  index: number
  selectedSection: number | null
}

export default function SkillSection({
  title,
  skills,
  index,
  selectedSection,
}: SkillSectionProps) {
  const selectedIndex = useWindowStore(state => state.selectedIndex)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col flex-wrap min-w-[400px] max-w-sm text-center bg-slate-900/70 p-5 rounded-2xl"
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <div className="mt-4 flex flex-wrap justify-center p-2">
        {skills.map((skill, i) => {
          const skillIndex = index * 5 + i
          const isSectionSelected = selectedSection && selectedSection === index
          const isSelected =
            selectedIndex != null &&
            selectedIndex !== skillIndex &&
            isSectionSelected

          return (
            <div
              key={i}
              className={`${
                isSelected && "opacity-30"
              } transition-opacity duration-300`}
            >
              <Skill
                index={skillIndex}
                img={skill.img}
                svg={skill.svg}
                name={skill.name}
                score={skill.score}
              />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
