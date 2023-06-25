export const fetchProjects = async () => {
  const response = await fetch("https://api.github.com/users/kakxem/repos")
  const data = await response.json()

  return data
}
