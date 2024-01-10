import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { motion, Variants } from 'framer-motion'
import { useFont } from '@/context/FontProvider'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Head from 'next/head'

const circleRotate: Variants = {
    open: { rotate: 0, transition: { repeat: Infinity, ease: "linear", duration: 1 } },
    closed: { rotate: 360 }
}


interface props { children: ReactNode }
const PageLoader = ({ children }: props) => {
    const { poppins } = useFont()
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);
    const router = useRouter();
    const [Loading, setLoading] = useState<boolean | undefined>()

    useEffect(() => {
        const start = (url: string) => (url !== router.asPath) && setLoading(true)
        const end = (url: string) => setLoading(false)
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end)

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end)
        }
    })

    if (Loading) {
        return (
            <>
                <Head>
                    <meta property='og:title' content='Moinak Majumdar | Loading...' />
                    <title>Moinak Majumdar | Loading...</title>
                </Head>
                <section className={`min-w-[100vw] min-h-screen flex justify-center items-center flex-col ${darkMode ? 'bg-[#000011] text-gray-200' : 'bg-white text-slate-800'}`} style={{ color: theme.val }}>
                    <motion.div variants={circleRotate} initial="closed" animate="open" className={` ${darkMode ? 'border-gray-800' : 'border-slate-200'} flex justify-center items-center rounded-full p-1 border-2`} style={{ borderRightColor: darkMode ? '#f4e5f0' : '#f774bb' }}>
                        <motion.div className={` ${darkMode ? 'border-gray-800' : 'border-slate-200'} flex justify-center items-center rounded-full p-1 border-2`} style={{ borderTopColor: darkMode ? '#e536ab' : '#3cf2de' }}>
                            <motion.div className={` ${darkMode ? 'border-gray-800' : 'border-slate-200'} flex justify-center items-center rounded-full p-1 border-2`} style={{ borderLeftColor: darkMode ? '#5c03bc' : '#f7ea60' }}>
                                <motion.div className={` ${darkMode ? 'border-gray-800' : 'border-slate-200'} flex justify-center items-center rounded-full p-2 border`} style={{ borderBottomColor: darkMode ? '#eef2f3' : '#ec8235' }}>
                                    <motion.div initial={{ rotate: 360, opacity: .9 }} animate={{ rotate: 0, opacity: 1 }} transition={{ repeat: Infinity, }} className={`w-14 h-14 rounded-full ${darkMode ? 'bg-[#1c1554]' : 'bg-[#cad0ff]'}`} style={{ clipPath: 'polygon(0 0,50% 50%,0 100%, 100% 100%, 50% 50%, 100% 0)' }}></motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <h1 className='text-3xl mt-8' style={poppins.style}>Loading ...</h1>
                </section>
            </>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }

}

export default PageLoader