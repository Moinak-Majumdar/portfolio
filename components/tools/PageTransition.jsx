import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function PageTransition({ children }) {
  const router = useRouter();

  const variants = {
    hidden: {
      // x: typeof window !== 'undefined' ? -window.innerWidth : '-100vw',
      // y: typeof window !== 'undefined' ? -window.innerHeight : '-100vh',
      // width: 0,
      opacity: 0,
    }, 
    visible: {
      // x: 0,
      // y: 0,
      // width: '100%',
      opacity:1,
      transition:{duration: 1}
    },
    exit: {
      //x: typeof window !== 'undefined' ? -window.innerWidth : '-100vw',
      //y: typeof window !== 'undefined' ? window.innerHeight : '-100vh',
      opacity: 0,
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.route}
        variants={variants}
        initial='hidden'
        animate='visible'
        exit='exit'
        style={{ position: 'absolute', top: 0, left: 0, minHeight: '100vh', minWidth: '100vw', overflow: 'hidden'}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;