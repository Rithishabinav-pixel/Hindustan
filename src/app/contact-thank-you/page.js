import Link from "next/link"
import Image from "next/image"
import Header from "../components/Header"
import style from "../newsletter-thank-you/page.module.css"
import ButtonFan from "../components/UI/ButtonFan"

export const metadata = {
  title: "Thank You for Your Enquiry | Hindustan Drone Services",
  description: "Your enquiry has been received. Our team will get back to you shortly.",
}

export default function ContactThankYou() {
  return (
    <>
      <Header />
      <main className={style.page}>
        <div className={style.card}>
          <div className={style.iconWrap}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#148F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className={style.heading}>Enquiry Received!</h1>
          <p className={style.subText}>
            Thank you for reaching out to Hindustan Drone Services. Our team of drone experts will review your message and get back to you shortly.
          </p>
          <p className={style.subText}>
            A confirmation email has been sent to your inbox.
          </p>

          <Link href="/" className={`common_btn ${style.homeBtn}`}>
           <ButtonFan/>
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </>
  )
}
