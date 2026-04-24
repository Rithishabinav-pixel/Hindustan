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
    icon:"/images/products/skywash-hds40a/propeller.svg",
    title:"High-Pressure Vertical Cleaning System",
    description:"Designed for façade and glass surfaces"
  },
  {
    icon:"/images/products/skywash-hds40a/fibre.svg",
    title:"Precision Spray Control Mechanism",
    description:"Maintains uniform cleaning across the height"
  },
  {
    icon:"/images/products/skywash-hds40a/antena.svg",
    title:"Stable Hovering Flight Performance",
    description:"Ensures accuracy near vertical structures"
  },
  {
    icon:"/images/products/skywash-hds40a/remote.svg",
    title:"Obstacle Sensing and Proximity Control",
    description:"Enables safer operation near buildings"
  },
  {
    icon:"/images/products/skywash-hds40a/remote.svg",
    title:"Extended Control Range Capability",
    description:"Suitable for large urban structures"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft} ${style.full}`,
    img: "/images/products/skywash-hds40a/high-rise-window-scrubbing.png",
    width: 850,
    height: 441,
    title: "High-Rise Window Scrubbing",
    desc: "We efficiently clean glass façades and windows across tall structures without the need for scaffolding or manual access, reducing both time and risks."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/skywash-hds40a/soft-wash-treatment.png",
    width: 410,
    height: 441,
    title: "Soft Wash Treatment",
    desc: "We apply controlled low-pressure cleaning to delicate surfaces, ensuring effective cleaning while preserving structural integrity and preventing damage."
  },
  {
    id: 3,
    className: `${style.bottomTop} `,
    img: "/images/products/skywash-hds40a/building-facade-cleaning.png",
    width: 410,
    height: 441,
    title: "Building Facade Cleaning",
    desc: "Our services maintain exterior surfaces of commercial and residential buildings, enhancing aesthetics while reducing the risks associated with manual interventions."
  },
  {
    id: 4,
    className: `${style.bottomLeft} ${style.full}`,
    img: "/images/products/skywash-hds40a/infrastructure-surface-cleaning.png",
    width: 850,
    height: 441,
    title: "Infrastructure Surface Cleaning",
    desc: "We provide cleaning for bridges, towers, and elevated structures where traditional methods are either inefficient or unsafe. Available upon request for projects that require this specific service."
  }
];

export default function SkywashHds40aClient() {



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
      ? "/images/products/skywash-hds40a/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/skywash-hds40a/specs_bg_t.webp"
      : "/images/products/skywash-hds40a/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Reach Higher. Clean Smarter. Maintain Urban Structures Easily.</h1>
<p data-animate="fade-up" data-animate-delay="150">At HDSL, we understand that maintaining high-rise structures comes with significant access challenges, safety risks, and operational complexities. With the SkyWash HDS40A, we've designed an aerial cleaning approach tailored for vertical environments. Our drone system ensures consistent cleaning across glass facades and elevated surfaces, without requiring manual intervention.</p>
<p data-animate="fade-up" data-animate-delay="300">This means safer operations, reduced downtime, and a more efficient approach to managing large-scale exterior maintenance.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/skywash-hds40a/hero_image.png" width={1305} height={748} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Built for Stability Across Vertical Cleaning Environments</h2>


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

{productData["skywash-hds40a"].map((table, i) => (
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
  <h2 data-animate="fade-up" className={`common_heading `}>Purpose-Built Services for Elevated Structure Maintenance</h2>
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
