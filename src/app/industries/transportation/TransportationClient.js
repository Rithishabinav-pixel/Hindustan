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
    icon: "/images/industries/transportation/ic1.svg",
    title: "Bridge Inspection",
    desc: "We inspect structural components without requiring complex access setups, enabling faster and safer assessment of critical areas."
  },
  {
    icon: "/images/industries/transportation/ic2.svg",
    title: "Road Condition Analysis",
    desc: "We capture high-resolution imagery to detect cracks, potholes, and surface degradation across road networks."
  },
  {
    icon: "/images/industries/transportation/ic3.svg",
    title: "Railway Monitoring",
    desc: "We monitor track surroundings for slope instability, vegetation growth, and encroachment risks along railway corridors."
  },
  {
    icon: "/images/industries/transportation/ic4.svg",
    title: "Port & Jetty Inspection",
    desc: "We conduct detailed inspections of coastal and marine infrastructure without the need for manual or vessel-based access."
  },
  {
    icon: "/images/industries/transportation/ic5.svg",
    title: "Right of Way (ROW) Monitoring",
    desc: "We help identify encroachments and obstructions along transport corridors to support compliance and safety."
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
    title: "How do drones improve infrastructure inspections?",
    content: "They enable faster data collection across large areas while reducing the need for manual access and operational disruptions."
  },
  {
    title: "Can inspections be done without interrupting traffic or operations?",
    content: "In most cases, inspections can be conducted without affecting ongoing operations or requiring shutdowns."
  },
  {
    title: "Are drones suitable for large transport networks?",
    content: "Yes. Drone systems can efficiently cover long-distance infrastructure such as highways, railways, and corridors."
  },
  {
    title: "What kind of issues can be detected?",
    content: "Drones can identify structural damage, surface wear, encroachments, and environmental risks affecting infrastructure."
  },
  {
    title: "How is inspection data delivered?",
    content: "Data is provided as structured reports with imagery, analysis, and actionable insights for maintenance planning."
  }
];

export default function TransportationClient() {
  return (
   <>

   <Header/>

   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/transportation/hero_banner.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading black`} data-animate="fade-up" data-animate-delay="100">Safer Infrastructure <br className='desktop_break'/>Through Aerial Inspection</h1>
       <p data-animate="fade-up" data-animate-delay="100">We enable faster and safer inspection of roads, railways, bridges, and transport networks through aerial monitoring, helping teams identify risks early and maintain infrastructure reliability at scale.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn black">
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

       <p data-animate="fade-up" data-animate-delay="100">Transport infrastructure spans large distances and operates under continuous load, making regular inspection essential. Traditional methods are slow, labour-intensive, and often require partial shutdowns or physical access to difficult locations.</p>
       <p data-animate="fade-up" data-animate-delay="200">Delayed inspections and limited visibility can make early signs of damage harder to detect, increasing safety risks and long-term maintenance costs.</p>

      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/transportation/transportation_side_image.webp" width={630} height={460} alt="" />

      </div>

        </div>

         <div className={style.image} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/transportation/transportation_overview_image.webp" width={410} height={539} alt="" />

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

       <p data-animate="fade-up" data-animate-delay="100">At HDSL, we bring aerial inspection into infrastructure workflows, enabling faster assessments, reduced disruption, and more reliable condition monitoring.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/transportation/help_side_image.webp" width={520} height={721} alt="" />

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
