"use client"
import React, { useEffect, useState } from 'react'
import style from "../product.module.css"
import Header from '@/app/components/Header'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import productData from '@/app/data/productsData'

  // technial specification cards data
const technicalSpecification = [
  {
    icon:"/images/products/agriflow-hds40/propeller.svg",
    title:"High Payload Capability",
    description:"Supports up to 30 kg load with 37L capacity"
  },
  {
    icon:"/images/products/agriflow-hds40/fibre.svg",
    title:"Advanced RTK Positioning",
    description:"Centimetre-level accuracy for precise navigation"
  },
  {
    icon:"/images/products/agriflow-hds40/antena.svg",
    title:"Obstacle Avoidance System",
    description:"Front and rear millimetre-wave radar for safer flights"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Extended Flight Performance",
    description:"Stable flight with up to 21 minutes endurance (no load)"
  },
  {
    icon:"/images/products/agriflow-hds40/remote.svg",
    title:"Folding Frame Design",
    description:"Compact transport and quick deployment"
  }
]


const serviceData = [
  {
    id: 1,
    className: `${style.topLeft}`,
    img: "/images/products/cargolift-hds20a/last-mile-hub-connectivity.png",
    width: 410,
    height: 441,
    title: "Last-Mile Hub Connectivity",
    desc: "We bridge the gap between distribution hubs and final destinations, ensuring faster deliveries and reducing reliance on road transport for time-sensitive logistics operations."
  },
  {
    id: 2,
    className: `${style.bottomTop}`,
    img: "/images/products/cargolift-hds20a/remote-site-supply.png",
    width: 410,
    height: 441,
    title: "Remote Site Supply",
    desc: "Our drones deliver essential materials to hard-to-access locations, such as rural areas, construction sites, and isolated facilities, ensuring continuous operations even in remote areas."
  },
  {
    id: 3,
    className: `${style.bottomTop}`,
    img: "/images/products/cargolift-hds20a/cold-chain-delivery.png",
    width: 410,
    height: 441,
    title: "Cold Chain Delivery",
    desc: "We support temperature-sensitive transport, ensuring that critical medical or perishable supplies reach their destination without compromising on quality or integrity."
  },
  {
    id: 4,
    className: `${style.bottomLeft}`,
    img: "/images/products/cargolift-hds20a/emergency-aed-delivery.png",
    width: 630,
    height: 441,
    title: "Emergency AED Delivery",
    desc: "We enable rapid deployment of life-saving equipment, such as automated external defibrillators (AEDs), reducing response times and increasing survival chances during emergencies."
  },
  {
    id: 5,
    className: `${style.topLeft}`,
    img: "/images/products/cargolift-hds20a/inter-hospital-transport.png",
    width: 630,
    height: 441,
    title: "Inter-Hospital Transport",
    desc: "Our drones facilitate the quick transfer of medical supplies, samples, and critical equipment between hospitals, improving the efficiency of time-sensitive healthcare operations."
  }
];

export default function CargoliftHds20aClient() {

  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;

      if (width < 767) {
        setDevice("mobile");
      } else if (width < 1200) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  const tech_bgImage =
    device === "mobile"
      ? "/images/products/cargolift-hds20a/specs_bg_m.webp"
      : device === "tablet"
      ? "/images/products/cargolift-hds20a/specs_bg_t.webp"
      : "/images/products/cargolift-hds20a/specs_bg.webp";

  return (
   <>

   <Header/>

   {/* hero content section */}

   <section className={`common_section innerpage_hero_section ${style.productHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>

<div  className={`topContent  innerpage_heroContainer_content ${style.topContent}`}>
<h1 data-animate="fade-up" data-animate-delay="0" className={`common_heading`}>Heavy Payload Drone Built for Reliable Aerial Logistics</h1>
<p data-animate="fade-up" data-animate-delay="150">We've engineered the CargoLift HDS20A to handle demanding transport missions with high payload capacity and precision control. Equipped with advanced RTK positioning, obstacle avoidance, and a robust folding design, our drone ensures efficient deliveries, even across complex terrains.</p>
<p data-animate="fade-up" data-animate-delay="300">Built for endurance and adaptability, the CargoLift HDS20A supports critical operations where speed, safety, and reliability are non-negotiable, ensuring smooth logistics operations for your business.</p>
</div>



   </div>

   </section>

{/* hero image section */}
   <section className={`${style.heroImage}`}>
<div data-animate="fade-up" data-animate-delay="450">

<Image src="/images/products/cargolift-hds20a/hero_image.png" width={1305} height={678} alt="" />


</div>
   </section>

{/* product specs section */}

<section className={`common_section parralax_bg ${style.specification_section}`} style={{ backgroundImage: `url(${tech_bgImage})` }} >

<div className={`container ${style.specification_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Engineered for Payload Efficiency and Operational Stability</h2>


</div>



<div className={style.specification_slider} data-animate="fade-up" data-animate-delay="150">

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
    {technicalSpecification.map((item, index) => (
      <SwiperSlide key={index}>
        <div className={style.specificationCard}>
          <div className={style.specificationCard_img}>
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


 {/* product tables section */}
 <section className={`common_section ${style.tables_section}`}>

<div className={`container ${style.tables_container}`}>

{productData["cargolift-hds20a"].map((table, i) => (
  <div key={i} className={style.singleTable} data-animate="fade-up" data-animate-delay={i*`${device === "mobile"?0:250}`}>
    <h3 className={`common_heading ${style.table_heading}`}>{table.heading}</h3>
    <ul>
      {table.items.map((item, index) => (
        <li key={index}>
          <h4 className={style.lable}>{item.label}</h4>
          <p className={style.value}>{item.value}</p>
        </li>
      ))}
    </ul>
  </div>
))}

</div>

 </section>


 {/* sevices list */}

  <section className={`common_section ${style.service_section}`}>

<div className={`container ${style.service_container}`}>

<div className={`topContent topContent_left ${style.specification_topContent}`} >
  <h2 data-animate="fade-up" className={`common_heading `}>Built for Critical Logistics, Surveillance & Infrastructure Missions</h2>
</div>


<div className={style.serviceCards}>
  {serviceData.map((item, index) => (
    <div
      key={item.id}
      className={`${style.serviceCard} ${item.className}`}
      data-animate="fade-up"
      data-animate-delay={index * 100}
    >
      <Image
        src={item.img}
        alt={item.title}
        width={item.width}
        height={item.height}
      />
      <div className={style.content}>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  ))}
</div>

</div>

 </section>


   </>
  )
}
