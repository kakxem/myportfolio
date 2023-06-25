import { motion } from "framer-motion"
import { useWindowStore } from "../store/window"

interface ContentProps {
  children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
  const initialState = useWindowStore(state => state.initialState)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: initialState ? 0 : 0.5,
        delay: initialState ? 0 : 0.1,
      }}
    >
      {children}
    </motion.div>
  )
}
