"use client"
import React, { useEffect, useState } from 'react'
import style from './career.module.css'
import Header from '../components/Header'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Image from 'next/image'




// team card data
const teamsData = [
  {
    title:"AI-powered Systems",
    description:"Our drones combine advanced sensors, autonomous navigation, and AI-powered analytics to capture precise aerial data and deliver actionable insights across complex environments.",
    icon:"/images/ai_powered.svg"
  },
   {
    title:"Seamless Support & Training",
    description:"Beyond deployment, our team provides continuous technical support, pilot guidance, and operational assistance to ensure every drone mission runs smoothly.",
    icon:"/images/seamless.svg"
  },
   {
    title:"Smart Data & Mobile Access",
    description:"Mission data is processed through intelligent analytics and delivered through secure digital platforms, allowing teams to access insights anytime, anywhere.",
    icon:"/images/smart.svg"
  },
   {
    title:"Certified Pilots & Compliance",
    description:"Our nationwide network of certified pilots operates under strict safety and regulatory standards, ensuring reliable and compliant drone operations across industries.",
    icon:"/images/certified.svg"
  },
]

// job data loaded dynamically from backend





export default function page() {

  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    fetch('/api/careers')
      .then((r) => r.json())
      .then((data) => setCareerData(Array.isArray(data) ? data : []))
      .catch(() => setCareerData([]))
  }, [])

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

      el.style.backgroundSize = `${scale}%`;
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

<section className={style.hero_section}>

    <div className={`container ${style.herosection_Container}`}>
         <div className={`topContent ${style.topContent}`}>
    <h1 data-animate="fade-up" className="common_heading">Build Your Future In Drone Innovation</h1>
    <p data-animate="fade-up" data-animate-delay="100">Join a team that is shaping the future of aerial technology and intelligent drone <br className='desktop_break'/>solutions across industries.</p>
     <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>Explore Opportunity </span>
        </Link>
  </div>
 <Image className={`${style.floatingIcon} ${style.floatingIcon1}`} src="/images/career_fi1.svg" width={184} height={184} alt=''/>
 <Image className={`${style.floatingIcon} ${style.floatingIcon2}`} src="/images/career_fi2.svg" width={181} height={181} alt=''/>

  <div className={style.heroImage}>
    <Image src="/images/career_hero_img.webp" width={1290} height={532} alt=''/>
    </div>
    </div>

</section>



<section className={`common_section ${style.careerTechnology_section}`}>

    <div className={`container ${style.careerTechnology_Container}`}>

        <div className={style.careerTechnology_content}>
    <h2 data-animate="fade-up" className="common_heading">Grow Your Career With Emerging Drone Technology</h2>
    <p data-animate="fade-up" data-animate-delay="100">
        At Hindustan Drones, we believe that innovation begins with talented people. Our team is driven by engineers, developers, analysts, and aviation professionals who are passionate about building the next generation of drone technology.<br/><br/>
        Working with us means being part of an environment that encourages creativity, collaboration, and continuous learning. We are constantly exploring new possibilities in UAV systems, AI-powered analytics, and intelligent aerial solutions that help industries operate smarter and safer.
    </p>
        </div>

 <div className={style.careerTechnology_image}>
    {/* <Image src="/images/career_technology_image.svg" width={632} height={560} alt=''/> */}
    <Image src="/images/DroneAnimation.svg" width={632} height={560} alt=''/>


 </div>

    </div>

</section>


   <section className={`common_section parralax_bg  ${style.hindustanTeam_section}`}>
    <div className={`container ${style.hindustanTeamContainer}`}>
      <div className={`topContent topContent_left ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Why Hindustan Drones Lead the Way</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our advanced drone systems, intelligent analytics, and expert support deliver reliable aerial operations that industries depend on for precision.</p>
      </div>


<div className={style.hindustanTeam_section_cards}>
{teamsData.map((card,index)=>(
  <div key={index} {...(!mobile && {"data-animate": "fade-up", "data-animate-delay": index * 100,})}
  className={style.why_choose_card} >
    <Image src={card.icon} alt={card.title} width={80} height={80}/>
    <h3>{card.title}</h3>
    <p>{card.description}</p>
    </div>
))}
</div>

    </div>
   </section>
    

    <section className={`common_section  ${style.careerList_section}`}>
        <div className={`container ${style.careerListContainer}`}>

 <div className={`topContent topContent_left ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Explore Opportunities Across Multiple Roles</h2>
      </div>

      <div className={style.careerTable} data-animate="fade-up" data-animate-delay="100">

        {!mobile && 

<div className={style.tableHead}>
    <div><Image src="/images/job_title.svg" width={32} height={32} alt=''/> Job title</div>
    <div><Image src="/images/location.svg" width={32} height={32} alt=''/> Location</div>
    <div><Image src="/images/experience.svg" width={32} height={32} alt=''/> Experience</div>
    <div><Image src="/images/remuneration.svg" width={32} height={32} alt=''/> Remuneration</div>
    <div></div>
    <div></div>
</div>

        }


{/* career list table */}
<div className={style.tableBody}>
    {careerData.length === 0 ? (
      <div style={{padding:'32px',textAlign:'center',color:'rgba(255,255,255,0.5)',fontSize:'15px'}}>No job listings available at the moment.</div>
    ) : careerData.map((item,index) => (
        <div className={style.tableRow} key={item.id ?? index}>
        <div className={style.tabledata}>{mobile && <Image src="/images/job_title.svg" width={32} height={32} alt=''/>}  {item.jobTitle}</div>
        <div className={style.tabledata}>{mobile && <Image src="/images/location.svg" width={32} height={32} alt=''/> }{item.location}</div>
        <div className={style.tabledata}>{mobile && <Image src="/images/experience.svg" width={32} height={32} alt=''/>} {item.experience}</div>
        <div className={style.tabledata}>{mobile && <Image src="/images/remuneration.svg" width={32} height={32} alt=''/>}{item.remuneration}</div>
            {/* career detail page slug with #apply-now */}
       <Link href={`/career/${item.slug}#apply-now`}>Apply now
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M14.4297 5.92993L20.4997 11.9999L14.4297 18.0699" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.5 12H20.33" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </Link>
      {/* career detail page slug */}
       <Link href={`/career/${item.slug}`}>More Details </Link>

         </div>
    ))}
</div>

 
</div>


        </div>



    </section>
    
    </>
  )
}
