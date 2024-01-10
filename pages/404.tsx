import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../components/tools/Button";
import Bg from "../components/tools/Bg";
import Ring from "../components/others/Ring";
import SocialMedia from "@/components/others/SocialMedia";
import { useFont } from "@/context/FontProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function Custom404() {
    const {ubuntu, poppins} = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Page not found</title>
            </Head>
            <section className="max-h-screen relative overflow-hidden">
                <section className={`myContainer min-h-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <div className="mt-44 max-w-md md:ml-20" style={ubuntu.style}>
                        <h1 className="text-6xl font-bold ml-6">404 Page not found !</h1>
                        <h2 className="text-2xl mt-2 ml-6" style={poppins.style}>Sorry! the page you are looking for is temporarily unavailable or might be removed.</h2>
                        <SocialMedia classList='flex mt-8 gap-6 ml-6' />
                        <Button  type='button' className='py-8' onClick={() => router.back()}>
                            <span style={poppins.style}>Go Back</span>
                        </Button>
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
        </>
    )
}