import { RootState } from "@/redux/store";
import { Variants, motion } from "framer-motion";
import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import AnimatedHeading from "../tools/AnimatedHeading";
import Link from "next/link";
import { useFont } from "@/context/FontProvider";

const outerVariants: Variants = {
  open: { transition: { staggerChildren: 0.1, delayChildren: 0.5, delay: .4 } },
  closed: { transition: { staggerChildren: 0.07, staggerDirection: -1 } }
};
const innerVariants: Variants = {
  open: { y: 0, opacity: 1, transition: { type: 'linear', stiffness: 150 } },
  closed: { y: 50, opacity: 0, }
};

type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

const FlutterCard = ({ info }: { info: T_Flutter }) => {
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const {poppins, ubuntu} = useFont()

  return (
    <Link href='Flutter/pixelperks' className={`flex flex-col-reverse md:flex-row justify-start group rounded-xl ${darkMode ? 'bg-slate-800 text-gray-300 shadow-black' : 'bg-gray-100 text-gray-800 shadow-slate-400'}`}>
      <motion.div className="p-6 flex flex-col w-full md:w-1/2" initial='closed' whileInView='open' viewport={{ once: false, amount: 0.3 }} variants={outerVariants}>
        <motion.div variants={innerVariants} className="flex items-center">
          <AnimatedHeading classList="text-2xl md:text-3xl" title="PixelPerks" />
          <p className={`my-auto ml-4 px-4 py-1 rounded-xl text-xs text-center text-white ${info.status == 'completed' ? 'bg-green-500' : 'bg-red-500'}`}>{info.status}</p>
        </motion.div>
        <motion.p variants={innerVariants} className="mt-4 text-xl" style={ubuntu.style}>{info.intro}</motion.p>
        <motion.p variants={innerVariants} className="mt-4 text-sm" style={poppins.style} dangerouslySetInnerHTML={{ __html: info.description.slice(0, 350).concat(' ...') }}></motion.p>
        <motion.p variants={innerVariants} className={`mt-6 text-sm group-hover:text-blue-500 px-4 py-2 rounded-md w-fit ${darkMode ? 'bg-slate-700  text-white' : 'bg-slate-200 text-black'}`}>Read More</motion.p>
      </motion.div>
      <div className="w-full md:w-1/2">
        <div className="m-3 rounded-l-xl md:rounded-l-none rounded-r-xl overflow-hidden">
          <Image src={info.cover} width={640} height={360} layout="responsive" alt="Card-Background" className="md:grayscale md:group-hover:grayscale-0 ease-linear duration-500  md:group-hover:scale-105" placeholder='blur' blurDataURL='/assets/image/imgPlaceholder.jpg' />
        </div>
      </div>
    </Link>
  )
}

export default FlutterCard