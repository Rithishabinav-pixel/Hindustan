"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Image from 'next/image'
import style from './about.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TeamsPopup from '../components/TeamsPopup'


// why industries cards data 
 const whyIndustriesdata = [
  {
    icon:"/images/about_us_dummy_icon.svg",
    title:"Certified and Compliant Operations",
    description:"Our pilots are DGCA-certified, with every mission fully insured and compliant with regulatory and safety standards."
  },
  {
    icon:"/images/about_us_dummy_icon.svg",
    title:"Intelligence Beyond Visual Data",
    description:"Advanced AI-driven analysis transforms aerial data into actionable insights, enabling smarter decisions across operations."
  },
  {
    icon:"/images/about_us_dummy_icon.svg",
    title:"Rapid Deployment Capability",
    description:"Field teams are mobilised within 24 to 48 hours, ensuring quick response across locations and time-sensitive requirements."
  },
  {
    icon:"/images/about_us_dummy_icon.svg",
    title:"Secure and Reliable Data Handling",
    description:"Encrypted systems and controlled access ensure all operational data remains protected, organised, and accessible when required."
  },
  {
    icon:"/images/about_us_dummy_icon.svg",
    title:"Scalable Nationwide Coverage",
    description:"A strong network across India enables consistent service delivery across diverse terrains, industries, and operational conditions."
  }
]

  // certificate datas

    const certificateDatas = [
  "/images/certificate1.png",
  "/images/certificate2.png",
  "/images/certificate1.png",
  "/images/certificate2.png",
  "/images/certificate1.png",
  "/images/certificate2.png",
    
  ]


  // teams data 
  const teamsData = [
    {
      image:"/images/team1.png",
      name:"Prasad E",
      position:"Director",
      content :"Driven by a deep passion for drones, data, and digital platforms, the Managing Director of Hindustan Drone Services Prasad E brings decades of global experience in building scalable technology ecosystems and leading data-driven transformation initiatives. With a strong foundation across cloud architecture, analytics, and platform engineering, he is focused on harnessing the convergence of aerial systems, AI&ML, and software to solve real-world challenges. His vision for HDSL goes beyond drone operations to creating an intelligent, platform-led ecosystem that empowers Drone related Agritech, Security, Infrastructure, logistics etc., and  enables efficient service delivery, and unlocks new economic opportunities at the grassroots level. Combining expertise in electronics, software, and systems thinking, he is committed to building indigenous, scalable solutions that drive impact, innovation, and inclusive growth across India."
    },
    {
      image:"/images/team2.png",
      name:"Jaya E",
      position:"Director",
      content:"As Executive Director of Hindustan Drone Services, Jaya E brings a strong blend of operational leadership, organizational discipline, and a deep commitment to building scalable, impact-driven enterprises. With a keen focus on execution excellence, she plays a pivotal role in translating HDS’s strategic vision into ground-level reality—driving operations, partnerships, and customer experience across diverse service lines. Her approach emphasizes structured growth, process rigor, and people-centric leadership, ensuring that both customers and field teams operate seamlessly within a rapidly evolving platform ecosystem. Passionate about leveraging technology for real-world impact, she is instrumental in shaping HDSL into a reliable, efficient, and trusted partner for industries and communities alike."
    },
    {
      image:"/images/team3.png",
      name:"Chandra S",
      position:"Non Executive Director",
      content:"Chandra S, Executive Director at Hindustan Drone Services, brings decades of leadership experience in the agrochemicals and agricultural inputs industry, having played a pivotal role in building and scaling BCIL, a globally active crop protection company serving markets across India, Asia, Europe, and beyond. With deep expertise across manufacturing, agri-value chains, and farmer-centric product ecosystems, he offers a strong foundation in understanding crop protection, input distribution, and large-scale operational execution. At HDSL, he leverages this experience to bridge traditional agriculture with next-generation drone and data-driven solutions, enabling more efficient, precise, and sustainable farming practices. His strategic perspective and industry depth play a critical role in shaping HDS’s agricultural offerings, partnerships, and market expansion, positioning the company to deliver meaningful impact across the farming ecosystem."
    }
  ]


  

