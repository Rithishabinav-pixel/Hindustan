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
    title: "Crop Health Monitoring",
    desc: "Detect early signs of stress, disease, and nutrient deficiency using advanced aerial imaging and data analysis"
  },
  {
    icon: "/images/industries/agriculture/ic2.svg",
    title: "Precision Spray & Spread",
    desc: "Ensure uniform application of fertilisers and crop protection inputs, reducing wastage and improving field effectiveness"
  },
  {
    icon: "/images/industries/agriculture/ic3.svg",
    title: "Field Mapping & Planning",
    desc: "Generate accurate field data to support irrigation planning, crop management, and seasonal decision-making"
  },
  {
    icon: "/images/industries/agriculture/ic4.svg",
    title: "Large-Scale Coverage",
    desc: "Monitor and manage extensive farmland efficiently with drone systems, reducing manual labour and improving operations"
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
    title:"How do drone services improve crop yield?",
    content:"Drone services provide early insights into crop health, enabling timely intervention. This helps optimise input usage, reduce losses, and improve overall productivity across the field."
  },
   {
    title:"Is drone spraying safe for crops and the environment?",
    content:"Yes. Drone spraying ensures controlled and uniform application, eliminating chemical overuse and minimising exposure to soil, water, and nearby areas."
  },
   {
    title:"Can drone services be used for small farms?",
    content:"Yes. Our services can be scaled based on farm size. Individual farmers, FPOs, and cooperatives can all benefit from drone-based operations."
  },
   {
    title:"How quickly can services be deployed on-site?",
    content:"HDSL teams can typically mobilise within 24 to 48 hours, depending on location, ensuring timely support during critical farming periods."
  },
   {
    title:"What kind of data or insights do farmers receive?",
    content:"Farmers receive actionable insights such as crop health indicators, field maps, and growth analysis to support better planning and decision-making."
  }
]


export default function page() {
  return (
   <>

   <Header/>
   
   <section className={style.hero_section} style={{backgroundImage:'url(/images/industries/agriculture/indutries_agriculture_hero.webp)'}}>
    <div className={`container ${style.heroContainer}`}>
          <div className={`topContent ${style.topContent}`}>
      <h1 className={`common_heading black`} data-animate="fade-up" data-animate-delay="100">Smarter Agriculture <br className='desktop_break'/>Through Data and Drones</h1>
       <p data-animate="fade-up" data-animate-delay="100">We leverage advanced drone technology and AI-driven insights to optimise farm operations, monitor crop health, and enhance productivity across every acre, ensuring your farm runs efficiently and sustainably.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn black">
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
      
       <p data-animate="fade-up" data-animate-delay="100">Agriculture operates at scale, but visibility at that scale remains limited. Farmers often rely on manual observation, leading to delayed interventions, uneven application of inputs, and inefficient use of resources.</p>
       <p data-animate="fade-up" data-animate-delay="200">With the added challenges of weather variability, labour constraints, and rising input costs, precision and consistency are more critical than ever. That’s where we come in.
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
      
       <p data-animate="fade-up" data-animate-delay="100">At HDSL, we combine drone technology with advanced analytics to deliver precision, speed, and consistency in agricultural operations.</p>
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
