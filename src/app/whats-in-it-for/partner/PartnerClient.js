"use client"
import { useRef, useEffect } from "react";

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
    image: "/images/partner_operating1.png",
    title: "Channel Partner Program",
    description:
      "For consultants, agri-input distributors, EPC firms, and regional system integrators who originate demand and want a turnkey delivery partner.",
    points: [
      "Tiered margins: Bronze, Silver, Gold based on annual contribution",
      "Deal registration with 90-day protection",
      "Co-branded proposals, demos, and onboarding kits",
      "Quarterly business reviews with HDSL leadership",
    ],
  },
  {
    image: "/images/partner_operating2.png",
    title: "Technology and OEM Partnerships",
    description:
      "For drone manufacturers, sensor providers, software platforms, and ML model vendors who want their technology adopted at scale across HDSL's mission network.",
    points: [
      "Joint certification and field validation",
      "Inclusion in the HDSL platform marketplace",
      "Co-engineered integrations with SLA-backed support",
      "Access to anonymized mission data for model improvement",
    ],
  },
  {
    image: "/images/partner_operating3.png",
    title: "Strategic Industry Alliances",
    description:
      "For agri-input majors, EPC firms, mining houses, and infrastructure platforms seeking a long-term aerial-intelligence partner embedded into their own customer experience.",
    points: [
      "Joint product co-creation across customer journeys",
      "Embedded HDSL services in partner-branded experiences",
      "Multi-year commercial frameworks with volume guarantees",
      "Joint innovation budget and quarterly steering committee",
    ],
  },
  {
    image: "/images/partner_operating4.png",
    title: "Capital and Infrastructure Partners",
    description:
      "For financial institutions, family offices, and infrastructure platforms participating in HDSL's growth through equity, debt, or asset financing of drones and ground infrastructure.",
    points: [
      "Asset-backed financing of drones and DroNests",
      "Per-mission revenue-share investment instruments",
      "Standardized reporting against agreed covenants",
      "Direct visibility into asset utilization metrics",
    ],
  },
  {
    image: "/images/partner_operating5.png",
    title: "Training and Talent Partners",
    description:
      "For DGCA-approved Remote Pilot Training Organizations (RPTOs) and skill-development bodies feeding certified pilots, agents, and analysts into the HDSL network.",
    points: [
      "Curriculum aligned to HDSL operating standards",
      "Graduates fast-tracked into the pilot and agent network",
      "Co-funded scholarships for women and rural candidates",
      "Performance-based placement incentives",
    ],
  },
];

// why industries cards data 
const whyIndustriesdata = [
  {
    icon:"/images/partner_ic1.svg",
    title:"Five tracks, one orchestration layer",
    description:"Channel resale, OEM/tech integration, strategic industry alliance, capital financing, or training. Pick the track that matches what you bring to the table."
  },
  {
    icon:"/images/partner_ic2.svg",
    title:"Channel conflict, eliminated",
    description:"Deal registration with 90-day protection. Live partner-attributed pipeline visible to you. HDSL direct sales is contractually fenced out of your registered accounts."
  },
  {
    icon:"/images/partner_ic3.svg",
    title:"Inherit the regulatory mileage",
    description:"DGCA approvals, Digital Sky compliance, NPNT, Type Certification access — partners ride HDSL's regulatory machinery instead of building their own."
  },
  {
    icon:"/images/partner_ic4.svg",
    title:"White-label, co-brand, or build natively",
    description:"Configurable branding across customer portals, mission reports, and pilot comms. Your brand stays in front; HDSL stays in the back office."
  }
]



// trusted cards data 
const trustedCardsData = [
  {
    image:"/images/partner_trusted_img1.svg",
    text: "DGCA Recognized"
  },
  {
    image:"/images/partner_trusted_img2.svg",
    text: "MSDE Aligned"
  },
  {
    image:"/images/partner_trusted_img3.svg",
    text: "Startup India"
  },
  {
    image:"/images/partner_trusted_img4.svg",
    text: "ONDC Ready"
  },
  {
    image:"/images/partner_trusted_img5.svg",
    text: "Make in India"
  },
  {
    image:"/images/partner_trusted_img6.svg",
    text: "Skill India"
  },
]


// faq's data

const faqData = [
  {
    title: "Which partnership track is right for us?",
    content: "Channel partners originate and influence deals; technology partners contribute hardware, sensors, or software; strategic partners co-create at industry scale; capital partners finance growth; training partners supply certified talent. HDSL's partner team will assess fit and recommend a track during the qualification call."
  },
  {
    title: "How is channel conflict managed?",
    content: "HDSL operates a deal-registration system with 90-day protection. Partners can transparently see registered opportunities by territory and vertical, and HDSL direct sales is contractually prohibited from engaging registered accounts."
  },
  {
    title: "What is the commercial model?",
    content: "Three options apply across most tracks: a margin-on-resale model, a referral fee on new logo acquisition, or a multi-year revenue share for strategic embedded partnerships. Specific economics are tiered by annual contribution and reviewed yearly."
  },
  {
    title: "Can we white-label HDSL services?",
    content: "Yes, white-label and co-branded experiences are available for qualifying strategic partners. The HDSL platform supports configurable branding across customer portals, mission reports, and pilot communications."
  },
  {
    title: "How long does partner onboarding take?",
    content: "From signed MOU to active partner status is typically 30 to 45 days, including legal, integration walk-through, joint go-to-market plan, and partner-portal provisioning."
  },
  {
    title: "Does HDSL integrate with our existing systems?",
    content: "HDSL exposes documented REST APIs, webhooks, and pre-built connectors for common CRM and ERP platforms. Partner technical teams receive sandbox access and a dedicated integration engineer during onboarding."
  }
];

export default function PartnerClient() {

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
<Link href="/whats-in-it-for/customer" className={`${style.tabBtn} `}> I’m Customer </Link>
<Link href="/whats-in-it-for/partner" className={`${style.tabBtn} ${style.active}`}> I’m Partner </Link>
<Link href="/whats-in-it-for/pilot" className={`${style.tabBtn}`}> I’m Pilot </Link>
<Link href="/whats-in-it-for/field-agent" className={`${style.tabBtn}`}> I’m Field Agent </Link>

    </div>
</section>


{/* trusted section  */}

   <section className={`common_section ${style.trusted_section}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">Recognized Programs</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Plug into India’s most
regulated drone backbone.</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Five ways to grow with HDSL.</h2>
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
