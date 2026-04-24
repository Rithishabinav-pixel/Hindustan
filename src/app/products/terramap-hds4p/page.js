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
    title:"Triple-Lens High-Resolution Camera System",
    description:"Captures rich imagery with excellent detail for mapping"
  },
  {
    icon:"/images/products/agriflow-hds40/fibre.svg",
    title:"51-Minute Max Flight Time",
    description:"Supports extended missions and large-area coverage"
  },
  {
    icon:"/images/products/agriflow-hds40/antena.svg",
    title:"O4+ Long-Range Video Transmission",
    description:"Stable live feed and control across the mission area"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Omnidirectional Obstacle Sensing",
    description:"Enhanced in-flight safety for survey paths"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"360° Infinity Gimbal Stabilisation",
    description:"Smooth imagery capture from varying angles"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/terramap-hds4p/3d-digital-twin-creation.png",
    width: 410,
    height: 441,
    title: "3D Digital Twin Creation",
    desc: "We generate accurate and detailed 3D models of terrain, structures, and environments using aerial capture and photogrammetry workflows. These models support visualisation, design, and analysis across a variety of industries."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/terramap-hds4p/volumetric-analysis.png",
    width: 410,
    height: 441,
    title: "Volumetric Analysis",
    desc: "Our drones perform precise volumetric measurements, including stockpile and excavation volume calculations, as well as tracking landscape changes over time, providing actionable insights for resource management and project progress."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/terramap-hds4p/topographic-survey.png",
    width: 410,
    height: 441,
    title: "Topographic Survey",
    desc: "We capture detailed terrain variations, elevation changes, and contour data, supporting planning, engineering, and environmental workflows with high-accuracy data."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/terramap-hds4p/solar-plant-mapping.png",
    width: 630,
    height: 441,
    title: "Solar Plant Mapping",
    desc: "We create precise, high-resolution maps of solar arrays to support design, performance analysis, and maintenance planning, ensuring your solar installations are optimally monitored and managed."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/terramap-hds4p/grid-mapping.png",
    width: 630,
    height: 441,
    title: "Grid Mapping",
    desc: "Our drones map linear infrastructure such as power distribution lines, pipelines, and transportation routes with high spatial accuracy, enabling more efficient monitoring and maintenance planning."
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
      ? "/images/products/terramap-hds4p/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/terramap-hds4p/specs_bg_t.webp"
      : "/images/products/terramap-hds4p/specs_bg.webp";


  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Professional Mapping and Surveying for Accurate Aerial Insights</h1>
<p data-animate="fade-up" data-animate-delay="150">At HDSL, we leverage the TerraMap HDS4P for high-accuracy aerial mapping and geospatial data capture. Integrated with a professional imaging system and advanced flight performance, our drones enable smooth data acquisition for 3D digital twins, terrain models, and volumetric analysis.</p>
<p data-animate="fade-up" data-animate-delay="300">Optimised for rugged and mixed environments, our system delivers dependable mapping workflows with greater coverage and reduced mission time compared to traditional ground methods, making it ideal for complex surveying and infrastructure projects.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/terramap-hds4p/hero_image.png" width={1285} height={703} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Optimised Systems for Survey‑Level Flight Performance</h2>

  
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

{productData["terramap-hds4p"].map((table, i) => (
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
  <h2 data-animate="fade-up" className={`common_heading `}>Aerial Intelligence for Terrain and Infrastructure Insights</h2>
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
