import { AnimatePresence, motion } from "framer-motion"
import { useMemo } from "react"
import { ArrowContainer, Popover } from "react-tiny-popover"
import {
  DockerIcon,
  JavaScriptIcon,
  PythonIcon,
  ReactIcon,
  RustIcon,
  SvelteIcon,
  TypeScriptIcon,
} from "../assets/svg/skills"
import { useWindowStore } from "../store/window"

interface ProjectProps {
  title: string
  description: string
  link: string
  language: string
  index: number
}

interface Icons {
  [key: string]: JSX.Element
}

export default function Project({
  title,
  description,
  link,
  index,
  language,
}: ProjectProps) {
  const selectedIndex = useWindowStore(state => state.selectedIndex)
  const setSelectedIndex = useWindowStore(state => state.setSelectedIndex)
  const popoverName = useWindowStore(state => state.popoverName)
  const setPopoverName = useWindowStore(state => state.setPopoverName)

  const languageIcons: Icons = useMemo(() => {
    return {
      JavaScript: <JavaScriptIcon />,
      TypeScript: <TypeScriptIcon />,
      Rust: <RustIcon />,
      Python: <PythonIcon />,
      Svelte: <SvelteIcon />,
    }
  }, [])

  const titleIcons: Icons = useMemo(() => {
    return {
      "Icecast2_ezstream-ARM": <DockerIcon />,
      myportfolio: <ReactIcon />,
    }
  }, [])

  const isOpen = useMemo(() => popoverName === title, [popoverName, title])

  const handleOnHover = () => {
    setSelectedIndex(index)
    setPopoverName(title)
  }
  const handleOnLeave = () => {
    setSelectedIndex(null)
    setPopoverName(null)
  }

  return (
    <AnimatePresence>
      <Popover
        isOpen={isOpen}
        positions={["bottom", "right", "left", "top"]}
        containerClassName="z-10"
        content={({ position, childRect, popoverRect }) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ArrowContainer
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor="black"
              arrowSize={10}
            >
              <div className="bg-black text-white rounded-2xl p-3">
                <div className=" text-center py-4 px-6 justify-center align-middle">
                  <p className="text-lg">{description}</p>
                </div>
              </div>
            </ArrowContainer>
          </motion.div>
        )}
      >
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0, delay: 0.1 * index }}
          onMouseEnter={handleOnHover}
          onMouseLeave={handleOnLeave}
          onClick={() => {
            setPopoverName(isOpen ? null : title)
          }}
          className={`${
            selectedIndex !== null && selectedIndex !== index ? "blur-sm" : ""
          } bg-slate-900/70 min-h-[18rem] w-80 rounded-3xl flex flex-col justify-around p-2 transition-all duration-500`}
        >
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <motion.div animate={{ scale: isOpen ? 1.1 : 1 }}>
            <div className="flex flex-col justify-center items-center">
              <div className="w-28 h-28">
                {Object.keys(titleIcons).includes(title)
                  ? titleIcons[title]
                  : languageIcons[language]}
              </div>
            </div>
          </motion.div>

          <a
            className="bg-slate-800/70 text-center rounded-lg p-2 hover:bg-slate-700/70 transition-all duration-300 mx-5"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            See more
          </a>
        </motion.section>
      </Popover>
    </AnimatePresence>
  )
}
