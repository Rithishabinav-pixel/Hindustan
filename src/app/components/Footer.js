import React from 'react'
import style from "./Footer.module.css"
import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import ButtonFan from './UI/ButtonFan'

export default function Footer() {

 const year = new Date().getFullYear();

  return (
   <>
   
   <section className={`common_section ${style.footer_cta_section}`}>
    <div className={`container`}>
        <div className={`topContent ${style.footer_cta_topContent}`}>
            <h2 className='common_heading'>Ready to see how far drone intelligence can take you?</h2>
            <p>Partner with Hindustan Drone Services to explore the future of drone technology. Connect with our team to explore the possibilities.</p>
             <Link href="#" className="common_btn">
         <ButtonFan/>
         <span>Contact Us</span>
        </Link>
        </div>
    </div>

   </section>



   <footer className={style.footer_section}>
    <div className={`container ${style.footer_container}`}>

        {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3>Quick Links</h3>
                <ul>
                    <li> <Link href="#">Home</Link> </li>
                    <li> <Link href="#">About Us</Link> </li>
                    <li> <Link href="#">Blog</Link> </li>
                    <li> <Link href="#">Contact Us </Link> </li>
                </ul>
            </div>
             <div className={style.footer_links_single}>
                <h3>Technology</h3>
                <ul>
                    <li> <Link href="#">Advanced AI Models Overview</Link> </li>
                    <li> <Link href="#">Drone Manufacturing, Assembly & Services</Link> </li>
                </ul>
            </div>
              <div className={style.footer_links_single}>
                <h3>Training</h3>
                <ul>
                    <li> <Link href="#">Comprehensive Drone Training</Link> </li>
                    <li> <Link href="#">Certification & Skill Development</Link> </li>
                </ul>
            </div>
        </div>

        {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3>Services</h3>
                <ul>
                    <li> <Link href="#">Agriculture & Farming</Link> </li>
                    <li> <Link href="#">Construction & Infrastructure</Link> </li>
                    <li> <Link href="#">Media, Entertainment & Marketing</Link> </li>
                    <li> <Link href="#">Mining & Extractives</Link> </li>
                    <li> <Link href="#">Inspection</Link> </li>
                    <li> <Link href="#">Energy & Utilities</Link> </li>
                    <li> <Link href="#">Security, Surveillance & Emergency</Link> </li>
                    <li> <Link href="#">Environmental, Research & Survey</Link> </li>
                    <li> <Link href="#">Logistics & Delivery</Link> </li>
                    <li> <Link href="#">Residential & Property</Link> </li>
                </ul>
            </div>
        </div>

         {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3>Products</h3>
                <ul>
                    <li> <Link href="#">AgriFlow HDS40</Link> </li>
                    <li> <Link href="#">AgriFlow HDS-SEED</Link> </li>
                    <li> <Link href="#">SolarShine HDS40B</Link> </li>
                    <li> <Link href="#">SkyWash HDS40A</Link> </li>
                    <li> <Link href="#">CargoLift HDS20A</Link> </li>
                    <li> <Link href="#">TerraMap HDS4P</Link> </li>
                    <li> <Link href="#">VigilCore M4TD</Link> </li>
                    <li> <Link href="#">InfraScan M400</Link> </li>
                </ul>
            </div>
        </div>

        {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3>Industries</h3>
                <ul>
                    <li> <Link href="#">Agriculture</Link> </li>
                    <li> <Link href="#">Public Safety</Link> </li>
                    <li> <Link href="#">Utilities</Link> </li>
                    <li> <Link href="#">Security</Link> </li>
                    <li> <Link href="#">Construction</Link> </li>
                    <li> <Link href="#">Engineering</Link> </li>
                    <li> <Link href="#">Transportation</Link> </li>
                    <li> <Link href="#">Oil & Gas</Link> </li>
                    <li> <Link href="#">Education</Link> </li>
                </ul>
            </div>
        </div>

        

    </div>

{/* footer bottom bar */}
<div className={`container ${style.footer_bottom_container}`}>

   

    <div className={style.footer_bottom_content}>
         <Link href="/" id={style.footerLogo}>
     <Image src="/images/logo.svg" alt="logo" width={145} height={130}/>
    </Link>
      
        <p> © {year} HindustanDrones, All Rights Reserved.</p>
    </div>

     {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3>Get in touch with us</h3>
                <ul>
                    <li> <Link href="#"> <Image src="/images/footer_call.svg" width={24} height={24} alt=''/> +91 9154749191</Link> </li>
                    <li> <Link href="#"><Image src="/images/footer_mail.svg" width={24} height={24} alt=''/>info@hindustandrones.io</Link> </li>
                    <li> <Link href="#"><Image src="/images/footer_map.svg" width={24} height={24} alt=''/>Hindustan Drone Services Private Limited<br/>
Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>
Financial District, Nanakramguda, Hyderabad - 500 032.</Link> </li>
                   
                </ul>
            </div>
        </div>

    {/* footer bottom bar  news letter */}

<div className={style.footerNewsletter}>
<h3>Subscribe to our Newsletter</h3>
<p>Subscribe for insights, updates, and stories from the evolving world of drone technology.</p>

{/* newsletter form  */}

<NewsletterForm btnClassName="form_btn" />

  <p className={style.footer_bottom_content_links}>
            <span><Link href="">Terms of Service</Link></span> 
            <span><Link href=""> Privacy Policy</Link></span> 
            </p>
</div>

</div>

   </footer>



   </>
  )
}
