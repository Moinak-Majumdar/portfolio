import stylesDark from '../../styles/Hero.module.css'
import stylesLite from '../../styles/HeroLite.module.css'
import { motion } from 'framer-motion'
import ReactTypingEffect from 'react-typing-effect';


const Left = {
  closed: {
    x: 50,
    y: 50,
    opacity: 0.1,
  },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

const Right = {
  closed: {
    x: -50,
    y: -50,
    opacity: 0.1,
  },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    }
  }
}

const Hero = ({ darkMode, theme }) => {
  return (
    <section id='intro' className="min-h-screen flex relative overflow-hidden" style={{ background: `${darkMode ? 'radial-gradient(ellipse at bottom, #1b2735 0%,#090a0f 100%)' : 'radial-gradient(ellipse at bottom, #DFFEFE 0%,#FFFFFF 100%)'}` }}>
      <div className={` absolute ${darkMode ? stylesDark.stars : stylesLite.stars}`}></div>
      <div className={` absolute ${darkMode ? stylesDark.stars2 : stylesLite.stars2}`}></div>
      <div className={` absolute ${darkMode ? stylesDark.stars3 : stylesLite.stars3}`}></div>
      <div className='flex my-auto max-w-4xl mx-auto p-6 flex-col z-10'>
        <motion.div variants={Right}>
          <div className='flex'>
            <h2 className='text-xl md:text-2xl mr-1 font-ubuntu' style={{ color: theme.val }}>&lt;</h2>
            <ReactTypingEffect
              text={['Hello World !', 'नमस्ते दुनिया !', 'নমস্কার বিশ্ব!', 'こんにちは世界 !', 'Hola Mundo !', 'Bonjour le monde !', 'Olá Mundo!', 'Hallo Welt !', 'مرحبا بالعالم !', '你好世界 !']}
              speed={200}
              eraseSpeed={100}
              typingDelay={100}
              eraseDelay={1800}
              cursorClassName={`text-xl md:text-2xl ml-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}
              displayTextRenderer={(text, i) => {
                return (
                  <h2>
                    {text.split('').map((curr, i) => {
                      return (
                        <span key={i} className={`text-xl md:text-2xl font-ubuntu ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{curr}</span>
                      )
                    })}
                  </h2>
                )
              }}
            />
            <h2 className='text-xl md:text-2xl font-ubuntu ml-1' style={{ color: theme.val }}>/&gt;</h2>
          </div>
          <h1 className={`md:text-6xl text-4xl bg-gradient-to-b bg-clip-text text-transparent ${darkMode ? 'from-[#ffffff] to-[#38495a]' : 'from-[#4568DC] to-[#B06AB3]'}`}>
            <span className='font-ubuntu'>I&apos;m Moinak,</span>
            <span className='font-ubuntu font-bold ml-4'>UI Designer</span>
            <span className='ml-4 font-ubuntu'>and</span>
          </h1>
          <h1 className={`font-ubuntu font-bold mt-2 md:text-6xl text-4xl bg-gradient-to-b bg-clip-text text-transparent ${darkMode ? 'from-[#ffffff] to-[#38495a]' : 'from-[#4568DC] to-[#B06AB3]'}`}>Full Stack Web Developer.</h1>
        </motion.div>
        <motion.h4 variants={Left} className={`mt-4 text-lg sm:text-xl font-ubuntu ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>With many years of knowledge in coding, computer science, hands-on projects and also suitable understanding in Full Stack Development, I look forward to bringing my strong, creative, technical and analytical skills to the Full Stack Developer for the best. Therefore always excited to learn new things and add to my skill sets.</motion.h4>
      </div>
    </section>
  )
}

export default Hero