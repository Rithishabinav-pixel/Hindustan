"use client"
import React, { useEffect, useState } from 'react'
import style from './droneManufacture.module.css'
import Link from 'next/link'
import ButtonFan from '../../components/UI/ButtonFan'
import Header from '../../components/Header'
import Image from 'next/image'

// icon grid data

const iconGrid = [
  {
    icon: "/images/drone_manufacture_ic1.svg",
    title: "Design and Development",
    desc: "We develop application-specific drone configurations and payload integrations, supported by testing, iteration, and collaboration with research and technology partners."
  },
  {
    icon: "/images/drone_manufacture_ic2.svg",
    title: "System Integration and Assembly",
    desc: "We integrate advanced components, including LiDAR, thermal sensors, and RTK modules, into reliable drone systems, ensuring performance, compatibility, and compliance with regulatory standards."
  },
  {
    icon: "/images/drone_manufacture_ic3.svg",
    title: "Lifecycle Support and Maintenance",
    desc: "From scheduled servicing to repairs and calibration, our lifecycle services ensure operational continuity and minimal downtime across deployed systems."
  },
  {
    icon: "/images/drone_manufacture_ic4.svg",
    title: "Product Supply and Distribution",
    desc: "We provide access to drone systems, payloads, and accessories through a structured supply network, supporting enterprises, institutions, and government bodies."
  }
];


export default function page() {

     const [mobile, setMobile] = useState(false);
    
      useEffect(() => {
        const checkScreen = () => {
          setMobile(window.innerWidth < 767);
        };
        checkScreen(); 
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
      }, []);


  return (
    <>
    <Header/>
    

    {/* hero section */}
    <section className={style.heroSection}>

        <div className={`container ${style.heroSection_container}`}>

  <div className={`topContent ${style.topContent}`}>
        <h1 data-animate="fade-up" data-animate-delay="150" className="common_heading">Technology Powering The Future Of Drone Innovation</h1>
        <p data-animate="fade-up" data-animate-delay="300">Our drone technologies combine advanced engineering, intelligent analytics, and precision systems to deliver reliable aerial solutions across industries.</p>
       <Link data-animate="fade-up" data-animate-delay="450" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
      </div>


        </div>
    </section>

    {/* video section */}
    <section className={style.videoSection}>




        <div className={style.videoSection_video}>
         <video
          width="1920"
          height="1080"
          loop
          muted
          autoPlay
          preload="none"
          playsInline
          poster={`/images/tech_bgvideo.webp`}
          className={style.tech_selecetdImage}
        >
          <source  src={`/images/drone_manufacture.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>

       
    </section>


<section className={`common_section ${style.integrated_drone_section}` }>
    <div className={`container ${style.integrated_droneContainer} ${style.integrated_drone_commonContainer}`}>

<h2 className={`common_heading`} data-animate="fade-up">Integrated Drone Systems and Lifecycle Support</h2>

        <div className={`${style.row} ${style.align_center}`}>

        <div className={style.content}>

             <div className={`topContent topContent_left ${style.topContent}`}>
      
       <p data-animate="fade-up" data-animate-delay="100">We work with global component manufacturers and technology partners to design, integrate, and deploy advanced drone systems. Our capabilities span the full lifecycle, enabling tailored solutions with consistent performance across diverse operational environments.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/drone_left_image.png" width={520} height={721} alt="" />

      </div>

        </div>

         <div className={style.icon_grid} data-animate="fade-up" data-animate-delay="200">
            {iconGrid && iconGrid.map((item,index)=>(
           
                  <div className={style.card} key={index}>
        <Image src={item.icon} width={80} height={80} alt="" />
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        </div>
      
            ))}
      

      </div>

      </div>

    </div>
   </section>

    </>
  )
}
