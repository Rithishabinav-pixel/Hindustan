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
    title: "Training Programmes",
    desc: "We deliver an industry-aligned curriculum that equips students with practical knowledge across drone operations, data handling, and real-world applications."
  },
  {
    icon: "/images/industries/agriculture/ic2.svg",
    title: "Lab Setup Support",
    desc: "We assist in setting up drone labs with the required equipment, simulators, and infrastructure for hands-on learning."
  },
  {
    icon: "/images/industries/agriculture/ic3.svg",
    title: "Certification Pathways",
    desc: "We enable DGCA-aligned training frameworks, supporting students in gaining recognised certifications."
  },
  {
    icon: "/images/industries/agriculture/ic4.svg",
    title: "Faculty Development",
    desc: "We train educators to deliver drone programmes effectively, ensuring consistency and quality in learning outcomes."
  },
  {
    icon: "/images/industries/agriculture/ic5.svg",
    title: "Research Collaboration",
    desc: "We provide access to data, tools, and domain expertise to support academic research and innovation initiatives."
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
    title: "Do institutions need prior experience to offer drone programmes?",
    content: "No. We support institutions from setup to execution, including curriculum, infrastructure, and training."
  },
  {
    title: "Are the programmes aligned with industry requirements?",
    content: "Yes. Our programmes are designed to reflect current industry practices and evolving application areas."
  },
  {
    title: "Do students receive certification?",
    content: "Yes. Students can pursue DGCA-aligned certifications based on the programme structure."
  },
  {
    title: "What infrastructure is required to start a drone lab?",
    content: "We provide guidance and support for setting up labs, including drones, simulators, and training systems."
  },
  {
    title: "Can programmes be customised for institutions?",
    content: "Yes. We offer flexible programme structures tailored to institutional goals and student requirements."
  }
];

export default function page() {
  return (
   <>

   <Header/>
   
   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/education/hero_banner.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading`} data-animate="fade-up" data-animate-delay="100">Building the Next <br className='desktop_break'/>Generation of Drone Professionals</h1>
       <p data-animate="fade-up" className={style.white} data-animate-delay="100">We partner with institutions to build structured drone education programmes, enabling hands-on learning, research, and industry-aligned skill development for the next generation of professionals.</p>
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
      
       <p data-animate="fade-up" data-animate-delay="100">The rapid growth of the drone industry has created demand for skilled professionals across sectors. However, many institutions lack structured programmes, access to real-world applications, and alignment with regulatory requirements.</p>
       <p data-animate="fade-up" data-animate-delay="200">Without practical exposure and industry integration, it becomes difficult to prepare students for evolving career opportunities in drone technology.</p>

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
      
       <p data-animate="fade-up" data-animate-delay="100">At HDSL, we work closely with institutions to design and implement comprehensive drone education ecosystems that combine theory, practice, and industry relevance.</p>
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
