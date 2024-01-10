import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../components/tools/Button";
import Bg from "../components/tools/Bg";
import Ring from "../components/others/Ring";
import SocialMedia from "@/components/others/SocialMedia";
import { useFont } from "@/context/FontProvider";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Custom500() {
    const router = useRouter()
    const { ubuntu, poppins } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    // const theme = useSelector((s: RootState) => s.colorTheme);
    return (
        <>
            <Head>
                <title>Server Error</title>
            </Head>
            <section className="max-h-screen relative overflow-hidden">
                <section className={`myContainer min-h-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <div className="mt-44 max-w-md md:ml-20">
                        <h1 className="text-6xl font-bold ml-6" style={ubuntu.style}>500 Internal Server Error !</h1>
                        <h2 className="text-2xl mt-2 ml-6" style={poppins.style}>Sorry! something happen unexpected. Please wait or report to the developer.</h2>
                        <SocialMedia classList='flex mt-8 gap-6 ml-6' />
                        <Button type='button' className='py-8' onClick={() => router.back()}>
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