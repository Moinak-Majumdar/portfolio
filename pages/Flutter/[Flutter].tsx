import DevFlag from "@/components/others/DevFlag";
import AnimatedHeading from "@/components/tools/AnimatedHeading";
import Bg from "@/components/tools/Bg";
import { useFont } from "@/context/FontProvider";
import { RootState } from "@/redux/store";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { GetServerSidePropsContext } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { BsAndroid2 } from "react-icons/bs";
import { FaGithub, FaRegImages } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@/components/tools/Button";
import { AiOutlineRollback } from "react-icons/ai";
import { ImgSlider2 } from "@/components/tools/ImgSlider2";

const outerVariants = { open: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }, closed: { transition: { staggerChildren: 0.7, staggerDirection: -1 } } };
const textVariants = { open: { opacity: 1, transition: { delay: .5 } }, closed: { opacity: 0 } }
const linkVariants = { open: { y: 0, opacity: 1 }, closed: { y: -100, opacity: 0 } }
const languageVariants: Variants = { open: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } }, closed: { scale: 0, opacity: 0, } }
const Bottom = { open: { opacity: 1 }, closed: { opacity: 0 } }



type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

const Flutter = ({ Data }: { Data: T_Flutter }) => {
  const router = useRouter();
  const { roboto, ubuntu, poppins, lato } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const links = [{ url: Data.release, icon: <BsAndroid2 />, text: 'Release' }, { url: Data.gitRepo, icon: <FaGithub />, text: 'Git Repositories' }]

  const devFlag: boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;

  return (
    <>
      {devFlag && <DevFlag />}
      <Head>
        <meta property='og:title' content={`Moinak Majumdar | Details`} />
        <title>{`Moinak Majumdar | Details`}</title>
      </Head>
      <section className='relative min-h-screen'>
        <div className={`myContainer pt-[4rem] pb-[2rem] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <AnimatedHeading classList="mt-8 uppercase" title="Flutter Project" />
          <h1 style={ubuntu.style} className="font-bold lg:text-5xl text-4xl capitalize">{Data.name}</h1>
          <motion.div variants={outerVariants} viewport={{ once: false, amount: 0.2 }} initial='closed' animate='open' className="flex flex-col">
            <div className="flex flex-col justify-center w-full">
              <motion.article variants={textVariants} style={poppins.style} className="text-base lg:text-lg w-full py-4 mr-4" dangerouslySetInnerHTML={{ __html: Data.description }}>
              </motion.article>
              <div className="w-fit mt-8 flex flex-col lg:flex-row items-center justify-center mx-auto lg:gap-10">
                <div className="w-[90%] lg:max-w-[18rem] flex flex-col ml-0 xl:ml-8 lg:text-xl text-lg justify-center lg:justify-start">
                  {links.map((curr, i) => {
                    return (
                      <motion.a key={`links-${i}`} variants={linkVariants} className="mt-4 py-2 px-3 md:px-4 rounded-full flex items-center border-2" style={{ borderColor: theme.val, boxShadow: `0px 0px 25px ${theme.val}` }} href={curr.url} target='_blank' rel="noreferrer">
                        {curr.icon}
                        <span className="ml-2" style={poppins.style}>{curr.text}</span>
                      </motion.a>
                    )
                  })}
                </div>
                  <div className="mt-6 md:mt-0 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-10 w-fit mx-auto">
                    {Data['badge'].map((curr, index) => {
                      return (
                        <motion.div variants={languageVariants} key={index} className={`rounded-2xl px-6 py-4 w-24 flex items-center flex-col capitalize shadow-2xl ${darkMode ? 'bg-slate-800/80 shadow-black' : 'bg-slate-100 shadow-slate-400'}`} style={poppins.style}>
                          <Image src={`/assets/language/${curr}`} height={50} width={50} alt={curr} />
                          <span className='text-base mt-2'>{curr.split('.')[0]}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
            </div>
            <motion.div variants={Bottom} className="mx-auto flex flex-col mt-20 w-full">
              <div className="mx-auto mb-6 flex items-center text-2xl md:text-3xl">
                <FaRegImages className="text-4xl" style={{ color: theme.val }} />
                <h1 className='ml-2' style={ubuntu.style}>Some
                  <span className="ml-2 font-bold">Screenshots</span>
                </h1>
              </div>
              <ImgSlider2 images={Data.img} />
            <div className="mt-16 flex flex-col items-start">
              <h3 className="text-2xl font-bold" style={roboto.style}>Pub Dependencies :</h3>
              <p className="mt-2" style={poppins.style}>
                {Data.libraries.toString().replaceAll(',', ", ")}
              </p>
            </div>
              <div className='mt-16 mx-auto'>
                <Button onClick={() => router.back()}>
                  <div className='text-2xl flex items-center gap-4'>
                    <AiOutlineRollback />
                    <span style={poppins.style} className='font-bold'>Back</span>
                  </div>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="fixed w-full  h-full bottom-0 left-0 -z-10">
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
          <Bg
            alt="landing pattern"
            src={darkMode ? '/assets/svg/body-dark.svg' : '/assets/svg/body-lite.svg'}
            className="opacity-100"
          />
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-b z-10  ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ providerId: string }>) {
  const { Flutter } = context.query;

  let Data
  await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getFlutter`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY, slug: Flutter }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
    Data = res.data
  }).catch((err) => {
    console.log(err)
  })
  return { props: { Data } }
}

export default Flutter