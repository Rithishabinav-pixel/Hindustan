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
      image:"/images/team1.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
    {
      image:"/images/team2.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
    {
      image:"/images/team3.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
    {
      image:"/images/team1.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
    {
      image:"/images/team2.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
    {
      image:"/images/team3.webp",
      name:"Sanjana Rao",
      position:"Managing Director"
    },
  ]


  

export default function AboutUs() {


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




  return (
    <>
    
      <Header/>


{/* hero section */}

<section className={`common_section innerpage_hero_section `}>


   <div className={`container innerpage_heroContainer `}>


<h1 data-animate="fade-up" data-animate-delay="100" className={`common_heading`}>Engineering The Future Of Aerial Innovation</h1>

<div  className={`topContent topContent_left  innerpage_heroContainer_content`}>

  <p data-animate="fade-up" data-animate-delay="150">Hindustan Drones delivers advanced UAV solutions tailored for industries that demand precision, efficiency, and reliability. From aerial intelligence to drone deployment, we help organizations unlock the full potential of drone technology.</p>

   <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>REACH US</span>
        </Link>
</div>

<div data-animate="fade-up" data-animate-delay="250" className={`innerpage_heroContainer_image ${style.heroContainerImage_container}`}>

<Image src="/images/about_hero.webp" width={1290} height={700} alt="" />

<div className={style.heroContainerImage_content}>
<p className={style.imageContent1}>From sky to insight — delivering intelligent aerial solutions for industries.</p>

<h2 className={style.imageContent2}>Next-generation drone systems engineered for accuracy, reliability, and operational excellence.</h2>


</div>
</div>

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
    modules={[Navigation]}
    navigation={{
      prevEl: ".whyIndustriesSwiper_custom-prev",
      nextEl: ".whyIndustriesSwiper_custom-next",
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
</div>
  </div>
))}

</div>



</div>

</section>




    </>
  )
}
