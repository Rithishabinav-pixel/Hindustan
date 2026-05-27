"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ListingStyle from "@/app/components/UI/ListingPage.module.css"
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceClient({allservice}) {

   
    const [services,setServices] = useState([])

useEffect(()=>{
setServices(allservice)
},[])

  return (
   <>

<Header/>

 <section className={ListingStyle.hero_section}>
        <div className={`container ${ListingStyle.herosection_Container}`}>
          <div className={ListingStyle.herosection_Container_content}>
            <div className={`topContent topContent_left ${ListingStyle.topContent}`}>
              <h1 className="common_heading">Scalable Drone Services for Complex Field Operations</h1>
              <p>While most drone services focus only on flying missions, HDSL supports operations beyond aerial deployment, from inspection and monitoring to analysis, reporting, logistics, and field response. The result is faster execution, better visibility, and dependable outcomes across industries.</p>
            </div>

          </div>
        </div>
      </section>


 <section className={`common_section ${ListingStyle.listingPage_section}`}>
     <div className={`container ${ListingStyle.listing_Container}`}>

        <div className={`${ListingStyle.listingCards} ${ListingStyle.serviceListingCards}`}>

{services && services.map((item,index)=>(
     <div className={ListingStyle.card} key={index}>
                <div className={ListingStyle.image}>
                    <Image src={item.benefitsBgDesktop} width={520} height={320} alt={item.name}/>
                </div>
                <div className={ListingStyle.content}>
                    <p>{item.name}</p>
                    <Link href={`services/${item.slug}`}> <Image src="/images/menu_arrow.svg" width={24} height={24} alt='' /></Link>
                </div>
            </div>
))}
            

        

            
        </div>

     </div>

 </section>


</>
  )
}
