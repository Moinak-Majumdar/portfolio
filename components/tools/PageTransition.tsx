import NextNProgress from 'nextjs-progressbar'
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface Props {
  children: ReactNode
}

function PageTransition({ children }: Props) {
  const router = useRouter();
  const theme = useSelector((s: RootState) => s.colorTheme);

  const variants: Variants = {
    hidden: {
      opacity: 0, scale: 1.01
    },
    visible: {
      opacity: 1, scale: 1
    },
    exit: {
      opacity: 0, scale: 0.99
    }
  }

  return (
    <>
      <NextNProgress color={theme.val} height={3} showOnShallow={true} options={{showSpinner: false}} />
      <AnimatePresence mode="wait">
        <motion.section key={router.route} variants={variants} initial='hidden' animate='visible' exit='exit'
          transition={{ duration: 0.5, }}>
          {children}
        </motion.section>
      </AnimatePresence>
    </>
  );
}

export default PageTransition;