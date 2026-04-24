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
    icon: "/images/industries/agriculture/ic1.svg",
    title: "Real-Time Surveillance",
    desc: "Live aerial feeds with thermal and daylight imaging for continuous operational visibility"
  },
  {
    icon: "/images/industries/agriculture/ic2.svg",
    title: "Crowd Monitoring",
    desc: "AI-assisted density analysis to track movement, improve control, and enable faster decisions"
  },
  {
    icon: "/images/industries/agriculture/ic3.svg",
    title: "Disaster Assessment",
    desc: "Rapid mapping and damage analysis for faster situational awareness and response planning"
  },
  {
    icon: "/images/industries/agriculture/ic4.svg",
    title: "Search and Rescue Support",
    desc: "Locate individuals in difficult terrain and low visibility using thermal imaging and precision navigation"
  },
  {
    icon: "/images/industries/agriculture/ic5.svg",
    title: "Evidence Documentation",
    desc: "Secure, time-stamped aerial footage for investigation, reporting, and post-incident analysis"
  }
];


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
    title: "How are drones used in emergency response?",
    content: "Drones provide real-time aerial visibility, helping teams assess situations quickly and make faster decisions during emergencies."
  },
  {
    title: "Can drones operate in low visibility conditions?",
    content: "Yes. Thermal and night-vision capabilities enable operations in low light, smoke, or difficult weather conditions."
  },
  {
    title: "Are drone operations compliant with regulations?",
    content: "All operations are conducted by DGCA-certified pilots following approved safety and compliance protocols."
  },
  {
    title: "How quickly can drones be deployed during emergencies?",
    content: "Teams can typically mobilise within 24–48 hours, with faster deployment possible for urgent requirements."
  },
  {
    title: "Is the captured data secure?",
    content: "Yes. All data is encrypted and shared only with authorised stakeholders for operational and reporting purposes."
  }
];


export default function page() {
  return (
   <>

   <Header/>
   
   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/public-safety/hero_banner.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading`} data-animate="fade-up" data-animate-delay="100">Strengthening Emergency <br className='desktop_break'/>Response with Aerial Intelligence</h1>
       <p className={style.white} data-animate="fade-up" data-animate-delay="100">With advanced drone systems, we support emergency teams with real-time aerial intelligence, enabling faster assessments, improved coordination, and effective response in high-risk situations.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
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
      
       <p data-animate="fade-up" data-animate-delay="100">Public safety teams operate under pressure, often with limited visibility and time. Ground-based response and fixed surveillance systems cannot always deliver the speed, flexibility, or coverage required during emergencies and large-scale events.</p>
       <p data-animate="fade-up" data-animate-delay="200">In such situations, delayed situational awareness affects response time and coordination, while challenging terrains and low-visibility conditions make accurate assessment even more difficult.
</p>

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

<h2 className={`common_heading`} data-animate="fade-up">How HDSL Helps</h2>

        <div className={`${style.row} ${style.align_center}`}>

        <div className={style.content}>

             <div className={`topContent topContent_left ${style.topContent}`}>
      
       <p data-animate="fade-up" data-animate-delay="100">At HDSL, our drone systems provide real-time visibility and rapid response support, helping emergency teams act with greater speed, clarity, and control in critical situations.</p>
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
