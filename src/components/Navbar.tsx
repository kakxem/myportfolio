import { AnimatePresence, motion } from "framer-motion"
import Typewriter from "typewriter-effect"
import { useWindowStore } from "../store/window"

type Components = "about" | "skills" | "projects" | "contact"

const navItems: {
  name: string
  component: Components
}[] = [
  { name: "About me", component: "about" },
  { name: "Skills", component: "skills" },
  { name: "Projects", component: "projects" },
  { name: "Contact", component: "contact" },
]

export default function Navbar() {
  const initialState = useWindowStore(state => state.initialState)
  const setActualComponent = useWindowStore(state => state.setActualComponent)
  const actualComponent = useWindowStore(state => state.actualComponent)

  const handleClick = (component: Components) => {
    setActualComponent(component)
  }

  return (
    <section className="flex flex-col gap-2 my-4 mt-6">
      <AnimatePresence>
        {initialState && (
          <motion.h3
            className={`text-center text-2xl font-bold`}
            initial={{ opacity: 0, height: 0, marginTop: "0" }}
            animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
            exit={{ opacity: 0, height: 0, marginTop: "0" }}
            transition={{ duration: 0.5 }}
          >
            <Typewriter
              options={{ autoStart: true, delay: 100 }}
              onInit={typewriter => {
                typewriter.typeString("Click a section...").start()
              }}
            />
          </motion.h3>
        )}
      </AnimatePresence>

      <motion.nav className="flex flex-wrap justify-center transition-all duration-500 items-center gap-4 rounded-lg">
        {navItems.map(item => {
          const isActualComponent = actualComponent === item.component
          return (
            <div
              key={item.name}
              className={`${
                !isActualComponent && "hover:bg-slate-700/50"
              } relative px-5 py-2 cursor-pointer rounded-lg transition-all duration-300`}
              onClick={() => handleClick(item.component)}
            >
              {isActualComponent && (
                <motion.span
                  layoutId="underline"
                  className="absolute top-0 -z-10 left-0 block h-full w-full bg-slate-700/50 rounded-lg"
                />
              )}
              <a
                className={`${
                  isActualComponent ? "text-white" : "text-gray-300/80"
                } select-none text-3xl font-bold`}
              >
                {item.name}
              </a>
            </div>
          )
        })}
      </motion.nav>
    </section>
  )
}
