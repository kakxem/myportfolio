import { create } from "zustand"
import { fetchProjects } from "../services/github"

interface Project {
  id: number
  name: string
  description: string
  html_url: string
  full_name: string
  language: string
}

type Components = "about" | "projects" | "skills" | "contact" | null

interface WindowState {
  initialState: boolean
  setInitialState: (state: boolean) => void
  actualComponent: Components
  setActualComponent: (component: Components) => void
  projects: Project[]
  getProjects: () => void
  selectedIndex: number | null
  setSelectedIndex: (index: number | null) => void
  loading: boolean
  setLoading: (state: boolean) => void
}

export const useWindowStore = create<WindowState>((set, get) => ({
  initialState: true,
  setInitialState: state => set({ initialState: state }),
  actualComponent: null,
  setActualComponent: component => {
    set({
      actualComponent: component,
      initialState: component ? false : true,
      loading: true,
    })
    setTimeout(() => set({ loading: false }), 500)
  },
  projects: [],
  getProjects: () => {
    fetchProjects().then(data => set({ projects: data }))
  },
  selectedIndex: null,
  setSelectedIndex: index => {
    const { loading } = get()
    if (!loading) set({ selectedIndex: index })
  },
  loading: false,
  setLoading: state => set({ loading: state }),
}))
