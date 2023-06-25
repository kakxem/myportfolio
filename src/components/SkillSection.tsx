import { motion } from "framer-motion"
import { useWindowStore } from "../store/window"
import Skill from "./Skill"

interface ISkill {
  name: string
  img?: string
  svg?: JSX.Element
  score: number
}

export default function SkillSection({
  title,
  delay,
  skills,
  index,
}: {
  title: string
  delay: number
  skills: ISkill[]
  index: number
}) {
  const selectedIndex = useWindowStore(state => state.selectedIndex)
  const setSelectedIndex = useWindowStore(state => state.setSelectedIndex)

  const handleOnHover = () => {
    setSelectedIndex(index)
  }

  const handleOnLeave = () => {
    setSelectedIndex(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, delay }}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnLeave}
      className={`${
        selectedIndex !== null && selectedIndex !== index ? "blur" : ""
      } flex flex-col flex-wrap min-w-[400px] max-w-sm text-center bg-slate-900/70 p-5 rounded-2xl transition-all duration-500`}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <div className="mt-4 flex flex-wrap justify-center p-2">
        {skills.map((skill, index) => (
          <Skill
            key={index}
            img={skill.img}
            svg={skill.svg}
            name={skill.name}
            score={skill.score}
          />
        ))}
      </div>
    </motion.div>
  )
}
