import { motion } from 'framer-motion'
import Link from "next/link";
import { AiFillFacebook, AiFillLinkedin, AiFillGithub, } from "react-icons/ai";

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
const smooth = {
    closed: {
        opacity: 0,
    },
    open: {
        opacity: 1,
        transition: { duration: .8},
    }
}
const smooth2 = {
    closed: {
        opacity: 0,
        y: -100,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: { delay: 1},
    }
}
const socialLinks = [
    {
        name: "Facebook",
        url: "https://www.facebook.com/moinak.majumdar.9",
        icon: <AiFillFacebook />,
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/moinak-majumdar-b7a85b238/",
        icon: <AiFillLinkedin />,
    },
    {
        name: "Github",
        url: "https://github.com/Moinak-Majumdar",
        icon: <AiFillGithub />
    },
];

function Footer({ darkMode }) {
    return (
        <>
            <motion.footer initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className='w-full pt-[4rem] flex flex-col text-white'>
                <div className={`ml-auto w-[90%] flex justify-center flex-col items-center py-4 ${darkMode ? 'bg-slate-800' : 'bg-black'}`}>
                    <motion.div variants={smooth} className="w-[90%] flex md:justify-between justify-center flex-col md:flex-row">
                        <div className="flex flex-col">
                            <h4 className="font-ubuntu">Something in mind</h4>
                            <h1 className="text-4xl font-ubuntu font-bold">Lets talk</h1>
                        </div>
                        <div className="flex flex-col mt-4 md:mt-auto">
                            <h4>drop a main</h4>
                            <a href="mailto:moinak2030@gmail.com">moinak2030@gmail.com</a>
                        </div>
                        <div className="space-y-1 mt-4 md:mt-auto">
                            <p className="text-base text-left md:text-right font-bold">
                                Follow me at
                            </p>
                            <div className="flex items-center md:justify-end gap-2">
                                {socialLinks.map((link) => (
                                    <Link key={link.name} href={link.url}>
                                        <a title={link.name} className="text-2xl" target="_blank">
                                            {link.icon}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div variants={smooth2} className={`ml-auto my-4 px-4 md:px-20 w-[90%] flex md:justify-between justify-center flex-col-reverse md:flex-row font-roboto ${darkMode? 'text-gray-300' : 'text-gray-800'}`} >
                    <h1 className="font-roboto font-bold my-auto">
                        <span>Copyright {new Date().getFullYear()} - All rights reserved.</span> <br/>
                        <span>Designed and Developed by Moinak05</span>
                    </h1>
                    <div className="flex flex-col my-2 md:my-0">
                        <h2 className="font-roboto font-bold">Credits</h2>
                        <ul className="mt-2 list-disc list-inside">
                            <li>
                                <Link href="http://www.freepik.com" target='_blank'>image: upklyak/Freepik</Link>
                            </li>
                            <li>
                                <Link href="https://patternpad.com/" target='_blank'>svg: patternpad</Link>
                            </li>
                            <li>
                                <Link href='https://www.framer.com/' target='_blank'>animation: framer</Link>
                            </li>
                            <li>
                                <Link href='https://nextjs.org/'  target='_blank'>platform: Next.js</Link>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.footer>
        </>
    );
}

export default Footer;