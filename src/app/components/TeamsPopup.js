import React, { useEffect, useState } from "react";
import PopupStyle from "./UI/Popup.module.css";
import style from "./TeamPopup.module.css";
import Image from "next/image";

export default function TeamsPopup({ profile, onClose }) {

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
    <div className={PopupStyle.popup}>

      
      <div
        className={PopupStyle.overlay}
        onClick={onClose}
      ></div>

      <div className={style.teamPopupContainer}>

      
        <button
          className={PopupStyle.close}
          onClick={onClose}
        >
          <Image
            src="/images/close.svg"
            width={24}
            height={24}
            alt="Close"
          />
        </button>


{mobile ? 
 <div className={style.detail}>
         <div className={style.image}>
          <Image
            src={profile.image}
            width={300}
            height={375}
            alt={profile.name}
          />
        </div>

        <div>
      
              <h4 className={style.teamName}>
            {profile.name}
          </h4>

          <p className={style.teamDesignation}>
            {profile.position}
          </p>
        </div>

          </div>

        :

         <div className={style.image}>
          <Image
            src={profile.image}
            width={300}
            height={375}
            alt={profile.name}
          />
        </div>
}

       

    
        <div className={style.content}>

             {!mobile && 
             <>
          <h4 className={style.teamName}>
            {profile.name}
          </h4>

          <p className={style.teamDesignation}>
            {profile.position}
          </p>
          </>
}
          <p className={style.teamContent}>
            {profile.content}
          </p>
        </div>

      </div>
    </div>
  );
}