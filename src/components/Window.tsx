import { AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useWindowStore } from "../store/window"
import AboutMe from "./AboutMe"
import Contact from "./Contact"
import Projects from "./Projects"
import Skills from "./Skills"

export default function Window() {
  const initialState = useWindowStore(state => state.initialState)
  const actualComponent = useWindowStore(state => state.actualComponent)
  const setSelectedIndex = useWindowStore(state => state.setSelectedIndex)

  const windowRef = useRef<HTMLDivElement>(null)

  const [windowStyle, setWindowStyle] = useState({
    height: 0,
  })
  const [componentHeight, setComponentHeight] = useState(0)

  const components = useMemo<{
    about: JSX.Element
    skills: JSX.Element
    projects: JSX.Element
    contact: JSX.Element
  }>(() => {
    return {
      about: <AboutMe />,
      skills: <Skills />,
      projects: <Projects />,
      contact: <Contact />,
    }
  }, [])

  useEffect(() => {
    if (initialState) {
      return setWindowStyle({
        height: 0,
      })
    }
    setWindowStyle({
      height: componentHeight + 100,
    })
  }, [initialState, componentHeight])

  useEffect(() => {
    const interval = setInterval(() => {
      setComponentHeight(windowRef?.current?.clientHeight ?? 0)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setComponentHeight(windowRef?.current?.clientHeight ?? 0)
  }, [windowRef?.current?.clientHeight, actualComponent])

  return (
    <main
      className="block rounded-xl transition-all duration-700 w-[98vw]"
      style={windowStyle}
      onMouseEnter={() => setSelectedIndex(null)}
    >
      <div ref={windowRef}>
        <AnimatePresence>
          {actualComponent && components[actualComponent]}
        </AnimatePresence>
      </div>
    </main>
  )
}
