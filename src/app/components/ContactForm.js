"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import ButtonFan from "./UI/ButtonFan"
import FloatingNotification from "./UI/FloatingNotification"
import Link from "next/link"

export default function ContactForm() {
  const router = useRouter()
  const [fields, setFields] = useState({ name: "", email: "", phone: "", subject: "", message: "",verify:true })
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", message: "",verify:"" })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: "success", title: "", message: "" })

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }))
  }, [])


  function handleCheckboxChange(e) {
  const checked = e.target.checked;

  setFields((prev) => ({ ...prev, verify: checked,}));

  if (checked) {
    setErrors((prev) => ({...prev,verify: "",}));
  }
}


  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setFields((prev) => ({ ...prev, phone: digits }))
      setErrors((prev) => ({ ...prev, phone: "" }))
      return
    }
  
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return

    const newErrors = { name: "", email: "", phone: "", message: "",verify:"" }
    let hasError = false

    

    if (!fields.name.trim()) {
      newErrors.name = "Full name is required."
      hasError = true
    }
    if (!fields.email.trim()) {
      newErrors.email = "Email address is required."
      hasError = true
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Please enter a valid email address."
      hasError = true
    }
    if (fields.phone && fields.phone.length < 10) {
      newErrors.phone = "Phone number must be 10 digits."
      hasError = true
    }
    if (!fields.message.trim()) {
      newErrors.message = "Message is required."
      hasError = true
    }

   if (!fields.verify) {
  newErrors.verify = "Please accept the Terms of Service and Privacy Policy.";
  hasError = true;
}

    if (hasError) {
      setErrors(newErrors)
      return
    }

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
        {errors.name && <span style={{ color: "#e53e3e", fontSize: "12px", marginTop: "-8px", display: "block" }}>{errors.name}</span>}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={fields.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        {errors.email && <span style={{ color: "#e53e3e", fontSize: "12px", marginTop: "-8px", display: "block" }}>{errors.email}</span>}
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
            setErrors((prev) => ({ ...prev, phone: "" }))
          }}
          inputMode="numeric"
          maxLength={10}
          disabled={loading}
        />
        {errors.phone && <span style={{ color: "#e53e3e", fontSize: "12px", marginTop: "-8px", display: "block" }}>{errors.phone}</span>}
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
        {errors.message && <span style={{ color: "#e53e3e", fontSize: "12px", marginTop: "-8px", display: "block" }}>{errors.message}</span>}

        <div className="checkbox_verification">
          <input type="checkbox" name="verify"  checked={fields.verify}  onChange={handleCheckboxChange}  disabled={loading}/>
           <p>I hereby authorize to send notifications via SMS, Email, RCS and others as per <Link href="/terms-and-condition">Terms of Service</Link>  | <Link href="/privacy-policy">Privacy Policy</Link></p>
        </div>
        {errors.verify && <span style={{ color: "#e53e3e", fontSize: "12px", marginTop: "-8px", display: "block" }}>{errors.verify}</span>}

       

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
