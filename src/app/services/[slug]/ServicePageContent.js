'use client'
import Header from '@/app/components/Header'
import { useEffect, useState } from 'react'
import style from '../Service.module.css'
import Link from 'next/link'
import ButtonFan from '@/app/components/UI/ButtonFan'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import * as Accordion from '@radix-ui/react-accordion'

export default function ServicePageContent({ service }) {
  const [mobile, setMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1200)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Parallax
  useEffect(() => {
    if (mobile) return
    const elements = document.querySelectorAll('.parralax_bg')
    const handleScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1)
        el.style.backgroundSize = `${110 - progress * 10}% 100%`
      })
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobile])

  // Trigger AOS on mount (data is already available)
  useEffect(() => {
    window.dispatchEvent(new Event('aos:refresh'))
  }, [])

  const subItems     = Array.isArray(service.subServicesItems) ? service.subServicesItems : []
  const benefitItems = Array.isArray(service.benefitsItems)    ? service.benefitsItems    : []
  const faqItems     = Array.isArray(service.faqItems)         ? service.faqItems         : []
  const products     = Array.isArray(service.products)         ? service.products         : []

  const bgDesktop = service.benefitsBgDesktop || ''
  const bgMobile  = service.benefitsBgMobile  || bgDesktop

  return (
    <>
      <Header />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="common_section innerpage_hero_section">
        <div className="container innerpage_heroContainer">
          <h1 data-animate="fade-up" data-animate-delay="100" className="common_heading">
            {service.heroTitle}
          </h1>

          <div className="topContent topContent_left innerpage_heroContainer_content">
            <p data-animate="fade-up" data-animate-delay="150">{service.heroDescription}</p>
            {service.heroButtonName && (
              <Link data-animate="fade-up" data-animate-delay="200" href={service.heroButtonLink || '#'} className="common_btn">
                <ButtonFan />
                <span>{service.heroButtonName}</span>
              </Link>
            )}
          </div>

          {service.heroImage && (
            <div data-animate="fade-up" data-animate-delay="250" className="innerpage_heroContainer_image">
              <Image src={service.heroImage} width={1290} height={700} alt={service.heroTitle || ''} />
            </div>
          )}
        </div>
      </section>

      {/* ── Sub Services ─────────────────────────────────────────────── */}
      {subItems.length > 0 && (
        <section className={`common_section ${style.subservices_section}`}>
          <div className={`container ${style.subservices_container}`}>
            {service.subServicesTitle && (
              <h2 data-animate="fade-up" className={`common_heading ${style.servicesTitle}`}>
                {service.subServicesTitle}
              </h2>
            )}
            <div className={style.subservices_cards}>
              {subItems.map((item, index) => (
                <div className={style.subservices_card} key={index} data-animate="fade-up">
                  <div className={style.subservices_card_image}>
                    {item.image && (
                      <Image
                        className={style.subservices_image}
                        src={item.image}
                        width={630}
                        height={441}
                        alt={item.title || ''}
                      />
                    )}
                  </div>
                  <div className={style.subservices_content}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      {(benefitItems.length > 0 || service.benefitsTitle) && (
        <section
          className={`common_section parralax_bg ${style.benefits_section}`}
          style={{ backgroundImage: `url("${mobile ? bgMobile : bgDesktop}")` }}
        >
          <div className={`container ${style.benefits_container}`}>
            <div className={`topContent topContent_left ${style.benefits_topContent}`}>
              {service.benefitsTitle && (
                <h2 data-animate="fade-up" className={`common_heading ${style.benefits_title}`}>
                  {service.benefitsTitle}
                </h2>
              )}
              {service.benefitsDescription && (
                <p data-animate="fade-up" data-animate-delay="150">{service.benefitsDescription}</p>
              )}
            </div>

            {benefitItems.length > 0 && (
              <div className={style.benefits_slider}>
                <Swiper
                  modules={[Navigation]}
                  navigation={{ prevEl: '.benefitsSwiper_custom-prev', nextEl: '.benefitsSwiper_custom-next' }}
                  slidesPerView={1}
                  loop={true}
                  spaceBetween={30}
                  breakpoints={{
                    768:  { slidesPerView: 2, spaceBetween: 20 },
                    1201: { slidesPerView: 4, spaceBetween: 30 },
                  }}
                  className="benefitsSwiper"
                >
                  {benefitItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className={style.benefitsCard}>
                        {item.icon && (
                          <div className={style.benefitsCard_img}>
                            <Image src={item.icon} alt={item.title || ''} width={80} height={80} />
                          </div>
                        )}
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className={`slider_nav ${style.droneSlider_nav}`}>
                  <div className="benefitsSwiper_custom-prev custom_slider_btn">
                    <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt="" />
                  </div>
                  <div className="benefitsSwiper_custom-next custom_slider_btn">
                    <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Products ─────────────────────────────────────────────────── */}
      {products.length > 0 && (
        <section className={`common_section product_section ${style.product_section}`}>
          <div className={`container ${style.productContainer}`}>
            <div className={`topContent ${style.topContent}`}>
              {service.productsTitle && (
                <h2 data-animate="fade-up" className="common_heading">{service.productsTitle}</h2>
              )}
              {service.productsDescription && (
                <p data-animate="fade-up" data-animate-delay="100">{service.productsDescription}</p>
              )}
              <Link data-animate="fade-up" data-animate-delay="200" href="#" className="common_btn">
                <ButtonFan />
                <span>KNOW MORE</span>
              </Link>
            </div>
          </div>

          <div className={`product_slider ${style.productSlider}`}>
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: '.droneSwiper_custom-prev', nextEl: '.droneSwiper_custom-next' }}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              spaceBetween={30}
              breakpoints={{
                768:  { slidesPerView: 2, spaceBetween: 60 },
                1201: { slidesPerView: 3, spaceBetween: 120 },
              }}
              className="productsSwiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="product_card">
                    <div className="product_card_image">
                      <Image src={product.image} alt={product.name} width={520} height={320} />
                    </div>
                    <h3>{product.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={`slider_nav productSlider_nav ${style.productsdata_nav}`}>
            <div className="droneSwiper_custom-prev custom_slider_btn">
              <Image src="/images/slider_arrow_left.svg" width={12} height={12} alt="" />
            </div>
            <div className="droneSwiper_custom-next custom_slider_btn">
              <Image src="/images/slider_arrow_right.svg" width={12} height={12} alt="" />
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <section className={`common_section ${style.faq_section} faq_section`}>
          <div className={`container ${style.faqContainer}`}>
            <div className={`topContent ${style.topContent}`}>
              {service.faqTitle && (
                <h2 data-animate="fade-up" className="common_heading">{service.faqTitle}</h2>
              )}
            </div>

            <div className="faq" data-animate="fade-up">
              <Accordion.Root type="single" collapsible>
                {faqItems.map((faq, index) => (
                  <Accordion.Item key={index} value={`item-${index}`}>
                    <Accordion.Header>
                      <Accordion.Trigger>{faq.title}</Accordion.Trigger>
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
      )}
    </>
  )
}
