"use client";
import React from 'react'
import style from '../industries.module.css'
import Link from 'next/link'
import ButtonFan from '@/app/components/UI/ButtonFan'
import Header from '@/app/components/Header'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import * as Accordion from "@radix-ui/react-accordion";
import LinkArrow from '@/app/components/UI/LinkArrow';

// icon grid data

const iconGrid = [
  {
    icon: "/images/industries/construction/ic1.svg",
    title: "Progress Tracking",
    desc: "We capture regular aerial updates with time-stamped visuals, giving stakeholders a clear and consistent view of site progress."
  },
  {
    icon: "/images/industries/construction/ic2.svg",
    title: "Plan vs Actual Analysis",
    desc: "Our data helps compare on-ground progress against project timelines, enabling early identification of delays and deviations."
  },
  {
    icon: "/images/industries/construction/ic3.svg",
    title: "Safety Monitoring",
    desc: "We provide aerial visibility across active sites, helping identify potential risks without exposing personnel to hazardous environments."
  },
  {
    icon: "/images/industries/construction/ic4.svg",
    title: "3D Mapping & Models",
    desc: "We generate accurate site maps and 3D models to support planning, coordination, and reporting across project stages."
  },
  {
    icon: "/images/industries/construction/ic5.svg",
    title: "Project Documentation",
    desc: "We create structured visual records to support communication, compliance, and long-term project documentation."
  }
];


// slider data
const droneSlider = [
  {
    title: "AgriFlow HDS40",
    image: "/images/products/agriflow-hds40.png",
    slug:"/products/agriflow-hds40"
  },
  {
    title: "AgriFlow HDS-SEED",
    image: "/images/products/agriflow-hds40.png",
    slug:"/products/agriflow-hds40"

  },
  {
    title: "SolarShine HDS40B",
    image: "/images/products/solarshine.png",
    slug:"/products/solarshine-hds40b"

  },
  {
    title: "SkyWash HDS40A",
    image: "/images/products/skywash.png",
    slug:"/products/skywash-hds40a"

  },
  {
    title: "CargoLift HDS20A",
    image: "/images/products/cargolift.png",
    slug:"/products/cargolift-hds20a"

  },
  {
    title: "TerraMap HDS4P",
    image: "/images/products/terramap.png",
    slug:"/products/terramap-hds4p"

  },
  {
    title: "VigilCore M4TD",
    image: "/images/products/vigilcore.png",
    slug:"/products/vigilcore-m4td"

  },
  {
    title: "InfraScan M400",
   image: "/images/products/infrascan.png",
    slug:"/products/infrascan-m400"

  }
];

// faq's data

const faqData = [
  {
    title: "How do drones improve construction project tracking?",
    content: "They provide consistent aerial updates, enabling stakeholders to monitor progress remotely and make timely decisions."
  },
  {
    title: "Can drone data be used for project reporting?",
    content: "Yes. Aerial data, including images and 3D models, can be integrated into reports for tracking progress and communicating with stakeholders."
  },
  {
    title: "How does aerial monitoring improve site safety?",
    content: "It allows teams to identify risks and monitor site conditions without requiring physical presence in high-risk areas."
  },
  {
    title: "Can drones support large and complex construction sites?",
    content: "Yes. Drone operations can scale across large sites, providing comprehensive coverage and consistent data collection."
  },
  {
    title: "How frequently can site monitoring be conducted?",
    content: "Monitoring frequency can be scheduled based on project requirements, from daily updates to periodic progress tracking."
  }
];

export default function ConstructionClient() {
  return (
   <>

   <Header/>

   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/construction/hero_banner.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading`} data-animate="fade-up" data-animate-delay="100">Real-Time Visibility <br className='desktop_break'/>for Construction Projects</h1>
       <p data-animate="fade-up" className={style.white} data-animate-delay="100">We bring aerial visibility into construction workflows, helping teams track progress, maintain site oversight, and make informed decisions with accurate, data-driven insights.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
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

       <p data-animate="fade-up" data-animate-delay="100">Construction projects operate across multiple teams, timelines, and moving variables. Limited on-site visibility and delayed reporting can lead to misalignment, rework, and cost escalations.</p>
       <p data-animate="fade-up" data-animate-delay="200">Without consistent and accurate updates, stakeholders often rely on fragmented information, making it difficult to track progress, manage risks, and maintain control over execution.</p>

      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/construction/construction_side_image.webp" width={630} height={460} alt="" />

      </div>

        </div>

         <div className={style.image} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/construction/construction_overview_image.webp" width={410} height={539} alt="" />

      </div>

      </div>

    </div>
   </section>


{/* helps section */}

<section className={`common_section ${style.industryHelp_section}` }>
    <div className={`container ${style.helpContainer} ${style.industries_commonContainer}`}>

<h2 className={`common_heading`} data-animate="fade-up">How HDSL Helps</h2>

        <div className={`${style.row} ${style.align_center}`}>

        <div className={style.content}>

             <div className={`topContent topContent_left ${style.topContent}`}>

       <p data-animate="fade-up" data-animate-delay="100">At HDSL, we integrate aerial monitoring into construction workflows, enabling teams to track, assess, and manage projects with greater clarity and control.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/construction/help_side_image.webp" width={520} height={721} alt="" />

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
         {/* <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link> */}
      </div>
</div>

<div className={style.drone_slider} data-animate="fade-up" data-animate-delay="100">

<>


  <Swiper
    modules={[Navigation, Autoplay]}
    navigation={{
      prevEl: ".droneSwiper_custom-prev",
      nextEl: ".droneSwiper_custom-next",
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
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
       <Link href={`${item.slug}`} className="drone_card">
          <div className={style.drone_slider_img}>
          <Image src={`${item.image}`} alt={item.title} width={520} height={320}  />
          </div>
          <h3>{item.title}</h3>
        </Link>
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
