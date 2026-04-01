
import React from 'react'
import style from './contact.module.css'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'

export default function page() {
  return (
    <>
     <Header/>

     <div className={style.contact_section}>


<div className={`container ${style.contactContainer}`}>

{/* content */}
<div className={`${style.contactContent}`}>
  <h1 className="common_heading">Get In Touch With Our Drone Experts</h1>
   <p className={style.contact_detailContent} >Have questions about our drone solutions, services, or training programs? Our team is here to help you find the right UAV solution for your needs.</p>

{/* address */}
<div className={style.contact_detail}>
    <h3>Office Address</h3>
    <p >Hindustan Drone Services Private Limited<br></br>
Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>Financial District, Nanakramguda, Hyderabad - 500 032, Telangana.</p>
  <a  href="#" className={`common_btn ${style.getDirection_btn}`}>
        <svg className='fann' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 5.33335V2.66669" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.33366 16H2.66699" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 26.6667V29.3334" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.667 16H29.3337" stroke="#148F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
         <span>Get Directions</span>
        </a>
</div>

{/* phone */}
<div className={style.contact_detail}>
    <h3>Phone</h3>
    <a href='tel:+919154749191'>+91 9154749191</a>
</div>

{/* mail */}
<div className={style.contact_detail}>
    <h3>Email</h3>
    <a href='mailto:info@hindustandrones.io '>info@hindustandrones.io </a>
</div>

</div>

{/* form */}
<div className={`common_form ${style.contactForm}`}>

<h3>Send Us Your Enquiry</h3>
<p>Fill out the form below and our team will get back to you shortly. Whether you need consultation, product information, or service support, we're here to help.</p>

<ContactForm />

</div>

</div>

     </div>

    </>
  )
}
