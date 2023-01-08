import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MdNavigateNext } from 'react-icons/md'

function ProjectImgSlider({ images, theme }) {

    const [width, setWidth] = useState(0);
    const [slide, setSlide] = useState(0);
    const imgRef = useRef()
    const carousel = useRef()

    useEffect(() => {
        setWidth(-(carousel.current.scrollWidth - carousel.current.offsetWidth))
    }, [])

    function next() {
        if ((slide - imgRef.current.offsetWidth) >= width) {
            setSlide(slide - imgRef.current.offsetWidth)
        } else {
            setSlide(0)
        }
    }

    function prev() {
        if ((slide + imgRef.current.offsetWidth) <= 0) {
            setSlide(slide + imgRef.current.offsetWidth)
            console.log('prev', slide + imgRef.current.offsetWidth, width)
        } else {
            setSlide(width)
        }
    }

    return (
        // carousel
        <motion.div ref={carousel} className='min-w-full overflow-hidden relative'>
            {/* inner carousel */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: slide }}
                className='flex items-center' >
                {images.map((curr, index) => {
                    return (
                        // item
                        <motion.div ref={imgRef} key={index} className='min-w-full min-h-[18rem] h-fit px-4 flex justify-center'>
                            <picture>
                                <source srcSet={curr}/>
                                <img alt={`${index}.jpg`} className='rounded-3xl min-w-full min-h-full my-auto' style={{ pointerEvents: 'none' }} layout='fill' />
                            </picture>
                        </motion.div>
                    )
                })}
            </motion.div>
            <motion.button whileTap={{ scale: 0.85 }} className='text-2xl lg:text-3xl absolute top-1/2 right-5 lg:right-10 p-1 lg:p-4 text-white rounded-full' style={{ background: theme.val }} onClick={next}>
                <MdNavigateNext />
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} className='text-2xl lg:text-3xl absolute top-1/2 left-5 lg:left-10 p-1 lg:p-4 text-white rounded-full' style={{ background: theme.val }} onClick={prev}>
                <MdNavigateNext className='rotate-180' />
            </motion.button>
        </motion.div>
    )
}

export default ProjectImgSlider