import { useEffect } from "react"
import { Toaster } from "sonner"
import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import Window from "./components/Window"
import { useWindowStore } from "./store/window"

export default function App() {
  const getProjects = useWindowStore(state => state.getProjects)

  useEffect(() => {
    getProjects()
  }, [getProjects])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900/90  text-white">
      <Toaster theme="dark" position="top-center" richColors />
      <Banner />
      <Navbar />
      <Window />
    </div>
  )
}
