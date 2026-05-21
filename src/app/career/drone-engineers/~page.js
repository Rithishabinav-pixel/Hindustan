"use client";
import Header from "@/app/components/Header";
import React from "react";
import style from "./careerDetail.module.css";
import Image from "next/image";
import ButtonFan from "@/app/components/UI/ButtonFan";

export default function page() {
  return (
    <>
      <Header />

      <section className={style.careerhero_section}>
        <div className={`container ${style.heroContainer}`} id="apply-now">
          <h1 className={style.jobTitle}>Drone Engineers</h1>
          <div className={style.jobOverview}>
            <div>
              <Image src="/images/location.svg" width={32} height={32} alt="" />{" "}
              Chennai
            </div>
            <div>
              <Image
                src="/images/experience.svg"
                width={32}
                height={32}
                alt=""
              />{" "}
              2-4 Years
            </div>
            <div>
              <Image
                src="/images/remuneration.svg"
                width={32}
                height={32}
                alt=""
              />{" "}
              20-24 LPA
            </div>
          </div>
        </div>
      </section>

      <section className={`common_section ${style.jobDetailsSection}`} >
        <div className={`container ${style.jobDetailContainer}`}>
          <div className={style.content}>
            <div className={style.detail}>
              <h3>About the Role</h3>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Fusce curae
                massa ultrices fames cursus litora. Quam vitae velit
                sollicitudin felis dis platea lacus. Bibendum leo ut nulla mi
                arcu sociosqu. Ex habitasse conubia metus parturient elementum
                platea lacus. Elementum venenatis purus nulla montes cras
                sociosqu.
              </p>
            </div>

             <div className={style.detail}>
              <h3>About the Role</h3>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Fusce curae
                massa ultrices fames cursus litora. Quam vitae velit
                sollicitudin felis dis platea lacus. Bibendum leo ut nulla mi
                arcu sociosqu. Ex habitasse conubia metus parturient elementum
                platea lacus. Elementum venenatis purus nulla montes cras
                sociosqu.
              </p>
            </div>

             <div className={style.detail}>
              <h3>About the Role</h3>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Fusce curae
                massa ultrices fames cursus litora. Quam vitae velit
                sollicitudin felis dis platea lacus. Bibendum leo ut nulla mi
                arcu sociosqu. Ex habitasse conubia metus parturient elementum
                platea lacus. Elementum venenatis purus nulla montes cras
                sociosqu.
              </p>
            </div>
          </div>

          <div className={`common_form ${style.contactForm}`}>
            <h3>Apply now</h3>
            <form>
              <input type="text" name="name" placeholder="Full Name" />
              <input type="email" name="email" placeholder="Email Address" />
              <input type="text" name="phone" placeholder="Phone Number" />
              <input type="text" name="subject" placeholder="Subject" />
              <textarea name="message" placeholder="Cover letter" />

              <label className={style.fileLabel}>
                <Image src="/images/upload.svg" width={24} height={24} alt="" />
                <p>Upload Resume (Allowed type: .pdf, .doc, .docx)</p>
              </label>
              <input hidden type="file" accept="pdf/doc"></input>

              <div className={style.acceptBox}>
                <label className={style.checkbox}>
                  {/* if checked */}
                  <Image
                    src="/images/checked.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  {/* if not checkde */}
                  {/* <Image src="/images/not_checked.svg" width={24} height={24} alt=""/> */}
                </label>
                <input hidden type="checkbox" />
                <p>
                  By using this form you agree with the storage and handling of
                  your data by this website.
                </p>
              </div>

              <button type="submit" className="common_btn">
                <ButtonFan />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
