import { motion } from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import { FaQuoteLeft, FaQuoteRight, FaFacebookSquare, FaGithub, FaWhatsapp, FaLinkedin, FaPhoneAlt } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import Button from '../../components/tools/Button'


const viewport = {
    once: false,
    amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.05) : 0.5
}
const outerVariants = {
    open: {
        transition: { staggerChildren: 0.5, delayChildren: 0.3 }
    },
    closed: {
        transition: { staggerChildren: 0.5, staggerDirection: -1 }
    }
};
const subHeading = {
    open: {
        x: 0,
        opacity: 1,
    },
    closed: {
        x: 200,
        opacity: 0,
    }
};
const Heading = {
    closed: {
        y: -200,
        opacity: 0,
    },
    open: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.2
        }
    }
}

const links = [
    { url: 'https://github.com/Moinak-Majumdar', icon: <FaGithub /> },
    { url: 'https://www.linkedin.com/in/moinak-majumdar-b7a85b238/', icon: <FaLinkedin /> },
    { url: 'mailto:moinak2030@gmail.com', icon: <MdMarkEmailUnread /> },
    { url: 'https://www.facebook.com/moinak.majumdar.9', icon: <FaFacebookSquare /> },
    { url: 'https://api.whatsapp.com/send?phone=+919804139678&text=I%20like%20your%20work', icon: <FaWhatsapp /> },
    { url: 'tel:+919804139678', icon: <FaPhoneAlt /> },
]

const HireMe = ({ darkMode, theme }) => {
    return (
        <section id='hire' className='relative overflow-hidden'>
            <div className='myContainer py-[8rem]'>
                <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className={`flex flex-col bg-gradient-to-b ${darkMode ? 'text-gray-300 to-[#121214] from-[#141E30]' : 'text-gray-800 from-[#f2fcfe] to-[#E0EAFC]'}`}>
                    <div className='flex flex-col lg:flex-row lg:justify-start justify-center lg:items-start items-center p-4 lg:p-10'>
                        <motion.div variants={Heading} className='px-1 pt-1 w-fit border relative -top-16 lg:-top-20' style={{ borderColor: theme.val }}>
                            <Image src='/assets/image/me.jpg' height={600} width={450} alt='me.jpg' className='grayscale hover:filter-none hover:grayscale-0 ' style={{ WebkitTransition: 'all .8s ease-in-out' }} />
                        </motion.div>
                        <motion.div variants={subHeading} className='ml-0 lg:ml-24 lg:max-w-[60%] max-w-full flex flex-col'>
                            <h3 className='text-2xl font-roboto'>Hello There !</h3>
                            <h1 className='mt-4 text-4xl md:text-5xl'>
                                <span className='font-ubuntu'>I&apos;m</span>
                                <span className='font-ubuntu font-bold ml-2'>Moinak Majumdar</span>
                            </h1>
                            <h2 className='mt-8  text-lg lg:text-2xl font-comicNeue'>From a tech enthusiast, A MERN lover</h2>
                            <div className='flex flex-col my-2 mr-auto'>
                                <FaQuoteLeft className='mt-4 text-4xl' style={{ color: theme.val }} />
                                <p className='mt-2 lg:text-xl ml-10 font-ubuntu'>
                                    With many years of knowledge in coding, computer science, hands-on projects and also suitable understanding in Full Stack Development, I look forward to bringing my strong, creative, technical and analytical skills to the Full Stack Developer for the best. Therefore always excited to learn new things and add to my skill sets. Hope you do like my projects, feel free to connect 😄
                                </p>
                                <FaQuoteRight className='mt-4 text-4xl' style={{ color: theme.val }} />
                            </div>
                            <div className='flex mt-8 gap-6 mr-auto ml-auto lg:ml-0'>
                                {links.map((curr, index) => {
                                    return (
                                        <a key={index} href={curr.url} target='_blank' className='text-3xl cursor-pointer'>
                                            {curr.icon}
                                        </a>
                                    )
                                })}
                            </div>
                            <Button darkMod={darkMode} theme={theme} className='mt-8 max-w-xs ml-auto mr-auto lg:mr-0'>
                                <Link href='/assets/document/myResume.pdf'>
                                    <a target='_blank'>
                                        Download Resume
                                    </a>
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HireMe