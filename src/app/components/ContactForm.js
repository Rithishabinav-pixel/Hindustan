"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import ButtonFan from "./UI/ButtonFan"
import FloatingNotification from "./UI/FloatingNotification"

export default function ContactForm() {
  const router = useRouter()
  const [fields, setFields] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: "success", title: "", message: "" })

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }))
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setFields((prev) => ({ ...prev, phone: digits }))
      return
    }
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setNotification({
        show: true,
        type: "success",
        title: "Enquiry Sent!",
        message: "Redirecting you now…",
      })

      setTimeout(() => {
        router.push("/contact-thank-you")
      }, 1800)
    } catch (err) {
      console.error("[ContactForm] Submission error:", err)
      setNotification({
        show: true,
        type: "error",
        title: "Submission failed",
        message: err.message || "Please try again later.",
      })
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={fields.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={fields.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={fields.phone}
          onChange={handleChange}
          onPaste={(e) => {
            e.preventDefault()
            const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 10)
            setFields((prev) => ({ ...prev, phone: pasted }))
          }}
          inputMode="numeric"
          maxLength={10}
          disabled={loading}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={fields.subject}
          onChange={handleChange}
          disabled={loading}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={fields.message}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="common_btn"
          disabled={loading}
          style={loading ? { opacity: 0.7, cursor: "not-allowed" } : {}}
        >
          <ButtonFan />
          <span>{loading ? "Sending…" : "Send Message"}</span>
        </button>
      </form>

      <FloatingNotification
        show={notification.show}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        duration={2200}
        onHide={hideNotification}
      />
    </>
  )
}
