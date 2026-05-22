"use client"
import React, { useRef } from 'react'

import style from '../WhatClient.module.css'
import Link from 'next/link'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Header from '@/app/components/Header'
import ButtonFan from '@/app/components/UI/ButtonFan'


import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as Accordion from "@radix-ui/react-accordion";
import LinkArrow from '@/app/components/UI/LinkArrow';


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


// operating cards data 
const operatingCardsData = [
  {
    image: "/images/customer_operating1.png",
    title: "Mission Booking and Planning Console",
    description:
      "Self-service mission creation with intelligent scoping. Select vertical, define area of interest on a map, choose sensor suite, and receive a binding quote in minutes.",
    points: [
      "Geo-fenced AOI drawing with KML/Shapefile import",
      "Sensor recommendation engine (RGB, multispectral, LiDAR, thermal)",
      "Automated airspace and red-zone clearance pre-checks",
      "Slot booking with weather-aware scheduling",
    ],
  },
    {
    image: "/images/customer_operating2.png",
    title: "Live Mission Operations Center",
    description:
      "Track every active flight across your sites in real time. Watch live telemetry, pilot location, mission progress, and data acquisition status from a single dashboard.",
    points: [
      "Real-time flight playback with NPNT-signed logs",
      "Incident and exception alerts with auto-escalation",
      "Customer-side mission approval and acceptance workflow",
      "Direct chat with assigned pilot and field agent",
    ],
  },
    {
    image: "/images/customer_operating3.png",
    title: "AI Analytics and Vertical Insights",
    description:
      "Raw imagery becomes business-grade intelligence. Industry-specific models process every dataset through validated AI pipelines tailored to your operating context.",
    points: [
      "Agriculture: NDVI, crop stress, pest hotspots, prescription maps",
      "Construction: progress vs. plan, BIM overlay, volume tracking",
      "Mining: stockpile volumetrics, haul-road wear, slope stability",
      "Environment: vegetation health, water bodies, emission plumes",
    ],
  },
    {
    image: "/images/customer_operating4.png",
    title: "Compliance and Audit Vault",
    description:
      "A regulator-grade archive of every mission your organization has commissioned, with cryptographically signed evidence ready for DGCA, MoEF, ESG, or insurer review.",
    points: [
      "Tamper-evident flight logs and pilot certifications",
      "Auto-generated compliance certificates per mission",
      "Time-bound external access links for auditors",
      "Export-ready ESG and CSR reporting packs",
    ],
  },
    {
    image: "/images/customer_operating5.png",
    title: "Open ERP and Billing Integration",
    description:
      "Mission commercials flow into your finance and procurement systems through documented REST APIs and webhooks. No vendor lock-in, no proprietary connectors.",
    points: [
      "REST APIs and event webhooks for any ERP, BI, or workflow tool",
      "Configurable PO, GRN, and invoice matching",
      "Cost center and project-code allocation per mission",
      "Self-serve consumption dashboards exportable to your BI stack",
    ],
  },
];

// why industries cards data 
  const whyIndustriesdata = [
    {
      icon:"/images/customer_ic1.svg",
      title:"One platform replaces four vendors and a spreadsheet",
      description:"Mission booking, certified pilots, regulated execution, sensor data, AI analytics, and audit artefacts — all from one regulated control tower."
    },
     {
      icon:"/images/customer_ic2.svg",
      title:"Regulator-ready by default",
      description:"Every flight logged against DGCA Digital Sky in real time. NPNT-signed artefacts, pilot credentials, and audit trails ready for inspection on demand."
    },
     {
      icon:"/images/customer_ic3.svg",
      title:"Insights that earn their seat in your Monday review",
      description:"Vertical-tuned AI for crop stress, stockpile volumetrics, encroachment, and emissions. You receive decisions, not just imagery."
    },
     {
      icon:"/images/customer_ic4.svg",
      title:"Pay how your business actually buys",
      description:"Per mission for one-offs, per acre or per asset for recurring monitoring, or annual retainers for sustained volume. Full GST compliance, transparent invoicing."
    }
  ]



