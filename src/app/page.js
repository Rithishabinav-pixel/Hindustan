"use client";

import Link from "next/link";
import Header from "./components/Header";
import style from './page.module.css'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Counter from "./components/counter";


export default function Home() {

  const statsRef = useRef(null);
const [startCount, setStartCount] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCount(true);
        observer.disconnect(); // run only once
      }
    },
    { threshold: 0.3 }
  );

  if (statsRef.current) observer.observe(statsRef.current);

  return () => observer.disconnect();
}, []);
  return (
   <>

   <main className={style.main}>

   {/* banner section */}

<section className={`common_section ${style.full_height_section} ${style.banner_section}`}>
   <Header/>


   <div className={style.banner_video_container}>
 <video width="1920" height="1029" loop muted autoPlay preload="none" playsInline className={style.video}>
      <source src="/images/hp_hero_banner.mp4" type="video/mp4" />
     
      Your browser does not support the video tag.
    </video>
   </div>

   <div className={`container ${style.bannerContent_container}`}>

   <div className={style.bannerContent}>
    <p className={style.bannerContent_text}>Engineered with advanced sensors and AI analytics, our drone systems deliver real-time aerial intelligence for complex operations.</p>
    <Link href="#" className="common_btn">
         <Image className="fan" src="/images/btn_fan.svg" alt="" width={32} height={32}/>
         <span> KNOW MORE</span>
        </Link>
   </div>

   </div>

   

   </section>

   {/* New Standard Section */}
   <section className={`common_section ${style.full_height_section} ${style.standard_section}`}>
<div className="container">

  <div className={style.topContent}>
    <h2 className="common_heading">A New Standard in Aerial Intelligence</h2>
    <p>Our growing mission footprint reflects the scale and reliability behind every aerial intelligence.</p>
     <Link href="#" className="common_btn">
         <Image className="fan" src="/images/btn_fan.svg" alt="" width={32} height={32}/>
         <span>KNOW MORE</span>
        </Link>
  </div>


<div className={style.stats} ref={statsRef}>
  <div className={style.stat_card}>
  <h3 className="common_heading">
    <Counter end={120} suffix="+" start={startCount} />
  </h3>
  <p>Successful Drone Missions Delivered</p>
</div>

<div className={style.stat_card}>
  <h3 className="common_heading">
    <Counter end={20} suffix="+" start={startCount} />
  </h3>
  <p>Industries Served with Aerial Intelligence</p>
</div>

<div className={style.stat_card}>
  <h3 className="common_heading">
    <Counter end={98} suffix="%" start={startCount} />
  </h3>
  <p>Successful Mission Completion Rate</p>
</div>

<div className={style.stat_card}>
  <h3 className="common_heading">
    <Counter end={1200} suffix="+" start={startCount} />
  </h3>
  <p>Total Flight Hours Logged</p>
</div>

</div>

</div>

   </section>

   


</main>
   </>
  );
}
