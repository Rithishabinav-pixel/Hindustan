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
    title:"Dual-Sensor Imaging (Thermal + Visual)",
    description:"Combines high-resolution visual and thermal data capture"
  },
  {
    icon:"/images/products/agriflow-hds40/fibre.svg",
    title:"Omnidirectional Obstacle Sensing",
    description:"Enhances flight safety in complex environments"
  },
  {
    icon:"/images/products/agriflow-hds40/antena.svg",
    title:"Laser Range Finder Support",
    description:"Precision measurement and target localisation"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Long-Range Enterprise Transmission (O4 / O4+)",
    description:"Stable live feed across extended distances"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Industrial-Grade Stabilised Gimbal",
    description:"Smooth data capture across missions"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/vigilcore-m4td/transmission-line-inspection.png",
    width: 410,
    height: 441,
    title: "Transmission Line Inspection",
    desc: "We capture high-quality thermal and visual data on powerlines, detecting faults, hotspots, and potential failures to prevent downtime and enhance safety."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/vigilcore-m4td/substation-inspection.png",
    width: 410,
    height: 441,
    title: "Substation Inspection",
    desc: "We perform detailed aerial inspections of critical utility nodes, enabling early anomaly detection and integrity assessment without disrupting operations."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/vigilcore-m4td/industrial-plant-inspections.png",
    width: 410,
    height: 441,
    title: "Industrial Plant Inspections",
    desc: "We conduct comprehensive thermal and visual inspections across industrial plants, identifying equipment anomalies and assessing maintenance needs to avoid operational disruptions."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/vigilcore-m4td/wildfire-monitoring.png",
    width: 630,
    height: 441,
    title: "Wildfire Monitoring",
    desc: "We use advanced thermal sensing to detect hotspots, track fire fronts, and provide crucial support for environmental emergency response teams."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/vigilcore-m4td/search-rescue.png",
    width: 630,
    height: 441,
    title: "Search & Rescue",
    desc: "We leverage combined visual and thermal imaging to locate individuals or heat signatures in challenging terrains or low-visibility conditions, improving response times and success rates."
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
      ? "/images/products/vigilcore-m4td/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/vigilcore-m4td/specs_bg_t.webp"
      : "/images/products/vigilcore-m4td/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Reliable Thermal and Visual Insight for High‑Risk Operations</h1>
<p data-animate="fade-up" data-animate-delay="150">VigilCore M4TD is engineered as a rugged enterprise drone platform combining high‑resolution visual and thermal imaging with intelligent navigation systems. Built for demanding inspection, safety, and emergency missions, it provides clear thermal data, precision measurement, and extended operational reach. </p>
<p data-animate="fade-up" data-animate-delay="300">Stable flight performance and omnidirectional sensing enhance safety in complex environments, enabling efficient aerial workflows for industrial and public safety applications.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/vigilcore-m4td/hero_image.png" width={1779} height={446} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Advanced Technical Capability for Inspection and Monitoring</h2>

  
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
  <h2 data-animate="fade-up" className={`common_heading `}>Enterprise Inspection and Safety Support Services</h2>
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
