import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Image from "next/legacy/image";

interface props { images: string[] }
export const ImgSlider2 = ({ images }: props) => {
  return (
    <div className="min-w-full overflow-hidden relative">
        <Swiper slidesPerView={1} spaceBetween={30} navigation={true} pagination={{ clickable: true}} modules={[Pagination, Navigation]} className="mySwiper w-full lg:max-w-[90%] 2xl:max-w-[80%] rounded-2xl overflow-hidden">
          {images.map((curr, index) => {
            return (
              // item
              <SwiperSlide key={index} className="w-full aspect-video">
                <picture>
                  <source srcSet={curr} />
                  <img alt={`${index}.jpg`} className='min-w-full min-h-full mx-auto' style={{ pointerEvents: 'none' }} />
                </picture>
                {/* .<Image src={curr} layout="fill"  className='min-w-full min-h-full mx-auto' alt={`${index}.jpg`} /> */}
               </SwiperSlide>
            )
          })}
        </Swiper>
    </div>
  )
}
