"use client"
import React, { useState, useEffect } from 'react'
import style from "./Footer.module.css"
import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import ButtonFan from './UI/ButtonFan'
import { usePathname } from "next/navigation";


export default function Footer() {

  const pathname = usePathname();

  const year = new Date().getFullYear();

  const [openSections, setOpenSections] = useState(new Set());
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/admin/services')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setServices(data); })
      .catch(() => {});
  }, []);

  function toggleSection(key) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
   <>

   <section className={`common_section ${style.footer_cta_section}`}>
    <div className={`container`}>
        <div className={`topContent ${style.footer_cta_topContent}`}>
            <h2 className='common_heading' data-animate="fade-up">Ready to see how far drone intelligence can take you?</h2>
            <p data-animate="fade-up" data-animate-delay="150">Partner with Hindustan Drone Services to explore the future of drone technology. Connect with our team to explore the possibilities.</p>
             <Link href="/contact-us" className="common_btn" data-animate="fade-up" data-animate-delay="300">
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
    <div className={style.footer_links_single} data-accordion={openSections.has(0) ? "open" : "closed"}>
        <h3 onClick={() => toggleSection(0)}>
            Quick Links
            <span className={style.accordion_icon} aria-hidden="true">
                {openSections.has(0) ? '–' : '+'}
            </span>
        </h3>
        <ul>
            <li>
                <Link href="/" className={pathname === "/" ? style.active : ""}>Home</Link>
            </li>
            <li>
                <Link href="/about-us" className={pathname === "/about-us" ? style.active : ""}>About Us</Link>
            </li>
            <li>
                <Link href="/training" className={pathname === "/training" ? style.active : ""}>Training</Link>
            </li>
            <li>
                <Link href="/blog" className={pathname === "/blog" ? style.active : ""}>Blog</Link>
            </li>
            <li>
                <Link href="/contact-us" className={pathname === "/contact-us" ? style.active : ""}>Contact Us</Link>
            </li>
        </ul>
    </div>

    <div className={style.footer_links_single} data-accordion={openSections.has(1) ? "open" : "closed"}>
        <h3 onClick={() => toggleSection(1)}>Technology<span className={style.accordion_icon} aria-hidden="true">{openSections.has(1) ? '–' : '+'}</span></h3>
        <ul>
            <li><Link href="/technology/ai-models-intelligent-analytics-powering-daas" className={pathname === "/technology/ai-models-intelligent-analytics-powering-daas" ? style.active : ""}>Advanced AI Models Overview</Link></li>
            <li><Link href="#">Drone Manufacturing, Assembly & Services</Link></li>
        </ul>
    </div>
</div>

{/* footer links column */}
{/* services links */}
<div className={style.footer_links}>
    <div className={style.footer_links_single} data-accordion={openSections.has(3) ? "open" : "closed"}>
        <h3 onClick={() => toggleSection(3)}>
            Services
            <span className={style.accordion_icon} aria-hidden="true">
                {openSections.has(3) ? '–' : '+'}
            </span>
        </h3>
        <ul>
            {services.length > 0 ? services.map(s => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className={pathname === `/services/${s.slug}` ? style.active : ""}>{s.name}</Link>
              </li>
            )) : (
              <li><span>Loading...</span></li>
            )}
        </ul>
    </div>
</div>

{/* footer links column */}
<div className={style.footer_links}>
    <div className={style.footer_links_single} data-accordion={openSections.has(4) ? "open" : "closed"}>
        <h3 onClick={() => toggleSection(4)}>Products<span className={style.accordion_icon} aria-hidden="true">{openSections.has(4) ? '–' : '+'}</span></h3>
        <ul>
            <li><Link href="/products/agriflow-hds40">AgriFlow HDS40</Link> </li>
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
    <div className={style.footer_links_single} data-accordion={openSections.has(5) ? "open" : "closed"}>
        <h3 onClick={() => toggleSection(5)}>
            Industries
            <span className={style.accordion_icon} aria-hidden="true">
                {openSections.has(5) ? '–' : '+'}
            </span>
        </h3>
        <ul>
            <li><Link href="/industries/agriculture" className={pathname === "/industries/agriculture" ? style.active : ""}>Agriculture</Link></li>
            <li><Link href="#">Public Safety</Link></li>
            <li><Link href="#">Utilities</Link></li>
            <li><Link href="#">Security</Link></li>
            <li><Link href="#">Construction</Link></li>
            <li><Link href="#">Engineering</Link></li>
            <li><Link href="#">Transportation</Link></li>
            <li><Link href="#">Oil & Gas</Link></li>
            <li><Link href="#">Education</Link></li>
        </ul>
    </div>
</div>


    </div>

{/* footer bottom bar */}
<div className={`container ${style.footer_bottom_container}`}>

    <div className={style.footer_bottom_content}>
         <Link href="/" id={style.footerLogo}>
     <Image src="/images/logo.svg" alt="logo" width={145} height={130} loading="eager" />
    </Link>

        <p> © {year} HindustanDrones, All Rights Reserved.</p>
    </div>

     {/* footer links column */}
        <div className={style.footer_links}>
            <div className={style.footer_links_single}>
                <h3 onClick={() => toggleSection(6)}>Get in touch with us</h3>
                <ul>
                    <li> <a href="tel:+919154749191"> <Image src="/images/footer_call.svg" width={24} height={24} alt=''/> +91 9154749191</a> </li>
                    <li> <a href="mailto:info@hindustandrones.io"><Image src="/images/footer_mail.svg" width={24} height={24} alt=''/>info@hindustandrones.io</a> </li>
                    <li> <a href="https://maps.app.goo.gl/NKNtSUGuwNSj4rLG7" target='_blank'><Image src="/images/footer_map.svg" width={24} height={24} alt=''/>Hindustan Drone Services Private Limited<br/>
Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>
Financial District, Nanakramguda, Hyderabad - 500 032.</a> </li>

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
