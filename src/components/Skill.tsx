import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { ArrowContainer, Popover } from "react-tiny-popover"
import { EmptyStar, FilledStar } from "../assets/svg/stars"
import { useWindowStore } from "../store/window"

interface SkillProps {
  name: string
  img?: string
  svg?: JSX.Element
  score: number
  index: number
}

export default function Skill({ name, img, svg, score, index }: SkillProps) {
  const selectedIndex = useWindowStore(state => state.selectedIndex)
  const setSelectedIndex = useWindowStore(state => state.setSelectedIndex)

  const [scoreArray, setScoreArray] = useState<JSX.Element[]>([])

  useEffect(() => {
    const iconArray = []

    for (let i = 0; i < 5; i++) {
      if (i < score) {
        iconArray.push(<FilledStar />)
        continue
      }
      iconArray.push(<EmptyStar />)
    }

    setScoreArray(iconArray)
  }, [score])

  const isSelected = useMemo(
    () => selectedIndex === index,
    [index, selectedIndex]
  )

  const handleOnHover = () => {
    setSelectedIndex(index)
  }
  const handleOnLeave = () => {
    setSelectedIndex(null)
  }

  return (
    <Popover
      isOpen={isSelected}
      positions={["bottom", "right", "left", "top"]}
      containerStyle={{ zIndex: "100" }}
      containerClassName="z-10"
      content={({ position, childRect, popoverRect }) => (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="black"
            arrowSize={10}
          >
            <div className="bg-black text-white rounded-2xl p-3 px-7 flex flex-col gap-2">
              <span className="flex justify-center text-xl">
                <strong>{name}</strong>
              </span>
              <div className="flex justify-center">
                {scoreArray.map((icon, index) => (
                  <span key={index}>{icon}</span>
                ))}
              </div>
            </div>
          </ArrowContainer>
        </motion.div>
      )}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        onMouseEnter={handleOnHover}
        onMouseLeave={handleOnLeave}
        onClick={() => {
          setSelectedIndex(isSelected ? null : index)
        }}
        className="flex flex-wrap items-center justify-center"
      >
        {img && (
          <img src={img} alt={name} width={80} height={80} className="m-3" />
        )}
        {svg && <div className="m-3 w-20">{svg}</div>}
      </motion.div>
    </Popover>
  )
}
