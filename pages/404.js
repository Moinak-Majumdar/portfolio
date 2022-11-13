import Button from "../components/tools/Button";
import Bg from "../components/tools/Bg";
import { useRouter } from "next/router";
import Ring from "../components/others/Ring";

export default function Custom404({ darkMode, theme }) {
    const router = useRouter()
    return (
        <section className="max-h-screen relative">
            <section className={`myContainer min-h-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="mt-52 max-w-md md:ml-20">
                    <h1 className="text-6xl font-ubuntu font-bold">404 Page not found !</h1>
                    <h2 className="text-2xl mt-2">Sorry! the page you are looking for might be removed or temporarily unavailable.</h2>
                    <Button theme={theme} type='button' className='mt-8 mr-auto' onClick={() => router.back()}>Go Back</Button>
                </div>
            </section>
            <Ring darkMode={darkMode} />
            <div className="absolute w-full h-full top-0 right-0 -z-40">
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-b z-10 ${darkMode? 'from-[#141e30]' : 'from-[#ffffff]'}`}></div>
                <Bg
                    alt="landing pattern"
                    src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
                    className={darkMode?"opacity-50":"opacity-80"}
                />
            </div>
        </section>
    )
}