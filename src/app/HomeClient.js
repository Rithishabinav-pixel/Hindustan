"use client";

import Link from "next/link";
import Header from "./components/Header";
import style from './page.module.css'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Counter from "./components/counter";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ButtonFan from "./components/UI/ButtonFan";
import LinkArrow from "./components/UI/LinkArrow";


// steps data 
const stepCards = [
  {
    image: "/images/step1.svg",
    title: "I Buy Aerial Services",
    description: "Enterprise teams in agri, mining, construction, environment",
    buttonText: "Show me the value",
    link: "/whats-in-it-for/customer",
  },
  {
    image: "/images/step2.svg",
    title: "I want to build with you",
    description: "Channel, OEM, strategic, capital, or training partners",
    buttonText: "Show me the value",
    link: "/whats-in-it-for/partner",
  },
  {
    image: "/images/step3.svg",
    title: "I Fly for a Livin",
    description: "DGCA-certified remote pilots looking for steady, paid missions.",
    buttonText: "Show me the value",
    link: "/whats-in-it-for/pilot",
  },
  {
    image: "/images/step4.svg",
    title: "I Work on the Ground",
    description: "Local entrepreneurs onboarding farmers, sites, and businesses.",
    buttonText: "Show me the value",
    link: "/whats-in-it-for/field-agent",
  },
];


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
    title: "Agricultural Drone Operations",
    description: "Our agricultural drone intelligence enables farmers to monitor crop health, map fields, and optimise spraying operations, improving yields, reducing resource use, and driving sustainable, data-driven agriculture practices.",
    image: "agri-tech-acc.webp",
    slug: "/services/agricultural-drone-services"
  },
  {
    title: "Solar Panel Inspection & Cleaning",
    description: "We combine thermal imaging and precision cleaning techniques to optimise solar panel performance, detect faults and ensure maximum efficiency across large-scale installations, all while reducing maintenance costs and increasing asset longevity.",
    image: "solar-panel-acc.webp",
    slug: "/services/solar-panel-inspection-cleaning"
  },
  {
    title: "High-Rise Power Wash",
    description: "Our drones provide efficient high-rise cleaning solutions, ensuring consistent, streak-free results for windows and facades while reducing safety risks and eliminating the need for scaffolding or rope access systems.",
    image: "high-rise-tech-acc.webp",
    slug: "/services/high-rise-power-wash"
  },
  {
    title: "Logistics & Delivery",
    description: "We streamline logistics with fast, reliable drone delivery, enabling faster transportation to remote or hard-to-reach areas. Our services improve accessibility, reduce transit times, and ensure critical supplies reach their destinations efficiently.",
    image: "logistics-acc.webp",
    slug: "/services/logistics-delivery-services"
  },
  {
    title: "Surveying & Mapping",
    description: "From 3D mapping to volumetric analysis, our drones capture precise spatial data for infrastructure, land assessment, and project planning. We help clients make faster, data-driven decisions with high-accuracy surveys and real-time insights.",
    image: "survey-map-acc.webp",
    slug: "/services/surveying-mapping-services"
  },
  {
    title: "Media & Aerial Cinematography",
    description: "We provide high-quality aerial photography and videography services, offering cinematic visuals for real estate, events, and marketing. Our drones deliver dynamic perspectives that elevate content creation with seamless execution and stunning results.",
    image: "media-acc.webp",
    slug: "/services/media-aerial-cinematography"
  },
  {
    title: "Security & Surveillance",
    description: "Enhance your security operations with real-time aerial monitoring, perimeter patrols, and crowd management solutions. Our drones deliver actionable insights and ensure improved response times in high-risk environments or large-scale events.",
    image: "secutity-acc.webp",
    slug: "/services/security-surveillance-services"
  },
  {
    title: "Infrastructure Monitoring",
    description: "We offer continuous aerial monitoring of infrastructure projects, enabling better tracking of construction progress, identifying risks early, and ensuring regulatory compliance without disrupting ongoing operations.",
    image: "infra-acc.webp",
    slug: "/services/infrastructure-monitoring"
  },
  {
    title: "Industrial Inspection",
    description: "Our drones provide detailed inspections of industrial plants, pipelines, and critical infrastructure, helping detect faults, reduce downtime, and ensure safety compliance without manual access or costly disruptions.",
    image: "industrial-acc.webp",
    slug: "/services/industrial-inspection-services"
  },
  {
    title: "Public Safety & Emergency Response",
    description: "From rapid damage assessment to real-time monitoring, we support emergency teams with aerial intelligence, enabling faster response times and improved decision-making during critical incidents or large-scale events.",
    image: "public-acc.webp",
    slug: "/services/public-safety-emergency-response"
  },
  {
    title: "Energy & Utilities Inspection",
    description: "We provide high-precision aerial inspection solutions for energy and utilities infrastructure, monitoring power lines, solar farms, and pipelines, ensuring reliability, safety, and regulatory compliance while reducing manual inspection risks.",
    image: "energy-tech-acc.webp",
    slug: "/services/energy-utilities-inspection"
  }
];

