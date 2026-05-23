'use client'
import { usePathname } from 'next/navigation'
import style from './FloatingWidgets.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function FloatingWidgets() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (

<div className={style.floatingWidgets}>



     <Link href='/contact-us' id={style.float_enquire_btn}>
        <Image src="/images/enquire-now-btn.svg" width={80} height={80} alt=''/>
        <Image className={style.arrow} src="/images/menu_arrow.svg" width={26} height={25} alt=''/>
    </Link>

     <a href='https://wa.me/+919154749191' target='_blank' id={style.float_whatsapp_btn}>
        <Image src="/images/whatsapp-app-btn.svg" width={72} height={72} alt=''/>

    </a>

</div>

  )
}