// trusted cards data 
const trustedCardsData = [
    {
        image:"/images/customer_trusted_img1.svg",
        text: "DGCA Approved"
    },
     {
        image:"/images/customer_trusted_img2.svg",
        text: "DGCA Approved"
    },
     {
        image:"/images/customer_trusted_img3.svg",
        text: "DGCA Approved"
    },
     {
        image:"/images/customer_trusted_img4.svg",
        text: "DGCA Approved"
    },
     {
        image:"/images/customer_trusted_img5.svg",
        text: "DGCA Approved"
    },
     {
        image:"/images/customer_trusted_img6.svg",
        text: "DGCA Approved"
    },
]


// faq's data

const faqData = [
  {
    title: "What does HDSL actually deliver beyond drone flights?",
    content: "HDSL operates a full Drone-as-a-Service stack: mission planning, certified pilots, regulated flight execution, sensor data acquisition, AI-driven analytics, vertical-specific reporting, and compliance evidence. Customers receive insights and audit artefacts, not raw imagery to interpret."
  },
  {
    title: "How is HDSL different from hiring a local drone service provider?",
    content: "Local providers solve one mission at a time. HDSL gives you a national operating layer with consistent SLAs, audit-grade compliance, GST-compliant billing, and AI analytics that improve with every mission across our network. You scale without re-procuring."
  },
  {
    title: "How does HDSL handle data security and privacy?",
    content: "Customer data is stored in a single-tenant architecture with logical segregation, encrypted at rest and in transit, and accessible only through role-based permissions. The platform is ISO 27001 aligned, MeitY empanelled, and operates exclusively on Indian data centers."
  },
  {
    title: "Can HDSL integrate with our existing ERP and BI stack?",
    content: "Yes. HDSL exposes documented REST APIs and event webhooks that work with any ERP, BI, or workflow platform. Mission events, commercials, and analytics can flow directly into your existing finance, procurement, and reporting systems."
  },
  {
    title: "How quickly can a mission be scheduled?",
    content: "Standard missions in approved airspace are scheduled within 48 hours of approval. Missions requiring fresh DGCA clearances or restricted zones typically complete within 7 to 14 working days, depending on category."
  },
  {
    title: "What are the commercial models available?",
    content: "HDSL offers three commercial structures: per-mission pricing for ad-hoc needs, per-acre or per-asset pricing for recurring monitoring, and annual enterprise retainers for organizations with sustained volume. All models are GST-compliant with full invoice transparency."
  }
];

