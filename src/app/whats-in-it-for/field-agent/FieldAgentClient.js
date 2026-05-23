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
 gsap.registerPlugin(ScrollTrigger, useGSAP);
}


// operating cards data 
const operatingCardsData = [
  {
    image: "/images/feild_operating1.png",
    title: "HDSL Field Agent Mobile App",
    description:
      "Your complete operating system for the day. Customer outreach, KYC, site survey, pilot dispatch, customer handover, and payment collection in one offline-first Android app.",
    points: [
      "Lead capture with photo, voice, and GPS",
      "Aadhaar-backed customer onboarding in under three minutes",
      "Offline mode for low-connectivity rural areas",
      "Daily activity dashboard with auto-generated agent diary",
    ],
  },
  {
    image: "/images/feild_operating2.png",
    title: "Customer Onboarding and KYC",
    description:
      "Convert a farm visit or factory walk-through into a fully onboarded HDSL customer in a single session, with full regulatory KYC completed on the spot.",
    points: [
      "Surepass-powered Aadhaar, PAN, and GSTIN verification",
      "Bank account validation through penny-drop",
      "Digital signature capture for service agreements",
      "Auto-generation of customer welcome kit",
    ],
  },
  {
    image: "/images/feild_operating3.png",
    title: "Site Survey and Mission Scoping",
    description:
      "Walk a site, drop pins, capture obstructions, and produce a mission-ready scope document — without leaving the app or carrying paper.",
    points: [
      "GPS-tagged photo capture with timestamping",
      "Obstruction and hazard checklist",
      "AOI drawing and area calculation",
      "Indicative quote generation for instant customer sign-off",
    ],
  },
  {
    image: "/images/feild_operating4.png",
    title: "Pilot Dispatch and Coordination",
    description:
      "Find the right pilot, on the right day, with the right equipment. Coordinate logistics, check in arrivals, and own the customer handover from start to finish.",
    points: [
      "Real-time pilot availability and ETA tracking",
      "Day-of-mission check-in and equipment verification",
      "Customer briefing and on-site walk-through prompts",
      "Post-mission feedback capture before pilot departure",
    ],
  },
  {
    image: "/images/feild_operating5.png",
    title: "Earnings, Commissions, and Career Growth",
    description:
      "See exactly how you earn, where you can grow, and what comes next. Every rupee tracked, every promotion criterion visible, every leaderboard transparent.",
    points: [
      "Per-onboarding, per-mission, and recurring commissions",
      "Weekly payouts directly to your verified bank account",
      "Live performance dashboard against district peers",
      "Clear progression path to district lead and regional roles",
    ],
  },
];

// why industries cards data 
const whyIndustriesdata = [
  {
    icon:"/images/feild_ic1.svg",
    title:"Three income streams from one role",
    description:"Earn on every customer you onboard, every mission they commission afterwards, and every pilot you coordinate. Compounding, not commission-only."
  },
  {
    icon:"/images/feild_ic2.svg",
    title:"Onboard a farmer in under three minutes",
    description:"Aadhaar-backed KYC, GSTIN check, bank validation, digital signature — all on your phone, all offline-capable for rural network coverage."
  },
  {
    icon:"/images/feild_ic3.svg",
    title:"Tools that work where you do",
    description:"Offline-first Android app for site survey, AOI capture, pilot dispatch, and handover. Built for the field, not for the boardroom."
  },
  {
    icon:"/images/feild_ic4.svg",
    title:"A real career path, not gig work",
    description:"Agent → District Lead → Regional Coordinator → equity-linked roles in HDSL's expansion program. Top performers grow with the company."
  }
]



