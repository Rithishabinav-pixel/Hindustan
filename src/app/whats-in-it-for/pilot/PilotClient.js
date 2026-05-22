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
    image: "/images/pilot_operating1.png",
    title: "HDSL Pilot Mobile App",
    description:
      "The full pilot operating system on Android. Receive missions, accept jobs, run pre-flight checks, fly, upload data, and get paid — all from one app.",
    points: [
      "Mission inbox with smart matching to your skills and location",
      "One-tap accept, decline, or counter-propose",
      "Pre-flight checklist with photo evidence capture",
      "Auto-upload of flight logs and raw data over LTE or Wi-Fi",
    ],
  },
  {
    image: "/images/pilot_operating2.png",
    title: "NPNT-Compliant Flight Planner",
    description:
      "Plan missions inside the regulatory perimeter, with confidence. The planner pre-validates against DGCA Digital Sky before you ever take off.",
    points: [
      "Auto-fetch of permission artefacts (Green/Yellow/Red zones)",
      "Conflict warnings for nearby NOTAMs and TFRs",
      "Cryptographically signed flight logs for every mission",
      "Offline planning with sync-on-network capability",
    ],
  },
  {
    image: "/images/pilot_operating3.png",
    title: "Earnings and Payouts Dashboard",
    description:
      "Every rupee, every mission, every deduction — visible, explainable, and exportable for your tax filings.",
    points: [
      "Live earnings tracker with monthly trend view",
      "GST-compliant invoice auto-generation",
      "Equipment EMI tracking for HDSL-financed assets",
      "Year-end tax summary downloadable from the app",
    ],
  },
  {
    image: "/images/pilot_operating4.png",
    title: "Skill, Tier, and Certification Hub",
    description:
      "Your professional identity, built and tracked over time. Earn endorsements, complete advanced courses, and unlock higher-tier missions.",
    points: [
      "RPC verification and renewal reminders",
      "Vertical-specific certifications (agri, mining, infra, environment)",
      "Mission ratings and customer endorsements visible to you",
      "Pathway to instructor and lead-pilot status",
    ],
  },
  {
    image: "/images/pilot_operating5.png",
    title: "Pilot Community and Support",
    description:
      "You are joining a network, not a job. Connect with peers, get help fast, and influence how HDSL evolves the pilot experience.",
    points: [
      "24×7 pilot success line for in-field escalations",
      "Regional pilot meetups and skill exchanges",
      "Equipment marketplace with HDSL-negotiated pricing",
      "Pilot council with elected representation",
    ],
  },
];

// why industries cards data 
const whyIndustriesdata = [
  {
    icon:"/images/pilot_ic1.svg",
    title:"Steady enterprise missions, not WhatsApp gigs",
    description:"HDSL contracts with national clients mean predictable mission volume planned weeks in advance. You stop selling; you start flying."
  },
  {
    icon:"/images/pilot_ic2.svg",
    title:"Money in your account in T+2, every time",
    description:"See payout before you accept. GST invoices auto-generated. No more chasing payment. Equipment EMIs deducted automatically when applicable."
  },
  {
    icon:"/images/pilot_ic3.svg",
    title:"Insurance and equipment, sorted",
    description:"Every accepted mission carries third-party liability, equipment damage, and personal accident cover. Qualifying pilots access drone financing."
  },
  {
    icon:"/images/pilot_ic4.svg",
    title:"Real progression: Bronze → Silver → Gold",
    description:"Higher tiers see missions first, get priority dispatch on premium accounts, faster payouts, and a path to instructor and lead-pilot status."
  }
]



// trusted cards data 
const trustedCardsData = [
  {
    image:"/images/pilot_trusted_img1.svg",
    text: "DGCA RPC Certified"
  },
  {
    image:"/images/pilot_trusted_img2.svg",
    text: "NPNT Certified"
  },
  {
    image:"/images/pilot_trusted_img3.svg",
    text: "Insurance Backed"
  },
  {
    image:"/images/pilot_trusted_img4.svg",
    text: "GST Compliant"
  },
  {
    image:"/images/pilot_trusted_img5.svg",
    text: "Skill Verified"
  },
  {
    image:"/images/pilot_trusted_img6.svg",
    text: "Mission Insured"
  },
]

// faq's data

const faqData = [
  {
    title: "What do I need to join the HDSL pilot network?",
    content: "A valid DGCA Remote Pilot Certificate (RPC), a working drone (Small or Medium category for most missions), Aadhaar-based KYC, an active bank account, and a smartphone capable of running the HDSL Pilot app. HDSL provides drones through financing for qualifying Silver and Gold tier pilots."
  },
  {
    title: "Do I need to own my own drone?",
    content: "Not necessarily. HDSL operates a Drone Financing Program where qualifying pilots can access certified equipment on EMI, with monthly deductions made directly from mission earnings. Bring-your-own-drone pilots receive higher per-mission economics."
  },
  {
    title: "How are missions assigned?",
    content: "Missions are matched based on your location, certification, equipment, tier, customer rating, and availability. Higher-tier pilots see missions first and receive priority for high-value, recurring enterprise accounts."
  },
  {
    title: "How and when do I get paid?",
    content: "Payouts are processed T+2 working days after mission acceptance by the customer. Every payout includes a GST-compliant invoice generated automatically, and you can export year-end tax summaries directly from the app."
  },
  {
    title: "What if something goes wrong during a mission?",
    content: "Every accepted mission is covered by third-party liability insurance, equipment damage cover, and personal accident cover. Incidents are reported through the app and a pilot success team member is assigned within minutes."
  },
  {
    title: "Can I take a break from missions and come back later?",
    content: "Yes. Pilots can pause mission acceptance at any time. Tier status is preserved for 90 days during a pause, after which you return at the next-lower tier and can re-earn your original status through performance."
  }
];

export default function PilotClient() {

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
<Link href="/whats-in-it-for/partner" className={`${style.tabBtn}`}> I’m Partner </Link>
<Link href="/whats-in-it-for/pilot" className={`${style.tabBtn} ${style.active}`}> I’m Pilot </Link>
<Link href="/whats-in-it-for/field-agent" className={`${style.tabBtn}`}> I’m Field Agent </Link>

    </div>
</section>


{/* trusted section  */}

   <section className={`common_section ${style.trusted_section}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">Pilot Network Credentials</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Fly more.
Earn more. Build a career.</h2>
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
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>The full Pilot Operating System, on your phone.</h2>
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
