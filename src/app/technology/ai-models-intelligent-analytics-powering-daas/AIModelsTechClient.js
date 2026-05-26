"use client"
import React, { useEffect, useState } from 'react'
import style from './aiModelsTech.module.css'
import Link from 'next/link'
import ButtonFan from '../../components/UI/ButtonFan'
import Header from '../../components/Header'
import Image from 'next/image'


const AIModelsData = [
  {
    ai_model: "CropHealthModel",
    function:
      "Analyses NDVI and multispectral indices to detect plant stress, disease, and nutrient deficiency",
    image: "/images/CropHealthModel.webp",
    output_insight: "Health maps with zonal treatment recommendations",
  },

  {
    ai_model: "PestDetectionModel",
    function:
      "Identifies insects and infestation patterns through high-resolution imaging and pattern recognition",
    image: "/images/PestDetectionModel.webp",
    output_insight: "Targeted spray maps for IPM programs",
  },

  {
    ai_model: "SoilAnalysisModel",
    function:
      "Maps soil moisture, nutrient variability, and composition using aerial + ground-truth fusion",
    image: "/images/SoilAnalysisModel.webp",
    output_insight: "Variable-rate application prescriptions",
  },

  {
    ai_model: "YieldPredictionModel",
    function:
      "Forecasts crop yield using biomass data, weather patterns, and historical performance",
    image: "/images/YieldPredictionModel.webp",
    output_insight: "Field-level yield maps with confidence intervals",
  },

  {
    ai_model: "SprayPickerModel",
    function:
      "Recommends optimal pesticide/fertiliser products and rates based on detected conditions",
    image: "/images/SprayPickerModel.webp",
    output_insight: "Actionable spray programs per field zone",
  },

  {
    ai_model: "3DReconstructionModel",
    function:
      "Builds textured 3D meshes and point clouds from photogrammetric image sets",
    image: "/images/3DReconstructionModel.webp",
    output_insight:
      "Digital Twins for planning, inspection, and visualisation",
  },

  {
    ai_model: "ThermalDetectionModel",
    function:
      "Identifies heat anomalies in solar panels, structures, pipelines, and perimeters",
    image: "/images/ThermalDetectionModel.webp",
    output_insight: "Hotspot alerts with severity classification",
  },

  {
    ai_model: "IntrusionDetectionModel",
    function:
      "Flags unauthorised entries within defined perimeters using thermal + optical fusion",
    image: "/images/IntrusionDetectionModel.webp",
    output_insight: "Real-time geotagged alerts to security teams",
  },

  {
    ai_model: "AnomalyDetectionModel",
    function:
      "Identifies unusual patterns in surveillance feeds, energy systems, and environmental data",
    image: "/images/AnomalyDetectionModel.webp",
    output_insight:
      "Prioritised anomaly reports with evidence clips",
  },

  {
    ai_model: "PathPlanningModel",
    function:
      "Optimises drone flight paths for coverage efficiency, battery life, and safety compliance",
    image: "/images/PathPlanningModel.webp",
    output_insight:
      "Mission-optimised flight plans and waypoint files",
  },

  {
    ai_model: "ObstacleAvoidanceModel",
    function:
      "Enables real-time dynamic collision prevention in complex environments",
    image: "/images/ObstacleAvoidanceModel.webp",
    output_insight:
      "In-flight route adjustments, zero incident rate",
  },

  {
    ai_model: "GeoFenceModel",
    function:
      "Enforces virtual geographic boundaries for legal and safety compliance",
    image: "/images/GeoFenceModel.webp",
    output_insight:
      "Automated flight restriction enforcement + logs",
  },

  {
    ai_model: "ObjectDetectionModel",
    function:
      "Recognises specific elements: vehicles, people, structures, equipment, signage",
    image: "/images/ObjectDetectionModel.webp",
    output_insight:
      "Classified, annotated image outputs for downstream use",
  },

];

export default function AIModelsTechClient() {

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
        <h1 data-animate="fade-up" data-animate-delay="150" className="common_heading">Technology Supporting Real-World Drone Operations</h1>
        <p data-animate="fade-up" data-animate-delay="300">Our technology systems support drone inspections, mapping, monitoring, and operational analysis by processing aerial data into usable outputs across industrial and field environments.</p>
       <Link data-animate="fade-up" data-animate-delay="450" href="/contact-us" className="common_btn">
         <ButtonFan/>
         <span>Enquire Now</span>
        </Link>
      </div>


        </div>
    </section>

    {/* video section */}
    <section className={style.videoSection}>

      <div className={style.videoSection_img} data-animate="fade-up" data-animate-delay="600">
        <Image src="/images/tech_ai.svg"  className={style.ai_bg} height={598} width={598} alt="Ai Technology" priority/>
        <Image src="/images/tech_ai_text.webp" className={style.ai_text} height={598} width={598} alt="Ai Technology" priority/>

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
        <h2 data-animate="fade-up" className="common_heading">AI Models for Monitoring, Inspection, and Analysis</h2>
        <p data-animate="fade-up" data-animate-delay="150">HDSL uses AI models to analyse aerial imagery, thermal data, and operational inputs to support inspections, monitoring, crop analysis, surveillance, and industrial decision-making.</p>

      </div>


      <div className={`${style.tableSection_table}`} >

        <div className={`${style.row} ${style.row_head}`}>
         <div className={style.data}><p>AI Model</p></div>
         <div className={style.data}><p>Function</p></div>
         <div className={style.data}><p>Output / Insight</p></div>

        </div>

        {AIModelsData.map((item,index)=>(
           <div className={`${style.row} ${style.row_body}`} key={index} data-animate="fade-up" data-animate-delay="100" >

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