// trusted cards data 
const trustedCardsData = [
  {
    image:"/images/field_trusted_img1.svg",
    text: "KYC Verified"
  },
  {
    image:"/images/field_trusted_img2.svg",
    text: "Aadhaar Backed"
  },
  {
    image:"/images/field_trusted_img3.svg",
    text: "Skill India"
  },
  {
    image:"/images/field_trusted_img4.svg",
    text: "Surepass KYC"
  },
  {
    image:"/images/field_trusted_img5.svg",
    text: "Mission Insured"
  },
  {
    image:"/images/field_trusted_img6.svg",
    text: "GST Ready"
  },
]


// faq's data

const faqData = [
  {
    title: "What does a HDSL Field Agent actually do?",
    content: "Field Agents are HDSL's on-ground representatives. You identify and onboard customers (typically farmers, contractors, or local businesses), complete their KYC, survey their sites, coordinate the assigned pilot on mission day, and complete the customer handover. You are the trusted local face of HDSL."
  },
  {
    title: "Do I need any technical skills or aviation background?",
    content: "No aviation background is required. You need a smartphone, an Aadhaar card, a bank account, basic local-language fluency, and the ability to engage customers professionally. HDSL provides full training on the app, KYC process, site survey, and customer-handling protocols."
  },
  {
    title: "How do agents earn?",
    content: "Field Agents earn through three streams: a one-time commission for every new customer onboarded, an ongoing percentage on every mission that customer commissions, and a coordination fee for every mission you actively dispatch. Weekly payouts reach your verified bank account every Friday."
  },
  {
    title: "What are the working hours and is it full-time?",
    content: "The role is flexible. Many agents work part-time alongside another livelihood, while top performers operate it as a full-time district business. HDSL does not impose fixed hours, but does track minimum monthly activity to maintain active status."
  },
  {
    title: "How does HDSL protect agents in the field?",
    content: "Every active agent is identity-verified, GST-registered where applicable, and covered by HDSL's field-work insurance for on-site coordination duties. A 24×7 agent success line is available for escalations, and a clear code of conduct protects both agents and customers."
  },
  {
    title: "What is the career path?",
    content: "Field Agents progress to District Leads (managing 10 to 20 agents), then to Regional Coordinators (overseeing multiple districts and managing P&L), and ultimately into HDSL's regional expansion roles with equity participation for top performers."
  }
];

export default function FieldAgentClient() {

const operatingCards = useRef(null);
const operatingTitle = useRef(null);

useGSAP(() => {

  const laptop = window.innerWidth < 1400;

  if (window.innerWidth < 1200) return;

  const cards =
    operatingCards.current.querySelectorAll(`.${style.card}`);

  const lastCard = cards[cards.length - 1];

  cards.forEach((card, index) => {

    if (index === 0) {

      ScrollTrigger.create({
        trigger: operatingTitle.current,
        start: `top ${laptop ? "80px" : "120px"}`,
        endTrigger: lastCard,
        end: `top ${
          (laptop ? 176 : 272) +
          ((cards.length - 1) * 20)
        }px`,
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
      start: `top ${
        (laptop ? 176 : 272) + (index * 20)
      }px`,
      endTrigger: lastCard,
      end: `top ${
        (laptop ? 176 : 272) +
        ((cards.length - 1) * 20)
      }px`,
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      fastScrollEnd: true,

      onUpdate: (self) => {

        cards.forEach((prevCard, prevIndex) => {

          if (prevIndex < index) {

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

  return () => {
    ScrollTrigger.getAll().forEach((trigger) =>
      trigger.kill()
    );
  };

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
<Link href="/whats-in-it-for/partner" className={`${style.tabBtn}`}> I’m Partner </Link>
<Link href="/whats-in-it-for/pilot" className={`${style.tabBtn}`}> I’m Pilot </Link>
<Link href="/whats-in-it-for/field-agent" className={`${style.tabBtn} ${style.active}`}> I’m Field Agent </Link>

    </div>
</section>


{/* trusted section  */}

   <section className={`common_section ${style.trusted_section}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">Agent Network Standards</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Be the trusted face
of HDSL in your district.</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>A complete operating system for the field.
</h2>
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
