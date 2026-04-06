"use client";

import Link from "next/link";
import Header from "./components/Header";
import style from './page.module.css'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Counter from "./components/counter";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ButtonFan from "./components/UI/ButtonFan";
import LinkArrow from "./components/UI/LinkArrow";

// why choose hindustan data
const whyChoose = [
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


//  Tech Driving data
const techdata = [
  {
    "title": "Agriculture & Farming",
    "description": "Drone intelligence helps farmers monitor crop health, map fields, and optimise spraying operations, improving yields, reducing resource use, and enabling more efficient, data-driven agriculture.",
    "image": "agriculture_farming.mp4",
    "feature_image":"agriculture_farming.webp",
    "slug": ""
  },
  {
    "title": "Construction & Infrastructure",
    "description": "Drone solutions enable accurate site mapping, progress tracking, and structural inspections, helping construction teams improve planning, reduce risks, and enhance project efficiency with real-time data insights.",
    "image": "agriculture_farming.mp4",
    "feature_image":"agriculture_farming.webp",
    "slug": ""
  },
  {
    "title": "Media, Entertainment & Marketing",
    "description": "Aerial drone technology captures cinematic visuals and dynamic perspectives, empowering brands and creators to produce engaging content, elevate storytelling, and deliver impactful marketing experiences.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Mining & Extractives",
    "description": "Drones provide precise surveying, volumetric analysis, and site monitoring, enabling mining operations to improve safety, optimise resource management, and make informed decisions with accurate data.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Inspection",
    "description": "Drone-based inspections allow safe and efficient assessment of assets, reducing manual risks while delivering high-resolution data for faster analysis and maintenance planning.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Energy & Utilities",
    "description": "Drones support inspection and monitoring of power lines, solar farms, and infrastructure, helping utilities enhance reliability, reduce downtime, and maintain critical assets with greater efficiency.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Security, Surveillance & Emergency",
    "description": "Drone technology enhances real-time surveillance and rapid response capabilities, supporting security operations, disaster management, and emergency services with improved situational awareness.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Environmental, Research & Survey",
    "description": "Drones assist in environmental monitoring, data collection, and research activities, enabling accurate surveys and insights that support conservation, analysis, and informed decision-making.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Logistics & Delivery",
    "description": "Drone delivery systems streamline logistics by enabling faster, cost-effective transportation of goods, especially in remote or hard-to-reach areas, improving efficiency and accessibility.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  },
  {
    "title": "Residential & Property",
    "description": "Drones provide high-quality aerial views and property insights, helping real estate professionals showcase listings, assess properties, and deliver enhanced visual experiences to clients.",
    "image": "agriculture_farming.mp4",
    "slug": ""
  }
]


// Drone Card Datas
const droneData = [
  {
    title:"AI Intelligence Systems",
    description:"Our AI-driven systems transform aerial data into actionable insights, helping organisations monitor environments, detect risks early, and act with greater clarity.",
    icon:"/images/ai_powered.svg"
  },
   {
    title:"Drone Manufacturing & Assembly",
    description:"We design and assemble high-performance drone systems engineered for reliability, adaptability, and precision across demanding operational environments.",
    icon:"/images/seamless.svg"
  },
   {
    title:"Autonomous Drone Operations",
    description:"Our certified pilots deploy intelligent drone missions that capture critical aerial data, enabling organisations to inspect, monitor, and manage assets more effectively.",
    icon:"/images/smart.svg"
  }
]


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


// Insight data

const insightdata = [
  {
    image:"/images/insight1.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
  {
    image:"/images/insight2.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
  {
    image:"/images/insight3.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
  {
    image:"/images/insight1.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
  {
    image:"/images/insight2.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
  {
    image:"/images/insight3.png",
    title:"Lorem ipsum dolor",
    description:"Lorem ipsum dolor sit amet consectetur. Vel cras nisl morbi neque diam. Pulvinar adipiscing non sapien sit quam tristique. ",
    slug:"/"
  },
]


export default function Home() {


const tabRef = useRef(null);

const handleClick = (item, e) => {
  // Capture the li before setTimeout — React recycles synthetic events after the handler returns.
  const li = e.currentTarget.closest('li');
  setActiveTech(item);
  setTimeout(() => {
    if (!li) return;
    const top = li.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ behavior: 'smooth', top });
  }, 0);
};

  const statsRef = useRef(null);
const [startCount, setStartCount] = useState(false);

const [activeTech, setActiveTech] = useState(techdata[0]);

 const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth < 1200);
    };
    checkScreen(); 
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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

   <main className={style.main}>

   {/* banner section */}

<section className={`common_section ${style.full_height_section} ${style.banner_section}`}>
   <Header/>


   <div className={style.banner_video_container}>
    {!mobile && (
       <video
  width="1920"
  height="1029"
  loop
  muted
  autoPlay
  preload="none"
  playsInline
  poster="/images/hp_hero_banner.webp"  
  className={style.video}
>
  <source src="/images/hp_hero_banner.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
    )}

   </div>

   <div className={`container ${style.bannerContent_container}`}>

    <h1 className={`common_heading ${style.bannerTitle}`}>Next-Gen Drone Systems Critical Operations</h1>
    {mobile && (
      <video
  width="1920"
  height="1029"
  loop
  muted
  autoPlay
  preload="none"
  playsInline
  poster="/images/hp_hero_banner.webp" 
  className={style.video}
>
  <source src="/images/hp_hero_banner.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
    )}

   <div className={style.bannerContent}>
    <p data-animate="fade-up" className={style.bannerContent_text}>Engineered with advanced sensors and AI analytics, our drone systems deliver real-time aerial intelligence for complex operations.</p>
    <Link data-animate="fade-up" data-animate-delay="150" href="#" className="common_btn">
         <ButtonFan/>
         <span> KNOW MORE</span>
        </Link>
   </div>

   </div>

   

   </section>

   {/* New Standard Section */}
   <section className={`common_section ${style.full_height_section} ${style.standard_section} ${style.sticky}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">A New Standard in Aerial Intelligence</h2>
    <p data-animate="fade-up" data-animate-delay="100">Our growing mission footprint reflects the scale and reliability behind every aerial intelligence.</p>
     <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
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

{mobile && 
<Image className={style.standard_section_image} src="/images/standard_img_m.webp" width={1920} height={1080} alt="" />
}

</div>

   </section>


{/* Redefining Section */}
    <section className={`common_section ${style.full_height_section} ${style.redefiningsection} ${style.sticky}`}>
<div className={`container ${style.redefining_container}`}>
   <h2 data-animate="fade-up" className="common_heading">Redefining <br className="desktop_break"/>the Future of Drones</h2>
   <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
    <p data-animate="fade-up" data-animate-delay="100">Hindustan Drone Services (HDS) brings together advanced drone systems, intelligent analytics, and certified expertise to deliver reliable aerial operations, helping industries capture precise data, improve efficiency, and make smarter decisions.</p>
    <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
   </div>

</div>
{mobile && 
<Image className={style.redefiningsection_Mobileimage} src="/images/mobile_drone.svg" width={361} height={310} alt="" />
}
    </section>


{/* Why Hindustan */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.why_hindustan} ${style.sticky}`}>
    <div className={`container ${style.why_hindustan_container}`}>
      <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Why Hindustan Drones Lead the Way</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our advanced drone systems, intelligent analytics, and expert support deliver reliable aerial operations that industries depend on for precision.</p>
      </div>

      {mobile && 
<Image className={style.singleDroneImage} src="/images/why_hindustan_drone.png" width={414} height={218} alt="" />
}

<div className={style.why_hindustan_cards}>
{whyChoose.map((card,index)=>(
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


{/* Tech Driving */}
<section className={`common_section ${style.full_height_section} ${style.tech}`}>
  <div className={`container padding_left_only ${style.tech_container}`}>
     <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Drone Tech Driving Industry Forward</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our advanced drone services empower industries to monitor assets, improve efficiency, and unlock new opportunities from the sky.</p>
         <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>

     <div className={style.tech_contents_container}>
  <aside>
<ul ref={tabRef}>
  {techdata.map((item, index) => {
    const isActive = activeTech.title === item.title;

    return (
      <li key={index}>
        

        <div
  className={isActive ? `${style.tabActive}` : ""}
  onClick={(e) => handleClick(item, e)}
>
  {item.title}
</div>

        {/* for mobile */}
        {mobile && isActive && (
          <div className={style.tech_selection_mobile}>
    

             <video
  width="1055"
  height="776"
  loop
  muted
  autoPlay
  preload="none"
  playsInline
  poster={`/images/${item.feature_image}`}
  className={style.tech_selecetdImage}
>
  <source  src={`/images/${item.image}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>

            <div className={`topContent ${style.tech_selection_content}`}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <Link href="#" className="common_btn">
                <ButtonFan/>
                <span>KNOW MORE</span>
              </Link>
            </div>
          </div>
        )}
      </li>
    );
  })}
</ul>
  </aside>


  {/* for desktop */}

{!mobile && (
  <div className={style.tech_selection}>
 

    <video
  width="1920"
  height="1029"
  loop
  muted
  autoPlay
  preload="none"
  playsInline
  poster={`/images/${activeTech.feature_image}`}
  className={style.tech_selecetdImage}
>
  <source  src={`/images/${activeTech.image}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>

    <div className={`topContent ${style.tech_selection_content} ${style.topContent} ${style.topContent_left}`}>
      <h4>{activeTech.title}</h4>
      <p>{activeTech.description}</p>

      <Link href="#" className="common_btn">
        <ButtonFan/>
        <span>KNOW MORE</span>
      </Link>
    </div>
  </div>
)}
</div>


  </div>
</section>


{/* Drone System */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.drone_system} ${style.sticky}`}>
    <div className={ `container ${style.drone_system_container}`}>
       <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Intelligent Drone Systems & Solutions</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our drone solutions are designed to deliver reliable aerial capabilities for modern industries.</p>
         <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>
{mobile && 
<Image className={style.drone_system_Mobileimage} src="/images/tech_driving_m.png" width={669} height={300} alt="" />
}

<div className={`${style.why_hindustan_cards} ${style.drone_system_cards}`}>
{droneData.map((card,index)=>(
  <div data-animate="fade-up" data-animate-delay={index * 100} className={`${style.why_choose_card} ${style.drone_system_card}`} key={index}>
    <Image src={card.icon} alt={card.title} width={80} height={80}/>
    <h3>{card.title}</h3>
    <p>{card.description}</p>
    </div>
))}
</div>


    </div>
   </section>

   {/* Drone Models*/}
   <section className={`common_section product_section ${style.full_height_section} ${style.drone_models} ${style.sticky}`}>
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

<div className={style.drone_slider}>
 
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


   {/* Pilot Training */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.pilot_training} ${style.sticky}`}>
<div className={`container ${style.pilot_training_container}`}>
     <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Professional Drone Pilot Training</h2>
      </div>

        <div className={`topContent ${style.topContent} ${style.topContent_left} ${style.pilot_training_content}`}>
       <p data-animate="fade-up">At Hindustan Drone Services, we believe powerful technology should come with the confidence to use it well. Our professional drone training equips individuals and teams with the knowledge needed to operate drones safely, efficiently, and with precision.</p>
       <p data-animate="fade-up" data-animate-delay="100">Through hands-on guidance and practical learning, participants understand flight controls, safety protocols, mission planning, and real-world applications, helping them unlock the full potential of modern drone technology.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>

</div>
   </section>

   {/* Insights */}
   <section className={`common_section ${style.insights} ${style.sticky}`}>

     <div className={ `container ${style.insights_container}`}>
       <div className={`topContent ${style.topContent} `}>
        <h2 data-animate="fade-up" className="common_heading">Latest Insights from the Drone Industry</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our blog offers in-depth articles, case studies, and expert opinions on everything drone-related.</p>
         <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>View All Articles</span>
        </Link>
      </div>


<div className={style.insight_cards} data-animate="fade-up" data-animate-delay="100">



  <Swiper
  modules={[Navigation]}
  navigation={{
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  }}
  slidesPerView={1}
  centeredSlides={false}
  loop={true}
  spaceBetween={30}
  breakpoints={{
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1201: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}
  className="insightSwiper"
>
  {insightdata.map((data, index) => (
    <SwiperSlide key={index}>
   <div className={style.insight_card}
>
        <Image
          className={style.insight_feature_image}
          src={data.image}
          width={410}
          height={305}
          alt={data.title}
        />

        <div className={style.insight_card_content}>
          <h3>{data.title}</h3>
          <p>{data.description}</p>

          <Link href="#" className={`common_btn link_btn ${style.insight_btn}`}>
            <span>EXPLORE MORE</span>
           <LinkArrow/>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

</div>

<div className="slider_nav">
  <div className={`custom-prev custom_slider_btn `}>
    {/* <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt=""/> */}
    <LinkArrow/>
  </div>
  <div className={`custom-next custom_slider_btn `}>
   <LinkArrow/>
  </div>
  </div>


    </div>

   </section>

   

</main>
   </>
  );
}
