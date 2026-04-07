"use client"
import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.css"
import ButtonFan from "./UI/ButtonFan";
import { useEffect, useState } from "react";
import menuStyle from "./Menu.module.css";
import footerStyle from "./Footer.module.css"
import { usePathname } from "next/navigation";


export default function Header() {

    const pathname = usePathname();
  

 const [isFixed, setIsFixed] = useState(false);
 const [menuShow, setMenuShow] = useState(false);
 const [menuOpenSections, setMenuOpenSections] = useState(new Set());

 useEffect(() => {
   if (menuShow) setMenuOpenSections(new Set());
 }, [menuShow]);

 function toggleMenuSection(key) {
   setMenuOpenSections(prev => {
     const next = new Set(prev);
     if (next.has(key)) next.delete(key);
     else next.add(key);
     return next;
   });
 }

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <>
  <header className={`${style.header} ${isFixed ? style.fixed : ""}`}>

<div className={`container ${style.container}`}>
    
    <Link href="/" id={style.headerLogo}>
    {isFixed? (
  <Image src="/images/logo_f.svg" alt="logo" width={90} loading="eager" height={80.5}/>
    ):
    (  <Image src="/images/logo.svg" alt="logo" width={145} height={130} loading="eager" />)}
  
    </Link>

    <nav className={style.nav}>
        <Link href="#" className={`common_btn ${style.header_contact_btn}`}>
         <ButtonFan/>
         <span> Contact Us</span>
        </Link>

<button className={`common_btn ${style.header_common_btn}`} onClick={()=>setMenuShow(true)}>
     <Image className="" src="/images/menu.svg" alt="" width={24} height={24}/>
         <span>Menu</span>
</button>

    </nav>

</div>

   </header>

   {/* desktop header menu */}

  
   <section className={`${menuStyle.section} ${menuShow?menuStyle.show:""}`}>

<div className={menuStyle.menuVideo}>
     <video
  width="1920"
  height="1080"
  loop
  muted
  autoPlay
  preload="none"
  playsInline
  poster="/images/menu_poster.png"  
>
  <source src="/images/menu_video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div>

<div className={`container ${menuStyle.menu_topContainer}`}>
<button className={`common_btn ${style.header_common_btn} ${menuStyle.footer_closeBtn}`} onClick={()=>setMenuShow(false)}>
     <Image className="" src="/images/menu_close.svg" alt="" width={24} height={24}/>
         <span>Close</span>
</button>
</div>

<div className={`container ${footerStyle.footer_container} ${menuStyle.menu_container}`}>

        {/* footer links column */}
        <div className={`${footerStyle.footer_links} ${menuStyle.menu_link_container}`}>
            <div className={`${footerStyle.footer_links_single} ${menuStyle.menuLinks_single}`}>
                <ul className={menuStyle.noAccordion}>
                     <li>
                <Link href="/" className={pathname === "/" ? footerStyle.active : ""}>Home</Link>
            </li>
            <li>
                <Link href="/about-us" className={pathname === "/about-us" ? footerStyle.active : ""}>About Us</Link>
            </li>
            <li>
                <Link href="/training" className={pathname === "/training" ? footerStyle.active : ""}>Training</Link>
            </li>
            <li>
                <Link href="/blog" className={pathname === "/blog" ? footerStyle.active : ""}>Blog</Link>
            </li>
            <li>
                <Link href="/contact-us" className={pathname === "/contact-us" ? footerStyle.active : ""}>Contact Us</Link>
            </li>
                </ul>
            </div>
             <div className={`${footerStyle.footer_links_single} ${menuStyle.menuLinks_single}`} data-accordion={menuOpenSections.has(0) ? "open" : "closed"}>
                <h3 onClick={() => toggleMenuSection(0)}>Technology<span className={footerStyle.accordion_icon} aria-hidden="true">{menuOpenSections.has(0) ? '–' : '+'}</span></h3>
                <ul>
                    <li><Link href="/technology/ai-models-intelligent-analytics-powering-daas" className={pathname === "/technology/ai-models-intelligent-analytics-powering-daas"? footerStyle.active :""}>Advanced AI Models Overview</Link></li>
            <li><Link href="#">Drone Manufacturing, Assembly & Services</Link></li>
                </ul>
            </div>
           
        </div>

        {/* footer links column */}
        <div className={`${footerStyle.footer_links} ${menuStyle.menu_link_container}`}>
           <div className={`${footerStyle.footer_links_single} ${menuStyle.menuLinks_single}`} data-accordion={menuOpenSections.has(2) ? "open" : "closed"}>
                <h3 onClick={() => toggleMenuSection(2)}>Services<span className={footerStyle.accordion_icon} aria-hidden="true">{menuOpenSections.has(2) ? '–' : '+'}</span></h3>
                <ul>
                     <li><Link href="/services/agriculture"className={pathname === "/services/agriculture"? footerStyle.active :""}>Agriculture & Farming</Link></li>
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
        <div className={`${footerStyle.footer_links} ${menuStyle.menu_link_container}`}>
           <div className={`${footerStyle.footer_links_single} ${menuStyle.menuLinks_single}`} data-accordion={menuOpenSections.has(3) ? "open" : "closed"}>
                <h3 onClick={() => toggleMenuSection(3)}>Products<span className={footerStyle.accordion_icon} aria-hidden="true">{menuOpenSections.has(3) ? '–' : '+'}</span></h3>
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
        <div className={`${footerStyle.footer_links} ${menuStyle.menu_link_container}`}>
            <div className={`${footerStyle.footer_links_single} ${menuStyle.menuLinks_single}`} data-accordion={menuOpenSections.has(4) ? "open" : "closed"}>
                <h3 onClick={() => toggleMenuSection(4)}>Industries<span className={footerStyle.accordion_icon} aria-hidden="true">{menuOpenSections.has(4) ? '–' : '+'}</span></h3>
                <ul>
                    <li><Link href="/industries/agriculture" className={pathname === "/industries/agriculture"? footerStyle.active :""}>Agriculture</Link></li>
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

   </section>


   </>
  )
}
