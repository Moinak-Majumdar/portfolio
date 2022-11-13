import Link from "next/link";
import {AiFillFacebook, AiFillLinkedin, AiFillGithub,} from "react-icons/ai";
import { motion } from "framer-motion";

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

function Footer({ theme, darkMode, Left, Right, id }) {
    return (
        <>
            <footer id={id} className='mt-auto w-full pt-8 pb-2 flex flex-col text-white'>
                <motion.div variants={Right} className={`ml-auto w-[90%] flex justify-center items-center py-4 ${darkMode ? 'bg-slate-800' : 'bg-black'}`}>
                    <div className="w-[90%] flex md:justify-between justify-center flex-col md:flex-row">
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
                                Connect with me
                            </p>
                            <div className="flex items-center md:justify-end gap-2">
                                {socialLinks.map((link) => (
                                    <Link key={link.name} href={link.url}>
                                        <a className="text-2xl" target="_blank">
                                            {link.icon}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={Left} className="w-[90%] ml-auto justify-center flex mt-4 gap-4" style={{ color: theme.val }}>
                    <p className="font-ubuntu">Copyright {new Date().getFullYear()} - All rights reserved.</p>
                    <p className="font-ubuntu">Designed and Developed with Next.js, Framer Motion and Tailwind Css </p>
                </motion.div>
            </footer>
        </>
    );
}

export default Footer;