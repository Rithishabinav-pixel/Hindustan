"use client"
import React, { useEffect, useState } from 'react'
import style from './Technology.module.css'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Header from '../components/Header'
import Image from 'next/image'


const AIModelsData = [
    {
        ai_model : "CropHealthModel",
        function : "Analyses NDVI and multispectral indices to detect plant stress, disease, and nutrient deficiency",
        image : "/images/crop-health-model.webp",
        output_insight : "Health maps with zonal treatment recommendations"
    },
     {
        ai_model : "PestDetectionModel",
        function : "Identifies insects and infestation patterns through high-resolution imaging and pattern recognition",
        image : "/images/crop-health-model.webp",
        output_insight : "Targeted spray maps for IPM programs"
    },
     {
        ai_model : "SoilAnalysisModel",
        function : "Maps soil moisture, nutrient variability, and composition using aerial + ground-truth fusion",
        image : "/images/crop-health-model.webp",
        output_insight : "Variable-rate application prescriptions"
    },
     {
        ai_model : "YieldPredictionModel",
        function : "Forecasts crop yield using biomass data, weather patterns, and historical performance",
        image : "/images/crop-health-model.webp",
        output_insight : "Field-level yield maps with confidence intervals"
    },
     {
        ai_model : "SprayPickerModel",
        function : "Recommends optimal pesticide/fertiliser products and rates based on detected conditions",
        image : "/images/crop-health-model.webp",
        output_insight : "Actionable spray programs per field zone"
    },
     {
        ai_model : "3DReconstructionModel",
        function : "Builds textured 3D meshes and point clouds from photogrammetric image sets",
        image : "/images/crop-health-model.webp",
        output_insight : "Digital Twins for planning, inspection, and visualisation"
    },
     {
        ai_model : "CropHealthModel",
        function : "Analyses NDVI and multispectral indices to detect plant stress, disease, and nutrient deficiency",
        image : "/images/crop-health-model.webp",
        output_insight : "Health maps with zonal treatment recommendations"
    },
     {
        ai_model : "PestDetectionModel",
        function : "Identifies insects and infestation patterns through high-resolution imaging and pattern recognition",
        image : "/images/crop-health-model.webp",
        output_insight : "Targeted spray maps for IPM programs"
    },
     {
        ai_model : "SoilAnalysisModel",
        function : "Maps soil moisture, nutrient variability, and composition using aerial + ground-truth fusion",
        image : "/images/crop-health-model.webp",
        output_insight : "Variable-rate application prescriptions"
    },
     {
        ai_model : "YieldPredictionModel",
        function : "Forecasts crop yield using biomass data, weather patterns, and historical performance",
        image : "/images/crop-health-model.webp",
        output_insight : "Field-level yield maps with confidence intervals"
    },
     {
        ai_model : "SprayPickerModel",
        function : "Recommends optimal pesticide/fertiliser products and rates based on detected conditions",
        image : "/images/crop-health-model.webp",
        output_insight : "Actionable spray programs per field zone"
    },
     {
        ai_model : "3DReconstructionModel",
        function : "Builds textured 3D meshes and point clouds from photogrammetric image sets",
        image : "/images/crop-health-model.webp",
        output_insight : "Digital Twins for planning, inspection, and visualisation"
    }

]

export default function page() {

     const [mobile, setMobile] = useState(false);
    
      useEffect(() => {
        const checkScreen = () => {
          setMobile(window.innerWidth < 767);
        };
        checkScreen(); 
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
      }, []);


  return (
    <>
    <Header/>
    

    {/* hero section */}
    <section className={style.heroSection}>

        <div className={`container ${style.heroSection_container}`}>

  <div className={`topContent ${style.topContent}`}>
        <h1 data-animate="fade-up" data-animate-delay="100" className="common_heading">Technology Powering The Future Of Drone Innovation</h1>
        <p data-animate="fade-up" data-animate-delay="200">Our drone technologies combine advanced engineering, intelligent analytics, and precision systems to deliver reliable aerial solutions across industries.</p>
       <Link data-animate="fade-up" data-animate-delay="300" href="#" className="common_btn">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
      </div>


        </div>
    </section>

    {/* video section */}
    <section className={style.videoSection}>

      <div className={style.videoSection_img}>
        <Image src="/images/tech_ai.svg" className={style.ai_bg} height={598} width={599} alt="Ai Technology" priority/>
        <Image src="/images/tech_ai_text.webp" className={style.ai_text} height={598} width={599} alt="Ai Technology" priority/>

      </div>


        <div className={style.videoSection_video}>
         <video
          width="1920"
          height="1080"
          loop
          muted
          autoPlay
          preload="none"
          playsInline
          poster={`/images/tech_bgvideo.webp`}
          className={style.tech_selecetdImage}
        >
          <source  src={`/images/tech_bgvideo.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>

       
    </section>

    {/* table section */}
    <section className={`common_section ${style.tableSection}`}>

          <div className={`container ${style.tableSection_container}`}>

 <div className={`topContent ${style.topContent} `}>
        <h2 data-animate="fade-up" className="common_heading">AI MODELS — Intelligent Analytics Powering DaaS</h2>
        <p data-animate="fade-up" data-animate-delay="100">At the heart of every HDS operation is a proprietary suite of AI models that transform raw drone data — imagery, thermal feeds, LiDAR scans, and sensor telemetry — into precise, actionable intelligence. </p>

      </div>


      <div className={style.tableSection_table} data-animate="fade-up" data-animate-delay="100">

        <div className={`${style.row} ${style.row_head}`}>
         <div className={style.data}><p>AI Model</p></div>
         <div className={style.data}><p>Function</p></div>
         <div className={style.data}><p>Output / Insight</p></div>

        </div>

        {AIModelsData.map((item,index)=>(
           <div className={`${style.row} ${style.row_body}`} key={index}>

            {mobile && 
            <div className={`${style.mobile_data_image}`}> <Image src={item.image} alt={item.ai_model} width={188} height={125} /> </div>
            }
         
         <div className={style.data}>
          {mobile && <span>AI Model</span>}
          <p>{item.ai_model}</p>
          </div>

         <div className={style.data}>
           {mobile && <span>Function</span>}
          <p>{item.function} </p>
          {!mobile && <div className={`${style.data_image}`}> <Image src={item.image} alt={item.ai_model} width={188} height={125} /> </div>}
         </div>

         {/* <div className={`${style.data} ${style.data_image}`}> <Image src={item.image} alt={item.ai_model} width={188} height={125} /> </div> */}
         <div className={style.data}>
           {mobile && <span>Output / Insight</span>}
          <p>{item.output_insight}</p>
          </div>

        </div>
        ))}

      </div>


          </div>

    </section>
    
    </>
  )
}