export default function CustomerClient() {

const operatingCards = useRef(null);
const operatingTitle = useRef(null);

useGSAP(() => {

    if (typeof window === "undefined") return;

  const laptop = window.innerWidth < 1400;
  if (window.innerWidth < 1200) return;

  const cards = operatingCards.current.querySelectorAll(`.${style.card}`);
  const lastCard = cards[cards.length - 1];


cards.forEach((card, index) => {

  if(index === 0){

    ScrollTrigger.create({
      trigger: operatingTitle.current,
      start: `top ${laptop ? "80px" : "120px"}`,
      endTrigger: lastCard,
      end: `top ${(laptop ? 176 : 272) + ((cards.length - 1) * 20)}px`,
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      fastScrollEnd: true,
    });

  }

  ScrollTrigger.create({
    trigger: card,
    start: `top ${(laptop ? 176 : 272) + (index * 20)}px`,
    endTrigger: lastCard,
    end: `top ${(laptop ? 176 : 272) + ((cards.length - 1) * 20)}px`,
    pin: true,
    pinSpacing: false,
    scrub: 0.5,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    fastScrollEnd: true,

    onUpdate: (self) => {

      cards.forEach((prevCard, prevIndex) => {

        if(prevIndex < index){

          const targetScale =
            self.progress > 0
              ? 1 - ((index - prevIndex) * 0.02)
              : 1;

          gsap.to(prevCard, {
            scale: targetScale,
            transformOrigin: "top center",
            force3D: true,
            duration: 0.3,
            ease: "power1.out",
            overwrite: true,
          });

        }

      });

    }

  });

});



  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1500);

}, []);


  return (
    <>
    
    <Header/>

    {/* hero section  */}
    
   <section className={style.hero_section}>

<div className={style.heroVideo}>
   <video
  width="1920"
  height="1029"
  loop
  muted
  autoPlay
  preload="metadata"
  playsInline
  poster="/images/hp_hero_banner.webp"  
  className={style.video}
>
  <source src="/images/whatclient_video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div>

    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading `} data-animate="fade-up" data-animate-delay="100">What’s in it for you, exactly?</h1>
       <p data-animate="fade-up" data-animate-delay="100">Four ways to engage with India's most regulated drone services network. Pick the role that fits — we'll show you the value, the path, and the upside on the next screen.</p>
       <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
      </div>

    </div>

   </section>

{/* tab section  */}

<section className={style.tab_section}>
    <div className={`container ${style.tabContainer}`}>
<Link href="/whats-in-it-for/customer" className={`${style.tabBtn} ${style.active}`}> I’m Customer </Link>
<Link href="/whats-in-it-for/partner" className={`${style.tabBtn}`}> I’m Partner </Link>
<Link href="/whats-in-it-for/pilot" className={`${style.tabBtn}`}> I’m Pilot </Link>
<Link href="/whats-in-it-for/field-agent" className={`${style.tabBtn}`}> I’m Field Agent </Link>

    </div>
</section>


{/* trusted section  */}

   <section className={`common_section ${style.trusted_section}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">Trusted Industry Standards</h2>
  </div>

  <div className={style.trusted_cards} data-animate="fade-up">
    {
        trustedCardsData.map((data,index)=>(
              <div className={style.card} key={index}>
        <Image src={data.image} alt={data.text} width={158} height={40} />
        <p>{data.text}</p>
    </div>
        ))
    }
  </div>


</div>
   </section>



{/* why industries section */}
 <section className={`common_section ${style.whyIndustries_section}`}>

<div className={`container ${style.whyIndustries_container}`}>

<div className={`topContent ${style.whyIndustries_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Aerial intelligence, on enterprise terms.</h2>
    <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>ENQUIRE NOW</span>
        </Link>
</div>



<div className={style.whyIndustries_slider}>

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
    {whyIndustriesdata.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={style.whyIndustriesCard}>
          <div className={style.whyIndustriesCard_img}>
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
 <div className={`slider_nav`}>
  <div className={`whyIndustriesSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`whyIndustriesSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

</div>



</div>

 </section>


{/* operating section  */}

 <section className={`common_section light_section ${style.operating_section}`}>

<div className={`container ${style.operating_container}`}>

<div  ref={operatingTitle} className={`topContent  ${style.operating_topContent}`}  >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Everything you need in one DaaS operating layer.</h2>
</div>

<div className={style.operatingCards} ref={operatingCards}>

  {operatingCardsData.map((card, index) => (
    <div className={style.card} key={index}>

      <div className={style.image}>
        <Image
          src={card.image}
          width={409}
          height={478}
          alt={card.title}
        />
      </div>

      <div className={style.content}>
        <h3>{card.title}</h3>

        <p>{card.description}</p>

        <ul>
          {card.points.map((point, pointIndex) => (
            <li key={pointIndex}>{point}</li>
          ))}
        </ul>
      </div>

    </div>
  ))}

</div>





</div>

 </section>


{/* training faq section */}
 <section className={`common_section ${style.faq_section} faq_section`}>
<div className={`container ${style.faqContainer}`}>
 <div className={`topContent ${style.topContent}`}>

  {/* faq title */}
        <h2 data-animate="fade-up" className="common_heading">Frequently Asked Questions</h2>
      
      </div>

  

<div className={`faq ${style.faq_section}`} data-animate="fade-up">
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
