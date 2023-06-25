import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import profileImg from "../assets/images/profile_image.webp"
import { ExitIcon } from "../assets/svg/exit"
import { useWindowStore } from "../store/window"

export default function Banner() {
  const initialState = useWindowStore(state => state.initialState)
  const setActualComponent = useWindowStore(state => state.setActualComponent)

  const [showClose, setShowClose] = useState(false)

  const handleOnMouseLeave = () => {
    setShowClose(false)
  }
  const handleOnMouseEnter = () => {
    setShowClose(true)
  }

  const handleOnClickImage = () => {
    setShowClose(!showClose)
  }

  const handleCloseWindow = () => {
    setActualComponent(null)
  }

  return (
    <motion.header
      animate={{
        marginTop: initialState ? "0" : "2.5rem",
      }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClickImage}
      className="relative px-10"
    >
      <img className="rounded-full" src={profileImg} width={200} height={200} />
      <AnimatePresence>
        {showClose && !initialState && (
          <motion.button
            layout
            whileFocus={{ scale: 1.2 }}
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: -10 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="text-center h-fit bg-slate-900 p-2 rounded-3xl absolute top-0 right-0"
            onClick={handleCloseWindow}
          >
            <ExitIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
