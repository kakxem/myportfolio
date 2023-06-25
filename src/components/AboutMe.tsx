import { motion } from "framer-motion"
import { CVIcon, GithubIcon, LinkedinIcon } from "../assets/svg/about-icons"
import Content from "./Content"

const BoldText = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold italic text-lg">{children}</span>
)

const Link = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => (
  <a
    href={href}
    className="flex items-center justify-center gap-3 py-3 px-5 text-2xl bg-violet-900/70 hover:bg-violet-900 transition-all duration-500 rounded-xl font-bold"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

export default function AboutMe() {
  return (
    <Content>
      <div className="text-center flex flex-row items-center justify-center flex-wrap">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col bg-slate-900/70 h-full p-10 rounded-3xl gap-5 max-w-7xl"
        >
          <h2 className="text-4xl font-bold text-center">
            Paul Antonio Almasi
          </h2>

          <article className="flex flex-col gap-3 text-justify">
            <p>
              As an experienced developer, I've sharpened my skills in a host of
              programming languages, including{" "}
              <BoldText>JavaScript, TypeScript and Python</BoldText>, while also
              immersing myself in the nuances of <BoldText>Rust</BoldText>.
            </p>
            <p>
              I have effectively applied JavaScript and TypeScript in
              industry-leading frameworks like{" "}
              <BoldText>React and NextJS</BoldText>, and further extended my
              TypeScript competence with <BoldText>NestJS and Fastify</BoldText>
              , leveraging both <BoldText>GraphQL and REST API</BoldText>.
            </p>
            <p>
              My technical acumen spans various tools such as{" "}
              <BoldText>
                Git, Linux, Docker, Docker Compose, and Kubernetes
              </BoldText>
              , equipping me to easily navigate and control complex technical
              environments.
            </p>
            <p>
              Furthermore, I am adept at handling{" "}
              <BoldText>SQL and MongoDB</BoldText> databases, demonstrating my
              versatility in interacting with diverse database management
              systems.
            </p>
            <p className="mt-4 font-bold text-xl">
              I am a highly adaptable programmer, with a strong motivational
              drive and practical communication skills. My commitment to
              continuous learning propels me to constantly broaden my technical
              skill set in the dynamic landscape of computer science.
            </p>
          </article>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="m-3 bg-slate-900/70 p-5 rounded-3xl flex flex-wrap 2xl:flex-col justify-center gap-3"
        >
          <Link href="https://cv.kakxem.dev">
            <CVIcon /> CV
          </Link>
          <Link href="https://github.kakxem.dev">
            <GithubIcon /> Github
          </Link>
          <Link href="https://linkedin.kakxem.dev">
            <LinkedinIcon /> Linkedin
          </Link>
        </motion.div>
      </div>
    </Content>
  )
}
