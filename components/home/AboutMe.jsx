import QrCode from "../others/QrCode"
import Bg from "../tools/Bg"
import { motion } from 'framer-motion'

const Left = {
  closed: {
    y: -80,
    x: 80,
    opacity: 0.5,
  },
  open: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

const timeline = [
  { name: "Under Graduation",
    sub: 'OOP, computer system architecture, operating system, data structure and algorithm (design), database management systems, fundamentals of artificial intelligence, digital image processing.',
    date: 'jun.2019 - july.2022',
    from: 'Completed B.Sc computer science from Barrackpore Rastraguru Surendranath College (West Bengal State University), West Bengal.',
    grade: '9.8 (CGPA)' },
  { name: 'Higher Secondary',
    sub: null,
    date: 'jun.2017 - mar.2019',
    from: 'Completed higher secondary from Ramkrishna Vivekananda Mission Vidyabhavan (West Bengal Council of Higher Secondary Education)',
    grade: '70%'},
  { name: 'Secondary',
    sub: null,
    date: 'jan.2016 - mar.2017',
    from: 'Completed 10th board from Ramkrishna Vivekananda Mission Vidyabhavan (West Bengal Board of Secondary Education)',
    grade: '77%'}
]

const AboutMe = ({ darkMode, theme, key }) => {
  return (
    <section key={key} id='aboutMe' className={`relative ${darkMode? 'bg-gradient-to-t from-slate-900':''}`}>
      <div className={`myContainer pt-10 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:justify-between">
          <div className="flex flex-col mt-10 lg:mt-0 w-full lg:w-[75%]">
            <h4 className="font-ubuntu tracking-wide text-lg">ABOUT ME</h4>
            <h1 className="text-4xl lg:text-5xl mb-4 font-ubuntu">
              A small<span className="font-ubuntu font-bold ml-2">Introduction</span>
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Hey, this is <span style={{ color: theme.val }}> Moinak Majumdar</span>, a self taught developer. Currently pursuing Masters in Computer Application [MCA] from <span style={{ color: theme.val }}>Maulana Abul Kalam Azad University of Technology</span>, West Bengal, India.
              <br/><span className="mt-2">I am highly motivated about learning multiple programing languages and framework. I have been passionate about UI/UX design and fullstack development since my early college days. But I am Still learning lot of things in design and development.</span>
            </p>
            <h2 className="mt-4 text-2xl font-ubuntu font-bold">Timeline</h2>
            <ul className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              {timeline.map((curr, index) => {
                return(
                  <li key={index} className={`mt-4  flex flex-col pl-5 border-l-2 ${darkMode? 'border-slate-600':'border-slate-700'}`}>
                    <h4 className="text-sm" style={{color: theme.val}}>{curr.date}</h4>
                    <h2 className={`text-2xl font-ubuntu font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{curr.name}</h2>
                    <p className="mt-2 text-lg">{curr.from}</p>
                    <ul className="list-disc list-inside mt-2 text-lg">
                      {curr.sub && <li>
                        <span className="font-ubuntu font-bold mr-1">Course :</span>
                        <span>{curr.sub}</span>
                      </li>}
                      <li>
                        <span className="font-ubuntu font-bold mr-1">Grade :</span>
                        <span className='font-ubuntu font-bold'>{curr.grade}</span>
                      </li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
          <motion.div variants={Left}>
            <QrCode darkMode={darkMode} theme={theme} />
          </motion.div>
        </div>
      </div>
      <div className="absolute w-full md:w-1/3 h-full top-0 left-0  -z-10">
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
          className="opacity-100"
        />
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
      </div>
    </section>
  )
}

export default AboutMe