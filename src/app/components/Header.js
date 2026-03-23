import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.css"


export default function Header() {
  return (
   <header className={style.header}>

<div className={`container ${style.container}`}>
    
    <Link href="/">
    <Image src="/images/logo.svg" alt="logo" width={145} height={130}/>
    </Link>

    <nav className={style.nav}>
        <Link href="#" className="common_btn">
         <Image className="fan" src="/images/btn_fan.svg" alt="" width={32} height={32}/>
         <span> Contact Us</span>
        </Link>

<button className={`common_btn ${style.header_common_btn}`}>
     <Image className="" src="/images/menu.svg" alt="" width={24} height={24}/>
         <span>Menu</span>
</button>

    </nav>

</div>

   </header>
  )
}
