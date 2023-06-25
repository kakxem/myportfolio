import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Content from "./Content"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [enableSend, setEnableSend] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formRef.current === null) return

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          // Show success message with toast
          toast.success("Message sent!")

          // Clear form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        },
        () => {
          // Show error message
          toast.error("Oops, something went wrong!")
        }
      )
  }

  useEffect(() => {
    Object.values(formData).every(value => value !== "")
      ? setEnableSend(true)
      : setEnableSend(false)
  }, [formData])

  return (
    <Content>
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-slate-900/70 p-10  rounded-3xl w-full max-w-3xl "
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3 items-center"
            ref={formRef}
          >
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              placeholder="Name*"
              name="name"
              className="bg-slate-800/70 p-3 pl-5 w-3/4 rounded-lg outline-none text-lg"
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
              required
            />

            <motion.input
              whileFocus={{ scale: 1.05 }}
              placeholder="E-mail*"
              name="email"
              className="bg-slate-800/70 p-3 pl-5 w-3/4 rounded-lg outline-none text-lg"
              type="email"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              required
            />

            <motion.input
              whileFocus={{ scale: 1.05 }}
              placeholder="Subject*"
              name="subject"
              type="text"
              className="bg-slate-800/70 p-3 pl-5 w-3/4 rounded-lg outline-none text-lg"
              onChange={e =>
                setFormData({ ...formData, subject: e.target.value })
              }
              value={formData.subject}
              required
            />

            <motion.textarea
              whileFocus={{ scale: 1.05 }}
              placeholder="Write your message here...*"
              name="message"
              className="bg-slate-800/70 p-3 pl-5 w-3/4 rounded-lg outline-none h-24 text-lg"
              onChange={e =>
                setFormData({ ...formData, message: e.target.value })
              }
              value={formData.message}
              required
            />

            <motion.button
              whileHover={{ scale: enableSend ? 1.05 : 0.9 }}
              whileFocus={{ scale: enableSend ? 1.05 : 0.9 }}
              animate={{ scale: enableSend ? 1 : 0.9 }}
              type="submit"
              className={`${
                !enableSend && "text-gray-400"
              } mt-2 py-3 px-5 text-2xl bg-violet-900/70 hover:bg-violet-900 transition-all duration-500 rounded-xl outline outline-violet-950`}
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Content>
  )
}
