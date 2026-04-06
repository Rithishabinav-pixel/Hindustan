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
    title:"How are drones used in agriculture?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"What are the benefits of using drones for farming?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Can drones help detect crop diseases early?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Are agricultural drones suitable for large farms?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
   {
    title:"Do I need special training to operate agricultural drones?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
    {
    title:"Can drones be used for pesticide and fertilizer spraying?",
    content:"Drones are used in agriculture for crop monitoring, aerial spraying, field mapping, and soil analysis. They capture high-resolution aerial data that helps farmers identify crop health issues, irrigation problems, and pest infestations quickly and efficiently."
  },
]


// stack data
const trainingStacks = [
  {
    id: 1,
    title: "Professional Applications (Intermediate)",
    sticky: true,
    bg: "training_stack1",
    tabletBg: "training_stack1t",
    mobileImg: "training_stack1m",
    desc: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est .<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
    ],
    btnText: "APPLY NOW",
    link: "#"
  },
  {
    id: 2,
    title: "Technical Skills (Data Processing)",
    sticky: true,
    bg: "training_stack2",
    tabletBg: "training_stack2t",
    mobileImg: "training_stack2m",
    desc: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est .<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
    ],
    btnText: "APPLY NOW",
    link: "#"
  },
  {
    id: 3,
    title: "Specialised Industry Programs",
    sticky: true,
    bg: "training_stack3",
    tabletBg: "training_stack3t",
    mobileImg: "training_stack3m",
    desc: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est .<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
    ],
    btnText: "APPLY NOW",
    link: "#"
  },
  {
    id: 4,
    title: "Enterprise Training (For Corporate Teams)",
    sticky: false,
    bg: "training_stack4",
    tabletBg: "training_stack4t",
    mobileImg: "training_stack4m",
   desc: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est .<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
    ],
    btnText: "APPLY NOW",
    link: "#"
  }
];


export default function Training() {

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

   <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
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
