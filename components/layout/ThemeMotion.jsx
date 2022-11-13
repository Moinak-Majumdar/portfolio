import { motion } from "framer-motion";

const ThemeMotion = ({ setTheme, themeName, themeColor, variants }) => {

  function changeTheme() {
    setTheme({ name: themeName, val: themeColor })
    localStorage.setItem('theme', JSON.stringify({ name: themeName, val: themeColor }))
    const selection = document.getElementById('selection');
    const style = document.createElement('style');
    style.setAttribute('id', 'selection')
    style.textContent = `::selection { background-color: ${themeColor}; color: black;}`
    document.head.replaceChild(style, selection)
  }

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}>
      <button onClick={changeTheme} className='h-8 w-12 cursor-pointer rounded-full' style={{ boxShadow: `0px 0px 15px ${themeColor}`, backgroundColor: `${themeColor}` }} />
    </motion.div>
  )
}

export default ThemeMotion