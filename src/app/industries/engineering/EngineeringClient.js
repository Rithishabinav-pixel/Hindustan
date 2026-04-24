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
    icon: "/images/industries/engineering/ic1.svg",
    title: "High-Accuracy Surveys",
    desc: "We use RTK-enabled drone systems to deliver centimetre-level precision for mapping and measurement across large project areas."
  },
  {
    icon: "/images/industries/engineering/ic2.svg",
    title: "Advanced Data Outputs",
    desc: "We generate orthomosaics, 3D models, and terrain datasets that support detailed analysis and engineering workflows."
  },
  {
    icon: "/images/industries/engineering/ic3.svg",
    title: "Contour Mapping",
    desc: "Our data enables detailed elevation mapping, supporting better planning, grading, and site design decisions."
  },
  {
    icon: "/images/industries/engineering/ic4.svg",
    title: "Volume Analysis",
    desc: "We provide accurate cut-and-fill calculations to support material estimation, planning, and cost control."
  },
  {
    icon: "/images/industries/engineering/ic5.svg",
    title: "Software Compatibility",
    desc: "Our outputs are structured for seamless integration with standard engineering and GIS platforms."
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
    title: "How accurate are drone-based engineering surveys?",
    content: "Drone surveys provide high-level accuracy, making them suitable for most engineering, construction, and planning applications."
  },
  {
    title: "What kind of data outputs are provided?",
    content: "Outputs include orthomosaic maps, 3D models, contour maps, and terrain data for analysis and planning."
  },
  {
    title: "Can drone data be integrated with engineering software?",
    content: "Yes. Data is delivered in formats compatible with common CAD, GIS, and engineering platforms."
  },
  {
    title: "Are drone surveys faster than traditional methods?",
    content: "Yes. Drone-based surveys significantly reduce data collection time while covering larger areas efficiently."
  },
  {
    title: "Can this be used for large-scale projects?",
    content: "Yes. Drone surveys are well-suited for large and complex sites, providing consistent and scalable data capture."
  }
];

export default function EngineeringClient() {
  return (
   <>

   <Header/>

   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/engineering/hero_banner.webp)', backgroundPosition:'60%'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading`} data-animate="fade-up" data-animate-delay="100">High-Precision Data <br className='desktop_break'/>for Engineering Decisions</h1>
       <p data-animate="fade-up" className={style.white} data-animate-delay="100">We deliver accurate, large-scale spatial data through advanced drone-based surveying, helping engineering teams plan, analyse, and execute projects with greater speed, precision, and confidence.</p>
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

       <p data-animate="fade-up" data-animate-delay="100">Engineering projects depend on precise and reliable data, but traditional surveying methods are often time-consuming, resource-intensive, and limited in coverage.</p>
       <p data-animate="fade-up" data-animate-delay="200">Delays in data collection and processing can impact planning accuracy, decision-making, and overall project timelines, especially across large or complex terrains.</p>

      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/engineering/side_image.webp" width={630} height={460} alt="" />

      </div>

        </div>

         <div className={style.image} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/engineering/engineering_overview_image.webp" width={410} height={539} alt="" />

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

       <p data-animate="fade-up" data-animate-delay="100">At HDSL, we provide high-accuracy aerial data capture and processing, enabling engineering teams to work with reliable insights across every stage of a project.
</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/engineering/help_side_image.webp" width={520} height={721} alt="" />

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
