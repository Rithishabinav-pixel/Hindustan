"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Image from 'next/image'
import style from "./training.module.css"

import * as Accordion from "@radix-ui/react-accordion";
import LinkArrow from '@/app/components/UI/LinkArrow';


// faq's data

const faqData = [
  {
    title: "Do I need prior experience to enrol in these programmes?",
    content: "No prior experience is required for most programmes. We offer structured learning paths that start with fundamentals and gradually move into advanced applications, making them suitable for both beginners and working professionals."
  },
  {
    title: "Will I receive certification after completing the training?",
    content: "Yes, participants receive certification upon successful completion of the programme. This validates your skills and can support career opportunities across industries that use drone-based operations."
  },
  {
    title: "Are these courses focused on practical, hands-on learning?",
    content: "Yes, the training places a strong emphasis on practical, hands-on learning. Participants work with real equipment and scenarios to build confidence in actual operating conditions."
  },
  {
    title: "What kind of career opportunities can this training lead to?",
    content: "Training can open opportunities in agriculture, media, infrastructure inspection, mapping, and more. It also supports freelance work and specialised drone service roles across industries."
  },
  {
    title: "Do you provide drones and equipment during training?",
    content: "Yes, all necessary drones and equipment are provided during the training sessions, ensuring participants can focus on learning without needing personal equipment."
  },
  {
    title: "Can organisations enrol teams for customised training programmes?",
    content: "Yes, HDSL offers customised training programmes tailored for organisations, enabling teams to build relevant skills aligned with specific operational requirements."
  }
];


// stack data
const trainingStacks = [
  {
    id: 1,
    title: "Aerial Photography and Videography",
    sticky: true,
    bg: "training_stack1",
    tabletBg: "training_stack1t",
    mobileImg: "training_stack1m",
    desc: [
      "Master the art of capturing compelling aerial visuals with precision and control. Our programme covers everything from framing and camera movement to lighting and storytelling techniques, all tailored for drone-based visuals. Ideal for creators, media professionals, and businesses looking to produce high-quality content that stands out across platforms and real-world projects."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  },
  {
    id: 2,
    title: "Sites and Cloud Processing",
    sticky: true,
    bg: "training_stack2",
    tabletBg: "training_stack2t",
    mobileImg: "training_stack2m",
    desc: [
      "Learn how to manage, process, and analyse aerial data using modern cloud-based platforms. Our training focuses on practical workflows that convert raw flight data into structured outputs for reporting and decision-making. Designed for professionals working with mapping, surveying, and site monitoring, this programme empowers you with reliable and organised data processing capabilities."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  },
  {
    id: 3,
    title: "Advanced Mapping and Surveying",
    sticky: true,
    bg: "training_stack4",
    tabletBg: "training_stack4t",
    mobileImg: "training_stack4m",
    desc: [
      "Develop the skills required to execute high-accuracy mapping missions using drones. This programme covers flight planning, data capture techniques, and output generation for surveying and mapping applications. Ideal for infrastructure, land assessment, and planning professionals seeking efficient and scalable aerial mapping solutions."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  },
  {
    id: 4,
    title: "Tower and Turbine Inspections",
    sticky: true,
    bg: "training_stack3",
    tabletBg: "training_stack3t",
    mobileImg: "training_stack3m",
    desc: [
      "Through this programme, gain expertise in conducting inspections of towers, turbines, and critical infrastructure using drones. Our training focuses on safety protocols, navigation in complex environments, and capturing inspection-grade data. Tailored for professionals working in energy, telecom, and infrastructure sectors where accuracy and safety are critical."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  },
  {
    id: 5,
    title: "Fast Moving Subject Tracking",
    sticky: true,
    bg: "training_stack5",
    tabletBg: "training_stack5t",
    mobileImg: "training_stack5m",
    desc: [
      "Learn advanced drone control techniques with our training programme to track and capture fast-moving subjects with precision. This focuses on coordination, motion control, and real-time adjustments required for dynamic environments. It’s suitable for sports, events, and action-based filming where timing and control are essential."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  },
  {
    id: 6,
    title: "Wedding Filmmaking Mastery",
    sticky: false,
    bg: "training_stack6",
    tabletBg: "training_stack6t",
    mobileImg: "training_stack6m",
    desc: [
      "Understand how to integrate drone cinematography into wedding and event storytelling. Our training covers composition, timing, and seamless coordination with ground crews. Designed for filmmakers looking to elevate their work with cinematic aerial visuals that enhance storytelling and create memorable visual experiences."
    ],
    btnText: "APPLY NOW",
    link: "/contact-us"
  }
];

export default function TrainingClient() {

const [tablet, setTablet] = useState(false);
const [mobile, setMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    const width = window.innerWidth;

    setTablet(width < 1200 && width >= 767);
    setMobile(width < 767);
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);


useEffect(() => {
  if (!mobile) return;
  const t = setTimeout(() => {
    window.dispatchEvent(new Event("aos:refresh"));
  }, 50);
  return () => clearTimeout(t);
}, [mobile]);




  return (
    <>
    
      <Header/>


{/* hero section */}

<main className={`${style.main}`}>

<section className={`common_section innerpage_hero_section ${style.trainingHeroSection} `}>


   <div className={`container innerpage_heroContainer `}>


<h1 data-animate="fade-up" data-animate-delay="100" className={`common_heading`}>Building India's Next Generation of Certified Drone Professionals</h1>

<div  className={`topContent topContent_left  innerpage_heroContainer_content`}>

  <p data-animate="fade-up" data-animate-delay="150">HDS offers India's most comprehensive drone training and certification programs — equipping individuals, enterprises, and government teams with the skills to fly, operate, process, and deploy drone technology across real-world applications.</p>

   <Link data-animate="fade-up" data-animate-delay="200" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
</div>

<div data-animate="fade-up" data-animate-delay="250" className={`innerpage_heroContainer_image`}>

<Image src="/images/training_hero.webp" width={1290} height={700} alt="" />


</div>

   </div>

   </section>


{/* training stacks */}
{trainingStacks.map((item) => (
  <div
    key={item.id}
    className={`common_section ${style.stack_section} ${item.sticky ? style.sticky : ""}`}
    style={{
      backgroundImage: `url("/images/${tablet ? item.tabletBg : item.bg}.webp")`
    }}
  >
    <div className={`container ${style.stackContainer}`}>

      {mobile && (
        <div className={style.stackImage} data-animate="fade-up" data-animate-delay="200">
        <Image 
          src={`/images/${item.mobileImg}.webp`}
          width={600}
          height={508}
          alt={item.title}
        />
        </div>
      )}

      <div className={style.stackTitle} data-animate="fade-up">
        <h2 className="common_heading">{item.title}</h2>
      </div>

      <div className={`topContent topContent_left ${style.stackContent}`}>

      <p
  data-animate="fade-up"
  data-animate-delay="150"
  dangerouslySetInnerHTML={{ __html: item.desc }}
/>

        <Link
          data-animate="fade-up"
          data-animate-delay="300"
          href={item.link}
          className="common_btn"
        >
          <ButtonFan />
          <span>{item.btnText}</span>
        </Link>

      </div>
    </div>
  </div>
))}




</main>

{/* training faq section */}
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