// Drone Card Datas
const droneData = [
  {
    title: "AI Intelligence Systems",
    description: "Our AI-driven systems transform aerial data into actionable insights, helping organisations monitor environments, detect risks early, and lead with precision.",
    icon: "/images/ai_powered.svg"
  },
  {
    title: "Drone Manufacturing & Assembly",
    description: "We design and assemble high-performance drone systems engineered for reliability, adaptability, and precision across demanding operational environments.",
    icon: "/images/seamless.svg"
  },
  {
    title: "Autonomous Drone Operations",
    description: "Our certified pilots deploy intelligent drone missions that capture critical aerial data, enabling organisations to inspect, monitor, and manage assets effectively.",
    icon: "/images/smart.svg"
  }
];


const droneSlider = [
  {
    title: "AgriFlow HDS40",
    image: "/images/products/agriflow-hds40.png",
    slug:"/products/agriflow-hds40"
  },
  {
    title: "AgriFlow HDS-SEED",
    image: "/images/products/agriflow-hds40.png",
    slug:"/products/agriflow-hds-seed"

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




export default function HomeClient() {


const tabRef = useRef(null);



  const statsRef = useRef(null);
const [startCount, setStartCount] = useState(false);

const [activeTech, setActiveTech] = useState(techdata[0]);

const [insightdata, setInsightdata] = useState([]);

const [latestCaseStudy, setLatestCaseStudy] = useState(null);

useEffect(() => {
  fetch('/api/case-studies?page=1&limit=1')
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data.caseStudies) && data.caseStudies.length > 0) {
        setLatestCaseStudy(data.caseStudies[0]);
      }
    })
    .catch(() => {});
}, []);

useEffect(() => {
  fetch('/api/blogs?page=1&limit=6')
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data.blogs)) {
        setInsightdata(
          data.blogs
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .slice(0, 6)
            .map(b => ({
              image: b.featuredImage || '/images/insight1.png',
              title: b.title,
              description: b.shortDescription || '',
              slug: b.slug,
            }))
        );
      }
    })
    .catch(() => {});
}, []);

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
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (statsRef.current) observer.observe(statsRef.current);

  return () => observer.disconnect();
}, []);


const handleClick = (item, e) => {
  const li = e.currentTarget.closest('li');
  setActiveTech(item);
  setTimeout(() => {
    if (!li || !mobile) return;
    const top = li.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ behavior: 'smooth', top });
  }, 0);
};


// for parralax

