import { useFont } from "@/context/FontProvider";
import colorThemeSlice from "@/redux/slices/colorThemeSlice";
import { AppDispatch } from "@/redux/store";
import { Variants, motion } from "framer-motion";
import { useDispatch } from "react-redux";

const themes = [
  { themeName: 'Teal', themeColor: '#2dd4bf' },
  { themeName: 'Cyan', themeColor: '#22d3ee' },
  { themeName: 'Yellow', themeColor: '#eab308' },
  { themeName: 'Green', themeColor: '#22c55e' },
  { themeName: 'Sky', themeColor: '#0ea5e9' },
  { themeName: 'Pink', themeColor: '#ec4899' },
  { themeName: 'Orange', themeColor: '#f97316' },
  { themeName: 'Red', themeColor: '#ef4444' },
  { themeName: 'Purple', themeColor: '#a855f7' },
  { themeName: 'Blue', themeColor: '#3b82f6' },
  { themeName: 'Indigo', themeColor: '#6366f1' },
  { themeName: 'Slate', themeColor: '#64748b' },
]

interface props {
   variants: Variants
}

const ColorSetting = ({ variants }:props) => {

  const {poppins, lato} = useFont();
  const dispatch = useDispatch<AppDispatch>();

  function themeChanger(name: string, val: string) {
    dispatch(colorThemeSlice.actions.predefinedColor({name, val}));
  }

  function randomTheme () {
    dispatch(colorThemeSlice.actions.randomColor())
  }

  return (
    <div className="w-full flex flex-col">
      <div className='w-fit grid grid-cols-4 md:grid-cols-6 mt-4 gap-3 mx-auto'>
        {themes.map((curr, index) => {
          return (
            <motion.div
              key={index} style={poppins.style} className="text-xs"
              variants={variants}
              whileHover={{ scale: 1.15 , transition: {duration: .5, ease: 'easeInOut'}}}
              whileTap={{ scale: 0.95 }}>
              <button onClick={() => themeChanger(curr.themeName, curr.themeColor)} title={curr.themeName} className='h-8 w-14 cursor-pointer rounded-tl-3xl rounded-br-3xl' style={{ boxShadow: `0px 0px 15px ${curr.themeColor}`, backgroundColor: `${curr.themeColor}` }}>{curr.themeName}</button>
            </motion.div>
          )
        })}
      </div>
      <motion.button whileTap={{scale: 0.9}} onClick={randomTheme} variants={variants} className='flex max-w-sm mt-8 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-white text-md lg:text-xl font-bold shadow-md rounded-tl-3xl rounded-br-3xl mx-auto py-2 px-4' style={lato.style}>
        <h2>Random Color</h2>
      </motion.button>
    </div>
  )
}

export default ColorSetting