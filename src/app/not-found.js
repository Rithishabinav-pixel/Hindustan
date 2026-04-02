import React from 'react'
import Header from './components/Header'
import style from './error.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ButtonFan from './components/UI/ButtonFan'

export default function page() {
  return (
    <>

    <Header/>


    <div className={style.errorContainer}>
        <div className={`container ${style.container}`}>
            <div className={style.errorCode}>
<h2 >4</h2>
<Image src="/images/error.svg" width={250} height={250} alt=''></Image>
<h2>4</h2>


            </div>

            <p >The page you’re looking for doesn’t exist or may have been moved. Please check the URL or return to the homepage.</p>
   <Link href="#" className="common_btn">
         <ButtonFan/>
         <span> GoTo Home</span>
        </Link>

        </div>
        </div>


    </>
  )
}
