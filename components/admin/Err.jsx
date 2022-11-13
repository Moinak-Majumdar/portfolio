import Ring from "../others/Ring"
import Bg from '../tools/Bg'

const Err = ({darkMode, error}) => {
    return (
        <section className="max-h-screen relative">
            <div className={`myContainer min-h-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="mt-52 max-w-md md:ml-20">
                    <h1 className="text-6xl font-ubuntu font-bold">Error</h1>
                    <h2 className="text-2xl mt-2">{error}</h2>
                </div>
            </div>
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

export default Err