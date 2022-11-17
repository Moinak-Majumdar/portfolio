import { useRouter } from "next/router";
import { FaFacebookSquare, FaGithub, FaWhatsapp, FaLinkedin, FaPhoneAlt } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import Button from "../components/tools/Button";
import Bg from "../components/tools/Bg";
import Ring from "../components/others/Ring";

const links = [
    { url: 'https://github.com/Moinak-Majumdar', icon: <FaGithub />, toolTip: 'GitHub' },
    { url: 'https://www.linkedin.com/in/moinak-majumdar-b7a85b238/', icon: <FaLinkedin />, toolTip: 'Linkedin' },
    { url: 'mailto:moinak2030@gmail.com', icon: <MdMarkEmailUnread />, toolTip: 'Email' },
    { url: 'https://www.facebook.com/moinak.majumdar.9', icon: <FaFacebookSquare />, toolTip: 'Facebook' },
    { url: 'https://api.whatsapp.com/send?phone=+919804139678&text=I%20like%20your%20work', icon: <FaWhatsapp />, toolTip: 'Whatsapp' },
    { url: 'tel:+919804139678', icon: <FaPhoneAlt />, toolTip: 'Phone' },
]

export default function Custom500({ darkMode, theme }) {
    const router = useRouter()
    return (
        <section className="max-h-screen relative">
            <section className={`myContainer min-h-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="mt-52 max-w-md md:ml-20">
                    <h1 className="text-6xl font-ubuntu font-bold">500 Internal Server Error !</h1>
                    <h2 className="text-2xl mt-2">Sorry! something happen unexpected. Please wait or report to the developer.</h2>
                    <div className='flex mt-8 gap-6 mr-auto'>
                        {links.map((curr, index) => {
                            return (
                                <a key={`${curr.toolTip}_${index}`} href={curr.url} target='_blank'>
                                    <span title={curr.toolTip} className='text-3xl cursor-pointer'>{curr.icon}</span>
                                </a>
                            )
                        })}
                    </div>
                    <Button theme={theme} type='button' className='mt-8' onClick={() => router.back()}>Go Back</Button>
                </div>
            </section>
            <Ring darkMode={darkMode} />
            <div className="absolute w-full h-full top-0 right-0 -z-40">
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-b z-10 ${darkMode ? 'from-[#141e30]' : 'from-[#ffffff]'}`}></div>
                <Bg
                    alt="landing pattern"
                    src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
                    className={darkMode ? "opacity-50" : "opacity-80"}
                />
            </div>
        </section>
    )
}