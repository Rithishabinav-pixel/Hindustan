"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FloatingNotification from "./UI/FloatingNotification";

export default function NewsletterForm({ btnClassName }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "success", title: "", message: "" });

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Show success notification, then redirect after it displays briefly
      setNotification({
        show: true,
        type: "success",
        title: "Subscribed!",
        message: "Redirecting you now…",
      });

      setTimeout(() => {
        router.push("/newsletter-thank-you");
      }, 1800);
    } catch (err) {
      console.error("[NewsletterForm] Submission error:", err);
      setNotification({
        show: true,
        type: "error",
        title: "Subscription failed",
        message: err.message || "Please try again later.",
      });
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className={btnClassName || "form_btn"}
          disabled={loading}
          style={loading ? { opacity: 0.7, cursor: "not-allowed" } : {}}
        >
          {loading ? "Sending…" : "Submit"}
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
  );
}
