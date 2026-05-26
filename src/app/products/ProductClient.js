import React from 'react'
import Header from '../components/Header'
import ListingStyle from "@/app/components/UI/ListingPage.module.css"
import Image from 'next/image'
import Link from 'next/link'

const products = [

  {
    image:'/images/products/agriflow-hds40.png',
    title:"AgriFlow HDS40",
    slug:"/products/agriflow-hds40"
  },
   {
    image:'/images/products/agriflow-hds40.png',
    title:"AgriFlow HDS-SEED",
    slug:"/products/agriflow-hds-seed"
  },
   {
    image:'/images/products/solarshine.png',
    title:"SolarShine HDS40B",
    slug:"/products/solarshine-hds40b"
  },
   {
    image:'/images/products/skywash.png',
    title:"SkyWash HDS40A",
    slug:"/products/skywash-hds40a"
  },
   {
    image:'/images/products/cargolift.png',
    title:"CargoLift HDS20A",
    slug:"/products/cargolift-hds20a"
  },
   {
    image:'/images/products/terramap.png',
    title:"TerraMap HDS4P",
    slug:"/products/terramap-hds4p"
  },
   {
    image:'/images/products/vigilcore.png',
    title:"VigilCore M4TD",
    slug:"/products/vigilcore-m4td"
  },
   {
    image:'/images/products/infrascan.png',
    title:"InfraScan M400",
    slug:"/products/infrascan-m400"
  },


]

export default function ProductClient() {



  return (
<>

<Header/>

 <section className={ListingStyle.hero_section}>
        <div className={`container ${ListingStyle.herosection_Container}`}>
          <div className={ListingStyle.herosection_Container_content}>
            <div className={`topContent topContent_left ${ListingStyle.topContent}`}>
              <h1 className="common_heading">Perspectives from the Frontlines of Aerial Operations</h1>
              <p>See how our drones solve real industry challenges.</p>
            </div>

          </div>
        </div>
      </section>


 <section className={`common_section ${ListingStyle.listingPage_section}`}>
     <div className={`container ${ListingStyle.listing_Container}`}>

        <div className={`${ListingStyle.listingCards} ${ListingStyle.productListingCards}`}>


            {products.map((item,index)=>(
               <div className={ListingStyle.card} key={index}>
                <div className={ListingStyle.image}>
                    <Image src={item.image} width={520} height={320} alt={item.title}/>
                </div>
                <div className={ListingStyle.content}>
                    <p>{item.title}</p>
                    <Link href={item.slug}> <Image src="/images/menu_arrow.svg" width={24} height={24} alt='' /></Link>
                </div>
            </div>
            ))}

          

            
        </div>

     </div>

 </section>


</>
  )
}
