import styles from '../../styles/QrCode.module.css'
import {motion} from 'framer-motion'

const divVariants = {
    initial: {
        opacity: 0
    },
    animate: (i = 1) => ({
        opacity: 1,
        transition: {staggerChildren: 0.45, delayChildren: 0.4 * i, }
    })
    
}
const spanVariants = {
    initial: {
        opacity: 0,
        y: -20,
        x: -20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100
        }
    },
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            repeat: Infinity,
            duration: 2,
            type: 'spring',
            damping: 12,
            stiffness: 100
        }
    }
}

const QrCode = ({darkMode}) => {
    const text = "Fetching About Me . . ."
    const word = text.split(' ')
    return (
        <div className={styles.scan}>
            <div className={styles.qr}></div>
            <div className='flex mt-10'>
                <motion.ul variants={divVariants} initial='initial' animate='animate' className='overflow-hidden flex'>
                    {word.map((word, i) => {
                        return(
                            <motion.li variants={spanVariants} key={i}>
                               <span className={`mr-2 txt3 text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{word}</span>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>
        </div>
    )
}

export default QrCode