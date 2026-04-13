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
      title:"3-Blade Propeller System",
      description:"Designed for stable flight and extended operational reliability"
    },
     {
      icon:"/images/products/agriflow-hds40/fibre.svg",
      title:"Carbon Fibre Build Quality",
      description:"Lightweight, durable, and built to withstand field conditions"
    },
     {
      icon:"/images/products/agriflow-hds40/antena.svg",
      title:"RTK Dual Antenna System",
      description:"Enhances positioning accuracy and flight precision"
    },
     {
      icon:"/images/products/agriflow-hds40/remote.svg",
      title:"Extended Remote Control Range",
      description:"Reliable connectivity for large-area operations"
    }
  ]

export default function page() {



  const [mobile, setMobile] = useState(false);
  
    useEffect(() => {
      const checkScreen = () => {
        setMobile(window.innerWidth < 1200);
      };
      checkScreen(); 
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>AgriFlow HDS40</h1>
<p data-animate="fade-up" data-animate-delay="150">AgriFlow HDS40 is designed to simplify and scale modern farming operations with precision and consistency. Built for demanding field conditions, it enables efficient coverage, reduced manual effort, and reliable performance across large agricultural landscapes.</p>
<p data-animate="fade-up" data-animate-delay="300">With intelligent flight control and high-capacity spraying capabilities, it supports uniform application and optimised resource use. The result is a smarter, faster, and more controlled approach to crop management.</p>
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

 <section className={`common_section parralax_bg  ${style.specification_section}`}>

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Technical Specifications That Power Field Performance</h2>

  
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

{productData["agriflow-hds40"].map((table, i) => (
  <div key={i} className={style.singleTable} data-animate="fade-up" data-animate-delay={i*`${mobile?0:250}`}>
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

   
   </>
  )
}
