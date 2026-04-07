"use client";
import React from 'react'
import style from '../industries.module.css'
import Link from 'next/link'
import ButtonFan from '@/app/components/UI/ButtonFan'
import Header from '@/app/components/Header'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import * as Accordion from "@radix-ui/react-accordion";
import LinkArrow from '@/app/components/UI/LinkArrow';

// icon grid data

const iconGrid = [
    {
        icon:`/images/industries/agriculture/ic1.svg`,
        title:"Bridge inspection",
        desc:"Deck, underside, piers, abutments, and expansion joints from aerial platforms"
    },
     {
        icon:"/images/industries/agriculture/ic2.svg",
        title:"Road condition mapping",
        desc:"Pothole detection, surface cracking, and pavement distress analysis"
    },
     {
        icon:"/images/industries/agriculture/ic3.svg",
        title:"Railway embankment surveys",
        desc:"Slope stability, erosion, and encroachment monitoring"
    },
     {
        icon:"/images/industries/agriculture/ic4.svg",
        title:"Port and jetty inspection",
        desc:"Structural aerial assessment without vessel or diver requirement"
    }
]

// slider data
const droneSlider = [
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
  return (
   <>

   <Header/>
   
   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/agriculture/indutries_agriculture_hero.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading black`} data-animate="fade-up" data-animate-delay="100">Agricultural <br className='desktop_break'/> Spray and Spread</h1>
       <p data-animate="fade-up" data-animate-delay="100">Precision drone-based spray and spread — the most advanced crop protection and nutrition delivery system available to Indian farmers today.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn black">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
      </div>

    </div>

   </section>


{/* overview section */}
   <section className={`common_section no_padding_bottom ${style.industryOverview_section}` }>
    <div className={`container ${style.overviewContainer} ${style.industries_commonContainer}`}>

<h2 className={`common_heading`} data-animate="fade-up">The Challenge</h2>

        <div className={`${style.row} ${style.align_start}`}>

        <div className={style.content}>

             <div className={`topContent topContent_left ${style.topContent}`}>
      
       <p data-animate="fade-up" data-animate-delay="100">India's transport infrastructure handles billions of journeys annually. Bridges, road surfaces, railway embankments, and tunnels require regular inspection to ensure structural safety and regulatory compliance. Traditional manual inspection is slow, traffic-disruptive, and exposes inspectors to risk. Backlogs lead to dangerous deferred maintenance.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/agriculture/agriculture_side_image.webp" width={630} height={460} alt="" />

      </div>

        </div>

         <div className={style.image} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/agriculture/agriculture_overview_image.webp" width={410} height={539} alt="" />

      </div>

      </div>

    </div>
   </section>


{/* helps section */}

<section className={`common_section ${style.industryHelp_section}` }>
    <div className={`container ${style.helpContainer} ${style.industries_commonContainer}`}>

<h2 className={`common_heading`} data-animate="fade-up">How HDS Helps</h2>

        <div className={`${style.row} ${style.align_center}`}>

        <div className={style.content}>

             <div className={`topContent topContent_left ${style.topContent}`}>
      
       <p data-animate="fade-up" data-animate-delay="100">Our advanced drone systems, intelligent analytics, and expert support deliver reliable aerial operations that industries depend on for precision.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/agriculture/help_side_image.webp" width={520} height={721} alt="" />

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


   {/* ============slider============== */}
      {/* Drone Models*/}
   <section className={`common_section product_section ${style.drone_models} `}>
<div className={`container ${style.drone_models_container}`}>
    <div className={`topContent ${style.topContent}`}>
        <h2 data-animate="fade-up" className="common_heading">Explore Our Advanced Drone Models</h2>
        <p data-animate="fade-up" data-animate-delay="100">Discover the perfect drone solution for your industry needs. </p>
         <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>
</div>

<div className={style.drone_slider} data-animate="fade-up" data-animate-delay="100">
 
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
    className="droneSwiper"
  >
    {droneSlider.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="drone_card">
          <div className={style.drone_slider_img}>
          <Image src={`${item.image}`} alt={item.title} width={520} height={320}  />
          </div>
          <h3>{item.title}</h3>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

 
  
</>

</div>


 <div className={`slider_nav ${style.droneSlider_nav}`}>
  <div className={`droneSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`droneSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

   </section>


{/* faq */}
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
