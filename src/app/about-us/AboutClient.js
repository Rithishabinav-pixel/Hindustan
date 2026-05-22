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
      title:"Industry-Focused Drone Solutions",
      description:"We understand the unique challenges of different industries and provide drone systems tailored to specific operational needs."
    },
     {
      icon:"/images/about_us_dummy_icon.svg",
      title:"Advanced Technology Integration",
      description:"Our drones leverage modern technologies including AI analytics, precision sensors, and intelligent flight systems."
    },
     {
      icon:"/images/about_us_dummy_icon.svg",
      title:"End-To-End Drone Support",
      description:"From consultation and deployment to training and maintenance, we provide complete support for your drone ecosystem."
    },
     {
      icon:"/images/about_us_dummy_icon.svg",
      title:"Reliable Performance In Real Environments",
      description:"Our solutions are designed to operate efficiently across challenging terrains, industrial sites, and large operational areas."
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
      position:"Managing Director",
      content :"Driven by a deep passion for drones, data, and digital platforms, the Managing Director of Hindustan Drone Services Prasad E brings decades of global experience in building scalable technology ecosystems and leading data-driven transformation initiatives. With a strong foundation across cloud architecture, analytics, and platform engineering, he is focused on harnessing the convergence of aerial systems, AI&ML, and software to solve real-world challenges. His vision for HDSL goes beyond drone operations to creating an intelligent, platform-led ecosystem that empowers Drone related Agritech, Security, Infrastructure, logistics etc., and  enables efficient service delivery, and unlocks new economic opportunities at the grassroots level. Combining expertise in electronics, software, and systems thinking, he is committed to building indigenous, scalable solutions that drive impact, innovation, and inclusive growth across India."
    },
    {
      image:"/images/team2.png",
      name:"Jaya E",
      position:"Executive Director",
      content:"As Executive Director of Hindustan Drone Services, Jaya E brings a strong blend of operational leadership, organizational discipline, and a deep commitment to building scalable, impact-driven enterprises. With a keen focus on execution excellence, she plays a pivotal role in translating HDS’s strategic vision into ground-level reality—driving operations, partnerships, and customer experience across diverse service lines. Her approach emphasizes structured growth, process rigor, and people-centric leadership, ensuring that both customers and field teams operate seamlessly within a rapidly evolving platform ecosystem. Passionate about leveraging technology for real-world impact, she is instrumental in shaping HDSL into a reliable, efficient, and trusted partner for industries and communities alike."
    },
    {
      image:"/images/team3.png",
      name:"Chandra S",
      position:"Executive Director",
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

  <p data-animate="fade-up" data-animate-delay="150">At Hindustan Drone Services Limited (HDSL), we are building a technology-driven Drone-as-a-Service (DaaS) platform serving fourteen industries, including agriculture, infrastructure, logistics, security, inspection, and media.</p>

   <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>REACH US</span>
        </Link>
</div>

<div data-animate="fade-up" data-animate-delay="250" className={`innerpage_heroContainer_image ${style.heroContainerImage_container}`}>

<Image src="/images/about_hero.webp" width={1290} height={700} alt="" />

<div className={style.heroContainerImage_content}>
<p className={style.imageContent1}>Building the digital infrastructure behind modern aerial operations.</p>

<h2 className={style.imageContent2}>As industries move toward technology-enabled operations, we are creating a connected ecosystem powered by cloud infrastructure, real-time telemetry, AI-driven job allocation, and a mobile-first platform designed to support seamless aerial operations across industries, use cases, and geographies.</h2>


</div>
</div>

   </div>

   </section>

{/* our story section  */}

 <section className={`common_section parralax_bg  ${style.story_section}`}>

<div className={`container ${style.story_container}`}>

<div className={`topContent ${style.story_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Building the Infrastructure for India’s Drone Economy</h2>

  <p data-animate="fade-up" data-animate-delay="150">Backed by experienced technologists, aviation specialists, and enterprise-focused leadership, we are building scalable systems that make drone operations more accessible, efficient, and dependable for modern industries. Our mission is to make drone technology as accessible and operationally essential for enterprises as smartphones and cloud computing are today.</p>
  
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
    <p>To become a trusted leader in drone technology by enabling industries with intelligent aerial solutions that improve efficiency, safety, and operational capabilities.</p>
  </div>

   <div data-animate="fade-up" data-animate-delay="300" className={`${style.missionVision_contentText}`}>
    <h3>Mission</h3>
    <p>Our mission is to provide reliable and advanced drone solutions that empower businesses with better insights, smarter operations, and scalable aerial technologies for real-world challenges.</p>
  </div>

</div>

</div>

    </section>


{/* why industries section */}
 <section className={`common_section parralax_bg  ${style.whyIndustries_section}`}>

<div className={`container ${style.whyIndustries_container}`}>

<div className={`topContent topContent_left ${style.whyIndustries_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading ${style.whyIndustries_title}`}>Why Industries Trust Hindustan Drones</h2>

  <p data-animate="fade-up" data-animate-delay="150">We combine advanced drone technology with industry expertise to deliver reliable and efficient aerial solutions.</p>
  
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


{/* certified section */}
 <section className={`common_section no_padding_bottom  ${style.certified_section}`}>
<div className={`container  ${style.certifiedContainer}`}>

  <div className={`topContent ${style.topContent} `}>
    <h2 data-animate="fade-up" className="common_heading">Certified Drone Systems <br className='desktop_break'/>Built For Compliance</h2>
    <p data-animate="fade-up" data-animate-delay="100">Hindustan Drones adheres to strict industry standards to ensure safety, reliability, and regulatory compliance. Our drone solutions follow approved operational frameworks and technology standards that meet the requirements of modern </p>
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


{/* team section */}
<section className={`common_section  ${style.team_section}`}>

<div className={`container ${style.teamContainer}`}>

    <div className={`topContent topContent_left ${style.teamContainer_topContent} `}>
    <h2 data-animate="fade-up" className="common_heading">Leadership Driving Innovation And Growth</h2>
    <p data-animate="fade-up" data-animate-delay="100">Our leadership team brings together expertise from technology, engineering, aviation, and industry operations. With a shared commitment to innovation and excellence, the team drives the strategic vision of Hindustan Drones while ensuring that our solutions continue to evolve with the needs of modern industries.</p>
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