useEffect(() => {
  const elements = document.querySelectorAll(".parralax_bg");
if(mobile) return
  const handleScroll = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

  

      const progress = Math.min(
        Math.max((windowHeight - rect.top) / windowHeight, 0),
        1
      );


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
   <link
        rel="preload"
        as="image"
        href="/images/hp_hero_banner.webp"
        fetchPriority="high"
      />


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
  preload="metadata"
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

    <h1 className={`common_heading ${style.bannerTitle}`}>Certified Drone Services for Industrial Operations</h1>
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
    <p  className={style.bannerContent_text}>HDSL connects businesses with certified drone operations for inspection, agriculture, surveillance, mapping, and industrial applications. </p>
    <Link href="/about-us" className="common_btn">
         <ButtonFan/>
         <span> KNOW MORE</span>
        </Link>
   </div>

   </div>

   

   </section>




   {/* Redefining Section */}
    <section className={`common_section ${style.full_height_section} ${style.redefiningsection} ${style.sticky}`}>
<div className={`container padding_left_only ${style.redefining_container}`}>
  <div className={style.leftSection}>
   <h2 data-animate="fade-up" className="common_heading">Defining the Future<br className="desktop_break"/>of Drone Services</h2>
   <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
    <p data-animate="fade-up" data-animate-delay="100">Hindustan Drone Services (HDSL) is defining the future of aerial solutions through a cutting-edge Drone-as-a-Service (DaaS) model. Our scalable, app-based platform connects businesses with certified drone pilots and service providers, offering on-demand access to precision-driven solutions across various industries. By eliminating intermediaries and streamlining workflows, we bring unmatched speed, transparency, and efficiency to traditionally fragmented operations. Positioned at the forefront of the digital service economy, HDSL is redefining how industries access and utilise aerial intelligence, empowering smarter, more efficient real-time decisions.</p>
    <Link data-animate="fade-up" data-animate-delay="200" href="/services" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
   </div>
</div>

<div className={style.rightSection}>
 <video
  className={style.futureDronesVideo}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  poster="/images/future_drone_video_poster.webp"
  width={1280}
  height={720}
>
  <source src="/images/future_drone_video.mp4" type="video/mp4" />
</video>
   </div>

</div>
    </section>




    

   {/* New Standard Section */}
   <section className={`common_section ${style.full_height_section} ${style.standard_section} ${style.sticky}`}>
<div className="container">

  <div className={`topContent ${style.topContent}`}>
    <h2 data-animate="fade-up" className="common_heading">A New Standard in Aerial Intelligence</h2>
    <p data-animate="fade-up" data-animate-delay="100">Our growing mission footprint reflects the scale and reliability behind every aerial intelligence.</p>
     <Link data-animate="fade-up" data-animate-delay="200" href="/about-us" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
  </div>


<div className={style.stats} ref={statsRef}>
  <div className={style.stat_card} data-animate="fade-up" >
  <h3 className="common_heading">
    <Counter end={120} suffix="+" start={startCount} />
  </h3>
  <p>Successful Drone Missions Delivered</p>
</div>

<div className={style.stat_card} data-animate="fade-up" data-animate-delay={`${mobile?"0":"100"}`}>
  <h3 className="common_heading">
    <Counter end={20} suffix="+" start={startCount} />
  </h3>
  <p>Industries Served with Aerial Intelligence</p>
</div>

<div className={style.stat_card} data-animate="fade-up" data-animate-delay={`${mobile?"0":"200"}`}>
  <h3 className="common_heading">
    <Counter end={98} suffix="%" start={startCount} />
  </h3>
  <p>Successful Mission Completion Rate</p>
</div>

<div className={style.stat_card} data-animate="fade-up" data-animate-delay={`${mobile?"0":"300"}`}>
  <h3 className="common_heading">
    <Counter end={1200} suffix="+" start={startCount} />
  </h3>
  <p>Total Flight Hours Logged</p>
</div>

</div>

</div>

{mobile && 
<Image className={style.standard_section_image} src="/images/standard_img_m.webp" width={1920} height={1080} alt="" />
}

   </section>





{/* Why Hindustan */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.why_hindustan} ${style.sticky}`}>
    <div className={`container ${style.why_hindustan_container}`}>
      <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Why Hindustan Drones Leads the Way</h2>
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
        <h2 data-animate="fade-up" className="common_heading">Elevating Industries with Data-Driven Drone Services</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our advanced drone services help businesses across multiple sectors monitor assets, improve operational efficiency, and unlock new opportunities using aerial intelligence and data-driven insights.</p>
         {/* <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link> */}
      </div>

     <div className={style.tech_contents_container} data-animate="fade-up" data-animate-delay="100">
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
    


<Image className={style.tech_selecetdImage} src={`/images/${item.image}`} alt={item.title} width={1055} height={776} />

            <div className={`topContent ${style.tech_selection_content}`}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <Link href={item.slug} className="common_btn">
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
 

<Image className={style.tech_selecetdImage} src={`/images/${activeTech.image}`} alt={activeTech.title} width={1055} height={776} />


    <div className={`topContent ${style.tech_selection_content} ${style.topContent} ${style.topContent_left}`}>
      <h4>{activeTech.title}</h4>
      <p>{activeTech.description}</p>

      <Link href={activeTech.slug} className="common_btn">
        <ButtonFan/>
        <span>KNOW MORE</span>
      </Link>
    </div>
  </div>
)}
</div>


  </div>
</section>

{/* Steps section  */}
<section className={`common_section light_section ${style.full_height_section} ${style.steps_section} ${style.sticky}`}>

  <div className={ `container ${style.steps_container}`}>
       <div className={`topContent ${style.topContent} `}>
        <h2 data-animate="fade-up" className="common_heading">What’s in it for you, exactly?</h2>
        <p data-animate="fade-up" data-animate-delay="100">Four ways to engage with India's most regulated drone services network. Pick the role that fits — we'll show you the value, the path, and the upside on the next screen.</p>
         <Link data-animate="fade-up" data-animate-delay="200" href="/whats-in-it-for/customer" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>

    <div className={style.step_cards} data-animate="fade-up">
  {stepCards.map((card, index) => (
    <div className={style.card} key={index}>
      <Image
        src={card.image}
        alt={card.title}
        width={80}
        height={80}
      />

      <h3>{card.title}</h3>

      <p>{card.description}</p>

      <Link
        href={card.link}
        className={`common_btn link_btn ${style.insight_btn}`}
      >
        <span>{card.buttonText}</span>
        <LinkArrow />
      </Link>
    </div>
  ))}
</div>

      </div>

</section>



{/* Drone System */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.drone_system} ${style.sticky}`}>
    <div className={ `container ${style.drone_system_container}`}>
       <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Intelligent Drone Systems & Solutions</h2>
        <p data-animate="fade-up" data-animate-delay="100">Our drone solutions are designed to deliver reliable aerial capabilities for modern industries.</p>
         <Link data-animate="fade-up" data-animate-delay="200" href="/technology/ai-models-intelligent-analytics-powering-daas" className="common_btn">
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
         <Link data-animate="fade-up" data-animate-delay="200" href="/products" className="common_btn">
         <ButtonFan/>
         <span>KNOW MORE</span>
        </Link>
      </div>
</div>

<div className={style.drone_slider} data-animate="fade-up" data-animate-delay="100">
 
<>


  <Swiper
    modules={[Navigation, Autoplay]}
    navigation={{
      prevEl: ".droneSwiper_custom-prev",
      nextEl: ".droneSwiper_custom-next",
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
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


   {/* Pilot Training */}
   <section className={`common_section parralax_bg ${style.full_height_section} ${style.pilot_training} ${style.sticky}`}>
<div className={`container ${style.pilot_training_container}`}>
     <div className={`topContent ${style.topContent} ${style.topContent_left}`}>
        <h2 data-animate="fade-up" className="common_heading">Professional Drone Pilot Training</h2>
      </div>

        <div className={`topContent ${style.topContent} ${style.topContent_left} ${style.pilot_training_content}`}>
       <p data-animate="fade-up">At Hindustan Drone Services, we believe powerful technology should come with the confidence to use it well. Our professional drone training equips individuals and teams with the knowledge needed to operate drones safely, efficiently, and with precision.</p>
       <p data-animate="fade-up" data-animate-delay="100">Through hands-on guidance and practical learning, participants understand flight controls, safety protocols, mission planning, and real-world applications, helping them unlock the full potential of modern drone technology.</p>
      <Link data-animate="fade-up" data-animate-delay="200" href="/training" className="common_btn">
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
         <Link data-animate="fade-up" data-animate-delay="200" href="/blog" className="common_btn">
         <ButtonFan/>
         <span>View All Articles</span>
        </Link>
      </div>

<div className={style.insightsRow}>


  {latestCaseStudy && (
  <div className={style.caseStudyCard}>
    <div className={style.caseStudyImage}>
      <Image src={latestCaseStudy.featuredImage || '/images/feature.webp'} width={850} height={632} alt={latestCaseStudy.title} />
    </div>
    <div className={style.caseStudyContent}>
      <span className={style.caseStudyTag}>Case Study</span>
      <h3>{latestCaseStudy.title}</h3>
      <p>{latestCaseStudy.shortDescription}</p>
      <Link href={`/case-study/${latestCaseStudy.slug}`} className={`common_btn link_btn ${style.insight_btn}`}>
        <span>EXPLORE MORE</span>
        <LinkArrow/>
      </Link>
    </div>
  </div>
  )}

<div className={style.insight_cards} data-animate="fade-up" data-animate-delay="100">



  <Swiper
  modules={[Navigation, Autoplay]}
  navigation={{
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  }}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
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
      slidesPerView: 2,
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

          <Link href={`/blog/${data.slug}`} className={`common_btn link_btn ${style.insight_btn}`}>
            <span>EXPLORE MORE</span>
           <LinkArrow/>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

</div>

</div>

{/* <div className="slider_nav">
  <div className={`custom-prev custom_slider_btn `}>
    <LinkArrow/>
  </div>
  <div className={`custom-next custom_slider_btn `}>
   <LinkArrow/>
  </div>
  </div> */}


    </div>

   </section>

   

</main>
   </>
  );
}
