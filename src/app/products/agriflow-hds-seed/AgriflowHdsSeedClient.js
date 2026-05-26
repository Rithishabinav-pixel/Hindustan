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
    title:"High-Precision Spreading System",
    description:"Controlled and uniform material distribution"
  },
  {
    icon:"/images/products/agriflow-hds40/fibre.svg",
    title:"Real-Time Load Monitoring System",
    description:"Tracks material levels during operations"
  },
  {
    icon:"/images/products/agriflow-hds40/antena.svg",
    title:"RTK Dual Antenna Positioning",
    description:"Enhances navigation accuracy and coverage"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Optimised Anti-Clog Discharge Design",
    description:"Smooth flow across varying particle sizes"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Foldable Modular Frame Structure",
    description:"Easy transport and quick field deployment"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/agriflow-hds40/precision-crop-spraying.png",
    width: 410,
    height: 441,
    title: "Granular Spreading",
    desc: "Supports controlled distribution of seeds, fertilisers, and granular materials across large agricultural areas with consistent field coverage."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/agriflow-hds40/granula-and-seed-distribution.png",
    width: 410,
    height: 441,
    title: "Swarm Seeding",
    desc: "Multiple drones can be deployed simultaneously to support faster seeding operations across extensive farmland and forestry environments."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/agriflow-hds40/crop-health-assessment.png",
    width: 410,
    height: 441,
    title: "Precision Spraying",
    desc: "Supports targeted spraying applications with controlled input distribution and reduced retreatment requirements."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/agriflow-hds40/orchard-and-dense-crop-operations.png",
    width: 630,
    height: 441,
    title: "Crop Health Monitoring",
    desc: "Aerial monitoring helps identify irregular crop growth, stress conditions, and field areas requiring intervention."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/agriflow-hds40/high-efficiency-field-coverage.png",
    width: 630,
    height: 441,
    title: "Orchard Canopy Management",
    desc: "Suitable for orchard environments and dense plantation layouts where controlled reach and accurate distribution are required."
  }
];

export default function AgriflowHdsSeedClient() {

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
      ? "/images/products/agriflow-hds-seed/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/agriflow-hds-seed/specs_bg_t.webp"
      : "/images/products/agriflow-hds-seed/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Smarter Seed Distribution for Faster Field Coverage</h1>
<p data-animate="fade-up" data-animate-delay="150">AgriFlow HDS-SEED is built for large-scale seed and granular distribution across agricultural environments. With controlled spreading systems and stable flight performance, it supports faster field coverage, reduced manual effort, and consistent material distribution across uneven terrain and plantation layouts.</p>

</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/agriflow-hds40/hero_image.png" width={1285} height={703} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Engineered for Controlled Distribution and Field Efficiency</h2>


</div>



<div className={style.specification_slider} data-animate="fade-up" data-animate-delay="150">

{/* ======================================= */}
<>


  <Swiper
    modules={[Navigation, Autoplay]}
    navigation={{
      prevEl: ".whyIndustriesSwiper_custom-prev",
      nextEl: ".whyIndustriesSwiper_custom-next",
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
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

{productData["agriFlow-hds-seed"].map((table, i) => (
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
  <h2 data-animate="fade-up" className={`common_heading `}>Purpose-Built Capabilities for Precision Farming Operations</h2>
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
