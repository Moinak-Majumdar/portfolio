import { motion } from 'framer-motion'
import Bg from "../tools/Bg"
import AnimatedHeading from '../tools/AnimatedHeading'
import { useFont } from '@/context/FontProvider'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Right = {
  closed: { x: 0, y: 100, rotate: '40deg' },
  open: { x: -350, y: 150, rotate: '-40deg'}
}
const Right2 = {
  closed: { x: 50, y: 250, opacity: 0, rotate: '-30deg' },
  open: { x: -350, y: 400, opacity: 1, rotate: '-40deg' }
}

const leftOuterVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 0.3 }
  },
  closed: {
    transition: { staggerChildren: 0.3, staggerDirection: -1 }
  }
};
const leftInnerVariants = {
  open: { y: 0, opacity: 1,},
  closed: { y: -50, opacity: 0,}
}

const timeline = [
  {
    name: "Graduation",
    sub: 'OOP, computer system architecture, operating system, data structure and algorithm, database management systems, computer networks, fundamentals of artificial intelligence, digital image processing and computer graphics.',
    date: 'jun 2019 - july 2022',
    from: 'Completed B.Sc computer science from Barrackpore Rastraguru Surendranath College (West Bengal State University), West Bengal.',
    grade: '9.59 (CGPA)'
  },
  {
    name: 'Higher Secondary',
    sub: null,
    date: 'jun 2017 - mar 2019',
    from: 'Completed higher secondary from Ramkrishna Vivekananda Mission Vidyabhavan (West Bengal Council of Higher Secondary Education)',
    grade: '70%'
  },
  {
    name: 'Secondary',
    sub: null,
    date: 'jan 2016 - mar 2017',
    from: 'Completed 10th board from Ramkrishna Vivekananda Mission Vidyabhavan (West Bengal Board of Secondary Education)',
    grade: '77%'
  }
]


const AboutMe = () => {

  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const {ubuntu, poppins, roboto} = useFont()

  return (
    <>
      <div className={`myContainer p-10 z-10 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <div className="flex flex-col w-full lg:text-lg">
          <AnimatedHeading classList="tracking-wide text-lg" title='ABOUT ME' />
          <h1 className="text-4xl lg:text-5xl mb-4" style={ubuntu.style}>
            A small<span className="font-bold ml-2">Introduction</span>
          </h1>
          <article style={poppins.style}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Hey, this is <span style={{ color: theme.val }}> Moinak Majumdar</span>, a self taught developer. Currently pursuing Masters in Computer Application [MCA] from <span style={{ color: theme.val }}>Maulana Abul Kalam Azad University of Technology</span>, West Bengal, India.
              <br /><span className="mt-2">I am highly motivated about learning multiple programming languages and framework. I have been passionate about UI/UX design and fullstack development since my early college days. But I am Still learning lot of things in design and development.</span>
            </p>
          </article>
          <h2 className="mt-4 text-2xl font-bold" style={ubuntu.style}>Timeline</h2>
          <motion.ul initial='closed' whileInView='open' viewport={{ once: true, amount: 0.3 }} variants={leftOuterVariants} className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {timeline.map((curr, index) => {
              return (
                <motion.li variants={leftInnerVariants} key={index} className={`mt-4  flex flex-col pl-5 border-l-2 ${darkMode ? 'border-slate-600' : 'border-slate-700'}`}>
                  <h1 className={`${poppins.className} text-sm`} style={{ color: theme.val }}>{curr.date}</h1>
                  <h2 className={`text-xl lg:text-2xl font-bold ${ubuntu.className} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{curr.name}</h2>
                  <p className="mt-2" style={roboto.style}>{curr.from}</p>
                  <ul className="list-disc list-inside mt-2">
                    {curr.sub && <li>
                      <span style={ubuntu.style} className="font-bold mr-1">Course :</span>
                      <span style={roboto.style}>{curr.sub}</span>
                    </li>}
                    <li style={ubuntu.style}>
                      <span className="font-bold mr-1">Grade :</span>
                      <span className='font-bold'>{curr.grade}</span>
                    </li>
                  </ul>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
      {/* background */}
      <div className="absolute w-full md:w-1/3 h-full top-0 left-0  -z-10">
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
          className="opacity-100"
        />
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
      </div>
      <div className='w-full overflow-hidden'>
        <motion.div variants={Right} transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }} className={`absolute top-[30%] right-0 lg:right-32 w-80 lg:w-[40%] h-12 lg:h-20 rounded-full bg-gradient-to-l ${darkMode ? 'to-[#FF008E] from-blue-500 blur-[90px]' : 'from-pink-500 to-indigo-500 blur-[80px]'}`}></motion.div>
        <motion.div variants={Right2} transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }} className={`absolute top-[45%] lg:top-[30%] right-0 lg:right-32 w-80 h-16 rounded-xl ${darkMode ? 'bg-indigo-600' : 'bg-gradient-to-b from-teal-400 to-blue-500'} blur-[70px]`}></motion.div>
      </div>
    </>
  )
}

export default AboutMe