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
    icon:"/images/products/solarshine-hds40b/propeller.svg",
    title:"High-Pressure Surface Cleaning System",
    description:"Removes dust without damaging panels"
  },
  {
    icon:"/images/products/solarshine-hds40b/fibre.svg",
    title:"Wide-Area Spray Coverage Design",
    description:"Covers more panels in fewer passes"
  },
  {
    icon:"/images/products/solarshine-hds40b/antena.svg",
    title:"Precision Navigation with RTK Support",
    description:"Maintains alignment across panel rows"
  },
  {
    icon:"/images/products/solarshine-hds40b/remote.svg",
    title:"Adaptive Terrain Response System",
    description:"Adjusts to varying installation layouts"
  },
  {
    icon:"/images/products/solarshine-hds40b/remote.svg",
    title:"Long-Range Remote Operation Capability",
    description:"Supports large-scale solar sites"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/solarshine-hds40b/dry-brush-cleaning.png",
    width: 410,
    height: 441,
    title: "Dry Brush Cleaning",
    desc: "We offer non-invasive dry brush cleaning to remove loose dust, making it ideal for areas where water conservation is critical, or in dry environments where traditional cleaning methods fall short."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/solarshine-hds40b/de-ionised-water-cleaning.png",
    width: 410,
    height: 441,
    title: "De-ionised Water Cleaning",
    desc: "Our de-ionised water cleaning method ensures residue-free cleaning that prevents streaks or mineral deposits, helping maintain solar panel efficiency and longevity."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/solarshine-hds40b/thermal-fault-nspection.png",
    width: 410,
    height: 441,
    title: "Thermal Fault Inspection",
    desc: "We use thermal imaging to identify underperforming panels or hotspots early, enabling you to prevent energy loss and address potential issues before they escalate."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/solarshine-hds40b/solar-pv-thermal-diagnostics.png",
    width: 630,
    height: 441,
    title: "Solar PV Thermal Diagnostics",
    desc: "We provide in-depth thermal diagnostics to give you insights into your solar system's performance, helping you make informed decisions on maintenance and repairs across large installations."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/solarshine-hds40b/solar-plant-mapping.png",
    width: 630,
    height: 441,
    title: "Solar Plant Mapping",
    desc: "We provide in-depth thermal diagnostics to give you insights into your solar system's performance, helping make informed decisions on maintenance and repairs across large installations."
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
    ? "/images/products/solarshine-hds40b/specs_bg_m.webp"
    : device === "tablet"
    ? "/images/products/solarshine-hds40b/specs_bg_t.webp"
    : "/images/products/solarshine-hds40b/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>High-Efficiency Cleaning for Scalable Solar Plant Operations</h1>
<p data-animate="fade-up" data-animate-delay="150">HDSL’s SolarShine HDS40B is designed to simplify large-scale solar panel maintenance through efficient aerial cleaning and inspection. Our drone systems ensure consistent performance, enabling uniform cleaning across extensive installations while reducing manual effort and downtime.</p>
<p data-animate="fade-up" data-animate-delay="300">With stable flight control and optimised cleaning systems, we help maintain panel efficiency, improve energy output, and ensure reliable, repeatable maintenance operations.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/solarshine-hds40b/hero_image.png" width={1305} height={748} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Systems Designed for Real-World Solar Maintenance</h2>

  
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

{productData["solarshine-hds40b"].map((table, i) => (
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
  <h2 data-animate="fade-up" className={`common_heading `}>Focused Services for Solar Cleaning and System Reliability</h2>
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
