"use client"
import Header from '@/app/components/Header';
import React, { useEffect, useState } from 'react';
import style from '../Service.module.css';
import Link from 'next/link';
import ButtonFan from '@/app/components/UI/ButtonFan';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import * as Accordion from "@radix-ui/react-accordion";


// sub services contents

  const subServices = [
    {
      image:"/images/services/agriculture/sub1.png",
      title:"Crop Monitoring & Field Analysis",
      description:"Our drones capture high-resolution aerial imagery to monitor crop health, detect plant stress, and identify irrigation issues early. This allows farmers to take timely action and maintain optimal crop conditions."
    },
     {
      image:"/images/services/agriculture/sub1.png",
      title:"Crop Monitoring & Field Analysis",
      description:"Our drones capture high-resolution aerial imagery to monitor crop health, detect plant stress, and identify irrigation issues early. This allows farmers to take timely action and maintain optimal crop conditions."
    },
     {
      image:"/images/services/agriculture/sub1.png",
      title:"Crop Monitoring & Field Analysis",
      description:"Our drones capture high-resolution aerial imagery to monitor crop health, detect plant stress, and identify irrigation issues early. This allows farmers to take timely action and maintain optimal crop conditions."
    },
     {
      image:"/images/services/agriculture/sub1.png",
      title:"Crop Monitoring & Field Analysis",
      description:"Our drones capture high-resolution aerial imagery to monitor crop health, detect plant stress, and identify irrigation issues early. This allows farmers to take timely action and maintain optimal crop conditions."
    }
  ]

  // benefits cards data 
  const benefitsData = [
    {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
     {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
     {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
     {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
     {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
     {
      icon:"/images/services/agriculture/bi1.svg",
      title:"Improved crop health monitoring",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
  ]


  // products data
  const productsdata = [
  {
    title: "Drone Model 1",
    image: "/images/drone_model1.png"
  },
  {
    title: "Drone Model 2",
    image: "/images/drone_model2.png"
  },
  {
    title: "Drone Model 3",
    image: "/images/drone_model3.png"
  },
  {
    title: "Drone Model 1",
    image: "/images/drone_model1.png"
  },
  {
    title: "Drone Model 2",
    image: "/images/drone_model2.png"
  },
  {
    title: "Drone Model 3",
    image: "/images/drone_model3.png"
  }
];

// faq's data

const faqData = [
  {
    title:"How are drones used in agriculture?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"What are the benefits of using drones for farming?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Can drones help detect crop diseases early?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Are agricultural drones suitable for large farms?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Do I need special training to operate agricultural drones?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
    {
    title:"Can drones be used for pesticide and fertilizer spraying?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
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


    // for parralax
    
    useEffect(() => {
      const elements = document.querySelectorAll(".parralax_bg");
    if(mobile) return
      const handleScroll = () => {
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
    
          // when element enters viewport → rect.top < windowHeight
          // when reaches top → rect.top = 0
    
          const progress = Math.min(
            Math.max((windowHeight - rect.top) / windowHeight, 0),
            1
          );
    
          // 110% → 100%
          const scale = 110 - progress * 10;
    
          el.style.backgroundSize = `${scale}% 100%`;
        });
      };
    
      window.addEventListener("scroll", handleScroll);
      
      handleScroll();
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [mobile]);

  return (
   <>
   
   <Header/>


   {/* service - hero section */}

<section className={`common_section  ${style.hero_section}`}>


   <div className={`container ${style.heroSection_container}`}>

{/* service hero section title */}
<h1 data-animate="fade-up" data-animate-delay="100" className={`common_heading ${style.heroSection_title}`}>Revolutionising Modern Farming with Precision Drone Technology</h1>

<div  className={`topContent topContent_left ${style.heroSection_content}`}>
  {/* service hero section description */}
  <p data-animate="fade-up" data-animate-delay="150">HDS delivers end-to-end drone-based agricultural services for farmers, agribusinesses, cooperatives, and government bodies across India — improving productivity, sustainability, and resource efficiency through aerial imaging, AI, and precision application.</p>
   {/* service hero section button */}
   <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>Enquire now</span>
        </Link>
</div>

<div data-animate="fade-up" data-animate-delay="250" className={style.heroSection_image}>
{/* service hero section image */}
<Image className={style.standard_section_image} src="/images/services/agriculture/service_agriculture_hero.png" width={1290} height={700} alt="" />

</div>

   </div>

   </section>


   {/* service - sub services section */}
   
   <section className={`common_section  ${style.subservices_section}`}>


   <div className={`container ${style.subservices_container}`}>

{/* sub services title */}
<h2 data-animate="fade-up" className={`common_heading ${style.servicesTitle}`}>Advanced UAV Services for Agricultural Operations</h2>

{/* sub services cards */}
<div className={style.subservices_cards}>

  {subServices && subServices.map((service, index) => (

    /* sub services single card */
    <div className={style.subservices_card} key={service.id || index} data-animate="fade-up">

      {/* sub services card image */}
      <div className={style.subservices_card_image}>
        <Image 
          className={style.subservices_image} 
          src={service.image} 
          width={630} 
          height={441} 
          alt={service.title} 
        />
      </div>

      {/* sub services card content */}
      <div className={style.subservices_content}>
        
        {/* title */}
        <h3>{service.title}</h3>

        {/* description */}
        <p>{service.description}</p>

      </div>

    </div>

  ))}

</div>


   </div>

   </section>


   {/* service - benefits section */}
   {/* background image for both desktop and mobileview */}
 <section className={`common_section parralax_bg  ${style.benefits_section}`} style={{ backgroundImage: mobile?'url("/images/services/agriculture/benefits_bg_m.webp")':'url("/images/services/agriculture/benefits_bg.webp")' }}>

<div className={`container ${style.benefits_container}`}>

<div className={`topContent topContent_left ${style.benefits_topContent}`} >
  {/* benefits section title */}
  <h2 data-animate="fade-up" className={`common_heading ${style.benefits_title}`}>Benefits Of Using Drones In Agriculture</h2>

  {/* benefits section description */}
  <p data-animate="fade-up" data-animate-delay="150">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.</p>
  
</div>

{/* {mobile && 
<Image className={style.standard_section_image} src="/images/standard_img_m.webp" width={1920} height={1080} alt="" />
} */}

<div className={style.benefits_slider}>

{/* ======================================= */}
<>


  <Swiper
    modules={[Navigation]}
    navigation={{
      prevEl: ".benefitsSwiper_custom-prev",
      nextEl: ".benefitsSwiper_custom-next",
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
    {benefitsData.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={style.benefitsCard}>
          <div className={style.benefitsCard_img}>
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

 <div className={`slider_nav ${style.droneSlider_nav}`}>
  <div className={`benefitsSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`benefitsSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

</div>

 </section>


 {/* service - product section */}
   <section className={`common_section product_section ${style.product_section} `}>
<div className={`container ${style.productContainer}`}>
    <div className={`topContent ${style.topContent}`}>
      {/* product section title */}
        <h2  data-animate="fade-up" className="common_heading">Explore Our Advanced Drone Models</h2>
        {/* product section description */}
        <p data-animate="fade-up" data-animate-delay="100">Discover the perfect drone solution for your industry needs. </p>
         <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>
</div>

<div className={`product_slider ${style.productSlider}`}>
 
<>


  <Swiper
    modules={[Navigation]}
    navigation={{
      prevEl: ".droneSwiper_custom-prev",
      nextEl: ".droneSwiper_custom-next",
    }}
    slidesPerView={1}
    centeredSlides={true}
    loop={true}
    spaceBetween={30}
    breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      1201: {
        slidesPerView: 3,
        spaceBetween: 120,
      },
    }}
    className="productsSwiper"
  >
    {productsdata.map((item, index) => (
      <SwiperSlide key={index}>
        {/* product card */}
        <div className="product_card">

          <div className="product_card_image">
            {/* product card image */}
          <Image src={item.image} alt={item.title} width={520} height={320}  />
          </div>

{/* product card title */}
          <h3>{item.title}</h3>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

 
  
</>

</div>


 <div className={`slider_nav productSlider_nav ${style.productsdata_nav}`}>
  <div className={`droneSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`droneSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

   </section>

   {/* service FAQ */}
 <section className={`common_section ${style.faq_section} faq_section`}>
<div className={`container ${style.faqContainer}`}>
 <div className={`topContent ${style.topContent}`}>

  {/* faq title */}
        <h2 data-animate="fade-up" className="common_heading">Frequently Asked Questions</h2>
      
      </div>

  

<div className='faq' data-animate="fade-up">
      <Accordion.Root type="single" collapsible>

      {faqData.map((faq, index) => (
        <Accordion.Item key={index} value={`item-${index}`}>

          <Accordion.Header>
            <Accordion.Trigger>
              {faq.title}
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content>
            <p>{faq.content}</p>
          </Accordion.Content>

        </Accordion.Item>
      ))}

    </Accordion.Root>

    </div>

</div>
 </section>

   </>
  )
}