export default function AboutClient() {



   const [mobile, setMobile] = useState(false);
  
    useEffect(() => {
      const checkScreen = () => {
        setMobile(window.innerWidth < 1200);
      };
      checkScreen(); 
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);


// for parralax
    
    useEffect(() => {
      const elements = document.querySelectorAll(".parralax_bg");
    if(mobile) return
      const handleScroll = () => {
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
    
          // when element enters viewport → rect.top < windowHeight
          // when reaches top → rect.top = 0
    
          const progress = Math.min(
            Math.max((windowHeight - rect.top) / windowHeight, 0),
            1
          );
    
          // 110% → 100%
          const scale = 110 - progress * 10;
    
          el.style.backgroundSize = `${scale}% 100%`;
        });
      };
    
      window.addEventListener("scroll", handleScroll);
      
      handleScroll();
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [mobile]);


   const [profile, setProfile] = useState(false);
const [popupContent, setPopupContent] = useState(null);

const showTeamPopup = (i) => {
  setPopupContent(teamsData[i]);
  setProfile(true);
};

const closePopup = () => {
  setProfile(false);
  setPopupContent(null);
};




  return (
    <>
    
      <Header/>


{/* hero section */}

<section className={`common_section innerpage_hero_section `}>


   <div className={`container innerpage_heroContainer `}>


<h1 data-animate="fade-up" data-animate-delay="100" className={`common_heading`}>Powering Scalable Drone Operations Across Industries</h1>

<div  className={`topContent topContent_left  innerpage_heroContainer_content`}>

  <p data-animate="fade-up" data-animate-delay="150">Hindustan Drone Services Limited (HDSL) is building India’s first horizontal Drone-as-a-Service (DaaS) platform, connecting businesses, operators, fleet capabilities, and aerial intelligence across fourteen industries through a single scalable operational ecosystem.</p>

   <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>REACH US</span>
        </Link>
</div>

<div data-animate="fade-up" data-animate-delay="250" className={`innerpage_heroContainer_image ${style.heroContainerImage_container}`}>

<Image src="/images/about_hero.webp" width={1290} height={700} alt="" />

<div className={style.heroContainerImage_content}>
<p className={style.imageContent1}>Building the digital infrastructure behind modern aerial operations.</p>

<h2 className={style.imageContent2}>As industries move toward technology-enabled operations, our platform combines cloud infrastructure, real-time telemetry, AI-driven job allocation, and mobile-first accessibility to support efficient aerial operations across industries, use cases, and geographies.</h2>


</div>
</div>

   </div>

   </section>

{/* our story section  */}

 <section className={`common_section parralax_bg  ${style.story_section}`}>

<div className={`container ${style.story_container}`}>

<div className={`topContent ${style.story_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>The Operational Backbone of India’s Drone Economy</h2>

  <p data-animate="fade-up" data-animate-delay="150">While most drone companies in India focus on a single vertical, HDSL takes a fundamentally different approach by building a connected platform that aggregates demand, operators, fleet networks, and aerial intelligence across multiple industries, including agriculture, infrastructure, logistics, public safety, inspection, mapping, media, energy, and high-rise operations.<br/><br/>
As enterprise adoption accelerates and industries move from pilot projects to large-scale deployment, HDSL is building the operational and technology infrastructure required to support long-term drone adoption across India. 
Backed by technologists, aviation specialists, agri-tech experts, and enterprise platform experience, our mission is to make drone operations as accessible and indispensable for Indian businesses as smartphones and cloud computing.
</p>
  
</div>

{mobile && (
  <Image className={style.storyImg} src="/images/story-mobile.webp" height={609} width={700} alt='our-story'/>
)}

</div>

 </section>


   {/* mission vision section */}
    <section className={`common_section ${style.missionVision_section}`}>
<div className={`container ${style.missionVision_container} `}>

<div  className={`topContent topContent_left `}>
 <h2 data-animate="fade-up" data-animate-delay="100" className={`common_heading`}>Our Vision & Mission For Innovation</h2>
</div>

<div className={`${style.missionVision_content}`}>

  <div data-animate="fade-up" data-animate-delay="100" className={`${style.missionVision_contentImage}`}>
    <Image src="/images/mision_vision_vector.svg" width={736} height={455} alt=''/>
  </div>

    <div data-animate="fade-up" data-animate-delay="200" className={`${style.missionVision_contentText}`}>
    <h3>Vision</h3>
    <p>To be India’s most trusted, technology-led aerial intelligence partner, empowering every industry with the transformative potential of drones and AI by 2030.</p>
  </div>

   <div data-animate="fade-up" data-animate-delay="300" className={`${style.missionVision_contentText}`}>
    <h3>Mission</h3>
    <p>To make advanced, AI-powered drone technology accessible, affordable, and impactful across India, driving efficiency, safety, and sustainable growth across every sector we serve.</p>
  </div>

</div>

</div>

    </section>


{/* why industries section */}
 <section className={`common_section parralax_bg  ${style.whyIndustries_section}`}>

<div className={`container ${style.whyIndustries_container}`}>

<div className={`topContent topContent_left ${style.whyIndustries_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Why Industries Trust Hindustan Drone Services</h2>

  <p data-animate="fade-up" data-animate-delay="150">Built on safety, expertise, and scale, we deliver dependable aerial solutions tailored to real operational demands.</p>
  
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

</div>

 <div className={`slider_nav`}>
  <div className={`whyIndustriesSwiper_custom-prev custom_slider_btn custom_slider_btn `}>
    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/>
  </div>
  <div className={`whyIndustriesSwiper_custom-next custom_slider_btn `}>
    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt=""/>
  </div>
  </div>

</div>

 </section>


   <section className={`common_section light_section no_padding_bottom  ${style.steps_section}`}>
<div className={`container  ${style.stepsContainer}`}>

  <div className={`topContent ${style.topContent} `}>
    <h2 data-animate="fade-up" className="common_heading">Get Drone Services in <br className='desktop_break'/>4 Simple Steps</h2>
    <p data-animate="fade-up" data-animate-delay="100">Connect with verified drone operators through a clear and efficient four-step process.</p>
  </div>


<div className={style.stepContainer}>
  {mobile &&  <Image className={style.step_mobileImg} src="/images/step-img-mobile.svg" width={735} height={1100} alt=''/>}

  {!mobile && 
  <>
  <div className={style.step_img}>
    <Image src="/images/step-info-img.svg" width={537} height={540} alt=''/>
  </div>

<div className={`${style.stepContent} ${style.stepContent1}`}>
  <h3>Raise a request</h3>
  <p>Tell us what you need and where.</p>
</div>

<div className={`${style.stepContent} ${style.stepContent2}`}>
  <h3>Get matched</h3>
  <p>We connect you with a verified drone operator.</p>
</div>

<div className={`${style.stepContent} ${style.stepContent3}`}>
  <h3>Job execution</h3>
  <p>The service is carried out on-site.</p>
</div>

<div className={`${style.stepContent} ${style.stepContent4}`}>
  <h3>Delivery & review</h3>
  <p>Receive output and rate the service.</p>
</div>
</>
  }

  

</div>




</div>

   </section>



{/* certified section */}
 <section className={`common_section no_padding_bottom  ${style.certified_section}`}>
<div className={`container  ${style.certifiedContainer}`}>

  <div className={`topContent ${style.topContent} `}>
    <h2 data-animate="fade-up" className="common_heading">Certified Drone Systems <br className='desktop_break'/>Built for Safe and Compliance</h2>
    <p data-animate="fade-up" data-animate-delay="100">All our operations are carried out by DGCA-certified pilots and supported by active liability insurance. With strict adherence to regulatory standards and safety protocols, we ensure reliable, compliant, and risk-managed execution across every project.</p>
  </div>

 <div className={style.certified_slider}>

{/* ======================================= */}
<>

  <Swiper
    modules={[Navigation,Autoplay]}
    navigation={{
      prevEl: ".certifiedSwiper_custom-prev",
      nextEl: ".certifiedSwiper_custom-next",
    }}
    slidesPerView={2}
    loop={true}
    autoplay={{
        delay: 2500, 
        pauseOnMouseEnter: true, 
      }}
    spaceBetween={0}
    breakpoints={{
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    }}
    className="certifiedSwiper"
  >
    {certificateDatas.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={style.whyIndustriesCard}>
          <div className={style.whyIndustriesCard_img}>
          <Image src={item} alt="" width={180} height={45}  />
          </div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

 
  
</>
{/* ==================================== */}

</div>

{mobile && 
<Image className={style.certified_section_Mobileimage} src="/images/certified_bg_m.webp" width={700} height={286} alt="" />
}


</div>

   </section>

   {/* steps section  */}

 


{/* team section */}

<section className={`common_section  ${style.team_section}`}>

<div className={`container ${style.teamContainer}`}>

    <div className={`topContent topContent_left ${style.teamContainer_topContent} `}>
    <h2 data-animate="fade-up" className="common_heading">Leadership That Shapes Vision and Promotes Growth</h2>
    <p data-animate="fade-up" data-animate-delay="100">Our leadership team brings together deep industry experience, operational expertise, and a clear understanding of real-world challenges. With a focus on building reliable systems and scalable solutions, our leaders steer the organisation with clarity, ensuring every engagement reflects consistency, accountability, and long-term value.</p>
  </div>


<div className={style.teamscards}>

{teamsData.map((team, index) => (
  <div className={style.teamcard} key={index} data-animate="fade-up" data-animate-delay={100*index}>
    <div className={style.teamImage}>
      <Image src={team.image} height={300} width={375} alt=''/>
      </div>
<div className={style.teamContent}>
      <h3>{team.name}</h3>
      <p>{team.position}</p>
      <button className={style.showProfile} onClick={()=>showTeamPopup(index)}> <Image src="/images/menu_arrow.svg" width={24} height={24} alt='' /></button>
</div>
  </div>
))}

</div>



</div>

</section>

{profile && popupContent && (
  <TeamsPopup
    profile={popupContent}
    onClose={closePopup}
  />
)}

    </>
  )
}
