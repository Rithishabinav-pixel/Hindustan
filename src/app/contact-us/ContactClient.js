
import React from 'react'
import style from './contact.module.css'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'
import Image from 'next/image'

export default function ContactClient() {
  return (
    <>
     <Header/>

     <div className={style.contact_section}>


<div className={`container ${style.contactContainer}`}>

{/* content */}
<div className={`${style.contactContent}`}>
  <h1 className="common_heading">Start Your Next Drone Project</h1>
   <p className={style.contact_detailContent} >Have a requirement or a challenge to solve? Our team will guide you with the right drone and AI-powered solution.</p>

{/* address */}
<div className={style.contact_detail}>
    <h3>Office Address</h3>
    <p >Hindustan Drone Services Private Limited<br></br>
Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>Financial District, Nanakramguda, Hyderabad - 500 032, Telangana.</p>
  <a target='_blank' href="https://maps.app.goo.gl/yGesmCCMdnxSCkQ49" className={`common_btn ${style.getDirection_btn}`}>
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
    <a href='tel:+919154749191'>+91 91 5474 9191</a>
</div>

{/* mail */}
<div className={style.contact_detail}>
    <h3>Email</h3>
    <a href='mailto:info@hindustandrones.io '>info@hindustandrones.io </a>
</div>

   <ul className={style.socialLinks}>
                    <li> <a target="_blank" href='https://www.facebook.com/profile.php?id=61589554926751'> <Image src="/images/fb-icon.svg" alt='Facebook' width={24} height={24} /></a> </li>
                    <li> <a target="_blank" href='https://www.instagram.com/hindustandroneservices/'> <Image src="/images/insta-icon.svg" alt='Instagram' width={24} height={24} /></a> </li>
                    <li> <a target="_blank" href='https://www.linkedin.com/company/hindustan-drones/'> <Image src="/images/linked-in.svg" alt='Linkedin' width={24} height={24} /></a> </li>
                    <li> <a target="_blank" href='https://www.youtube.com/@hindustandroneservices'> <Image src="/images/youtube-icon.svg" alt='Youtube' width={24} height={24} /></a> </li>
                    <li> <a target="_blank" href='https://x.com/HindustanDrones'> <Image src="/images/x-icon.svg" alt='Youtube' width={24} height={24} /></a> </li>
                    </ul>

</div>

{/* form */}
<div className={`common_form ${style.contactForm}`}>

<h3>Send Us Your Enquiry</h3>
<p>Tell us about your requirement, and we will connect you with the right expert to take it forward.</p>

<ContactForm />


</div>

</div>

     </div>

    </>
  )
}
