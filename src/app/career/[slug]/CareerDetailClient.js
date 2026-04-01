"use client";
import React, { useState, useCallback } from "react";
import style from "../drone-engineers/careerDetail.module.css";
import Image from "next/image";
import ButtonFan from "@/app/components/UI/ButtonFan";
import FloatingNotification from "@/app/components/UI/FloatingNotification";
import { useRouter } from "next/navigation";

export default function CareerDetailClient({ career }) {
  const router = useRouter();

  const [fields, setFields]   = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [resume, setResume]   = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "success", title: "", message: "" });

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    setResume(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!fields.name.trim() || !fields.email.trim()) {
      setNotification({ show: true, type: "error", title: "Missing fields", message: "Name and email are required." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setNotification({ show: true, type: "error", title: "Invalid email", message: "Please enter a valid email address." });
      return;
    }
    if (!checked) {
      setNotification({ show: true, type: "error", title: "Agreement required", message: "Please accept the terms before submitting." });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name",     fields.name.trim());
      formData.append("email",    fields.email.trim());
      formData.append("phone",    fields.phone.trim());
      formData.append("subject",  fields.subject.trim());
      formData.append("message",  fields.message.trim());
      formData.append("jobTitle", career.jobTitle);
      if (resume) formData.append("resume", resume);

      const res  = await fetch("/api/career/apply", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setNotification({ show: true, type: "success", title: "Application Sent!", message: "Redirecting you now…" });

      setTimeout(() => {
        router.push("/career-thank-you");
      }, 1800);
    } catch (err) {
      console.error("[CareerForm] Submission error:", err);
      setNotification({ show: true, type: "error", title: "Submission failed", message: err.message || "Please try again later." });
      setLoading(false);
    }
  }

  return (
    <>
      <section className={style.careerhero_section}>
        <div className={`container ${style.heroContainer}`} id="apply-now">
          <h1 className={style.jobTitle}>{career.jobTitle}</h1>
          <div className={style.jobOverview}>
            <div>
              <Image src="/images/location.svg" width={32} height={32} alt="" />{" "}
              {career.location}
            </div>
            <div>
              <Image src="/images/experience.svg" width={32} height={32} alt="" />{" "}
              {career.experience}
            </div>
            <div>
              <Image src="/images/remuneration.svg" width={32} height={32} alt="" />{" "}
              {career.remuneration}
            </div>
          </div>
        </div>
      </section>

      <section className={`common_section ${style.jobDetailsSection}`}>
        <div className={`container ${style.jobDetailContainer}`}>
          <div className={style.content}>
            {Array.isArray(career.details) && career.details.map((detail, index) => (
              <div key={index} className={style.detail}>
                <h3>{detail.title}</h3>
                {/* Backward compat: old list-type sections */}
                {detail.type === "list" && Array.isArray(detail.items) ? (
                  <ul>
                    {detail.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  /* New HTML content from rich text editor */
                  <div dangerouslySetInnerHTML={{ __html: detail.content || '' }} />
                )}
              </div>
            ))}
          </div>

          <div className={`common_form ${style.contactForm}`}>
            <h3>Apply now</h3>
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
                placeholder="Cover letter"
                value={fields.message}
                onChange={handleChange}
                disabled={loading}
              />

              <label className={style.fileLabel} htmlFor="resume-upload">
                <Image src="/images/upload.svg" width={24} height={24} alt="" />
                <p>
                  {resume
                    ? resume.name
                    : "Upload Resume (Allowed type: .pdf, .doc, .docx)"}
                </p>
              </label>
              <input
                id="resume-upload"
                hidden
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={loading}
              />

              <div className={style.acceptBox}>
                <label
                  className={style.checkbox}
                  onClick={() => setChecked((prev) => !prev)}
                >
                  {checked ? (
                    <Image src="/images/checked.svg" width={24} height={24} alt="checked" />
                  ) : (
                    <Image src="/images/not_checked.svg" width={24} height={24} alt="unchecked" />
                  )}
                </label>
                <input hidden type="checkbox" checked={checked} readOnly />
                <p>
                  By using this form you agree with the storage and handling of
                  your data by this website.
                </p>
              </div>

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
          </div>
        </div>
      </section>

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
