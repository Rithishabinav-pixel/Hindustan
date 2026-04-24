"use client"
import React, { useEffect, useState } from 'react'
import style from "../product.module.css"
import Header from '@/app/components/Header'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import productData from '@/app/data/productsData'

  // technial specification cards data 
const technicalSpecification = [
  {
    icon:"/images/products/agriflow-hds40/propeller.svg",
    title:"Extended Endurance Flight System",
    description:"Up to 59 minutes of flight time for long missions"
  },
  {
    icon:"/images/products/agriflow-hds40/fibre.svg",
    title:"High Payload Capacity",
    description:"Supports up to 6 kg of sensors and equipment"
  },
  {
    icon:"/images/products/agriflow-hds40/antena.svg",
    title:"Omnidirectional Obstacle Sensing",
    description:"LiDAR, mmWave radar, and vision sensing enhance safety"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Enterprise-Grade Transmission",
    description:"O4 Enterprise Enhanced with up to ~40 km range"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Modular Payload Support",
    description:"Multiple payload mounts and accessory integration"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/infrascan-m400/transmission-line-inspection.png",
    width: 410,
    height: 441,
    title: "Transmission Line Inspection",
    desc: "We conduct high-precision aerial inspections of power transmission networks, detecting faults, hotspots, and potential failures early, ensuring that your infrastructure remains safe and operational."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/infrascan-m400/substation-inspection.png",
    width: 410,
    height: 441,
    title: "Substation Inspection",
    desc: "We capture detailed visual and sensor data at utility substations, enabling early detection of anomalies and helping maintenance teams make informed decisions to reduce risks."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/infrascan-m400/industrial-plant-inspections.png",
    width: 410,
    height: 441,
    title: "Industrial Plant Inspections",
    desc: "We perform thermal, visual, and sensor-based inspections across industrial plants, identifying equipment anomalies, assessing maintenance needs, and ensuring operational continuity in critical environments."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/infrascan-m400/bridge-flyover-and-tunnel-inspections.png",
    width: 630,
    height: 441,
    title: "Bridge, Flyover, and Tunnel Inspections",
    desc: "We map and inspect critical infrastructure such as bridges, flyovers, and tunnels, using superior vantage point to gather structural insights safely and efficiently."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/infrascan-m400/3d-digital-twin-creation.png",
    width: 630,
    height: 441,
    title: "3D Digital Twin Creation",
    desc: "We generate detailed digital twins of industrial sites or construction areas, enabling better planning, analysis, and progress tracking over time. This helps teams visualise the entire site and make data-driven decisions for project execution."
  }
];

export default function page() {



const [device, setDevice] = useState("desktop");
  
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
  
      if (width < 767) {
        setDevice("mobile");
      } else if (width < 1200) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };
  
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  
  
  const tech_bgImage =
    device === "mobile"
      ? "/images/products/infrascan-m400/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/infrascan-m400/specs_bg_t.webp"
      : "/images/products/infrascan-m400/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Powerful Industrial Drone Designed for Complex and Critical Missions</h1>
<p data-animate="fade-up" data-animate-delay="150">At HDSL, we provide the InfraScan M400, a rugged enterprise drone platform engineered for high-demand industrial missions. Designed for extended flight endurance and heavy-lift capabilities, it supports multiple sensor and payload configurations, making it ideal for inspections, mapping, public safety, and infrastructure monitoring.</p>
<p data-animate="fade-up" data-animate-delay="300">With multi-directional sensing and advanced transmission systems, HDSL ensures reliability and safety during complex operations. This drone’s capabilities allow for efficient aerial workflows, especially in remote environments or high-risk infrastructure.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/infrascan-m400/hero_image.png" width={1285} height={703} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Optimised Systems for Heavy‑Duty Aerial Operations</h2>

  
</div>



<div className={style.specification_slider} data-animate="fade-up" data-animate-delay="150">

{/* ======================================= */}
<>


  <Swiper
    modules={[Navigation]}
    navigation={{
      prevEl: ".whyIndustriesSwiper_custom-prev",
      nextEl: ".whyIndustriesSwiper_custom-next",
    }}
    slidesPerView={1}
    loop={true}
    spaceBetween={30}
    breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1201: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }}
    className="benefitsSwiper"
  >
    {technicalSpecification.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={style.specificationCard}>
          <div className={style.specificationCard_img}>
          <Image src={item.icon} alt={item.title} width={80} height={80}  />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

 
  
</>
{/* ==================================== */}

</div>

 <div className={`slider_nav`}>
  <div className={`whyIndustriesSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`whyIndustriesSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

</div>

 </section>


 {/* product tables section */}
 <section className={`common_section ${style.tables_section}`}>

<div className={`container ${style.tables_container}`}>

{productData["vigilcore-m4td"].map((table, i) => (
  <div key={i} className={style.singleTable} data-animate="fade-up" data-animate-delay={i*`${device === "mobile"?0:250}`}>
    <h3 className={`common_heading ${style.table_heading}`}>{table.heading}</h3>
    <ul>
      {table.items.map((item, index) => (
        <li key={index}>
          <h4 className={style.lable}>{item.label}</h4>
          <p className={style.value}>{item.value}</p>
        </li>
      ))}
    </ul>
  </div>
))}

</div>

 </section>


 {/* sevices list */}

  <section className={`common_section ${style.service_section}`}>

<div className={`container ${style.service_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Supporting Inspection, Mapping, and Public Safety Operations</h2>
</div>


<div className={style.serviceCards}>
  {serviceData.map((item, index) => (
    <div
      key={item.id}
      className={`${style.serviceCard} ${item.className}`}
      data-animate="fade-up"
      data-animate-delay={index * 100}
    >
      <Image
        src={item.img}
        alt={item.title}
        width={item.width}
        height={item.height}
      />
      <div className={style.content}>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  ))}
</div>

</div>

 </section>

   
   </>
  )
}
