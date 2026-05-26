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
    icon: "/images/industries/utilities/ic1.svg",
    title: "Solar Farm Inspection",
    desc: "Our drones detect thermal hotspots and performance issues across large solar installations, enabling quick identification of underperforming panels."
  },
  {
    icon: "/images/industries/utilities/ic2.svg",
    title: "Wind Turbine Inspection",
    desc: "We inspect turbine blades and structures without shutdowns or manual access, reducing downtime while improving inspection safety and accuracy."
  },
  {
    icon: "/images/industries/utilities/ic3.svg",
    title: "Transmission Line Monitoring",
    desc: "Our drones help detect faults, line sag, and vegetation encroachment across long-distance transmission networks."
  },
  {
    icon: "/images/industries/utilities/ic4.svg",
    title: "Vegetation Mapping",
    desc: "We map vegetation growth along critical corridors to help prevent fire hazards and minimise outage risks."
  },
  {
    icon: "/images/industries/utilities/ic5.svg",
    title: "Post-Event Assessment",
    desc: "Our drones enable rapid damage assessment after storms or disruptions, supporting faster recovery and restoration planning."
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
    title: "How do drones improve utility inspections?",
    content: "They reduce inspection time, improve accuracy, and minimise risk by accessing hard-to-reach infrastructure safely."
  },
  {
    title: "Can drones detect faults in solar panels?",
    content: "Yes. Thermal imaging helps identify hotspots, faulty panels, and performance issues across large installations."
  },
  {
    title: "Are drone inspections safer than manual methods?",
    content: "Yes. They eliminate the need for climbing structures or working near high-voltage systems."
  },
  {
    title: "Can inspections be done without shutting down operations?",
    content: "In most cases, inspections can be conducted without interrupting normal operations."
  },
  {
    title: "What kind of reports are provided?",
    content: "Detailed inspection reports with images, analysis, and operational findings are shared after each mission. "
  }
];

export default function UtilitiesClient() {
  return (
   <>

   <Header/>

   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/utilities/hero_banner.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading `} data-animate="fade-up" data-animate-delay="100">Inspection and Monitoring <br className='desktop_break'/>for Utility Infrastructure</h1>
       <p data-animate="fade-up" data-animate-delay="100" className={style.white}>We use drone systems to inspect and monitor power, solar, wind, and grid infrastructure, helping improve asset reliability, reduce downtime, and support faster maintenance planning.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn ">
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

       <p data-animate="fade-up" data-animate-delay="100">Utility networks are vast, complex, and often located in remote or difficult terrain. Manual inspections are time-consuming, risky, and can lead to delayed fault detection and costly outages.</p>
       <p data-animate="fade-up" data-animate-delay="200">Monitoring large-scale utility infrastructure consistently can be difficult, making early fault detection and maintenance planning more challenging.</p>

      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/utilities/utilities_side_image.webp" width={630} height={460} alt="" />

      </div>

        </div>

         <div className={style.image} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/utilities/utilities_overview_image.webp" width={410} height={539} alt="" />

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

       <p data-animate="fade-up" data-animate-delay="100">At HDSL, our drone systems enable faster, safer, and accurate inspection of utility infrastructure, helping teams identify risks early and maintain operational continuity.</p>
      </div>

      <div className={style.contentImage} data-animate="fade-up" data-animate-delay="200">
        <Image src="/images/industries/utilities/help_side_image.webp" width={520} height={721} alt="" />

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
