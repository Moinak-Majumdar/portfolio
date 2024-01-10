import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'
import darkModeSlice from './slices/darkModeSlice'
import colorThemeSlice from './slices/colorThemeSlice'

interface props { children: ReactNode }
const MemoryInitializer = ({ children }: props) => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.style.backgroundColor = mode ? '#000011' : '#ffffff';
      dispatch(darkModeSlice.actions.setMode({ mode, modeLite: 'System' }));
      localStorage.setItem('theme', JSON.stringify({ name: 'Teal', val: '#2dd4bf', KitMode: 'System' }));
      const style = document.createElement('style');
      style.setAttribute('id', 'selection');
      style.textContent = '::selection { background-color: #2dd4bf; color: black;}'
      if (!document.getElementById('selection')) {
        document.head.appendChild(style)
        dispatch(colorThemeSlice.actions.predefinedColor({ name: 'Teal', val: '#2dd4bf'}));
      }
    } else {
      const storage = localStorage.getItem('theme')
      if (typeof storage === 'string') {
        const temp = JSON.parse(storage)
        const { name, val, KitMode } = temp
        dispatch(colorThemeSlice.actions.predefinedColor({ name, val }))
        if (KitMode === 'System') {
          const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          document.body.style.backgroundColor = mode ? '#000011' : '#ffffff';
          dispatch(darkModeSlice.actions.setMode({ mode, modeLite: 'System' }));
        }
        if (KitMode === 'Dark') {
          document.body.style.backgroundColor = '#000011'
          dispatch(darkModeSlice.actions.setMode({ mode: true, modeLite: 'Dark' }));
        }
        if (KitMode === 'Lite') {
          document.body.style.backgroundColor = '#ffffff'
          dispatch(darkModeSlice.actions.setMode({ mode: false, modeLite: 'Lite' }));
        }
        const style = document.createElement('style');
        style.setAttribute('id', 'selection')
        style.textContent = `::selection { background-color: ${temp.val}; color: black;}`
        if (!document.getElementById('selection')) {
          document.head.appendChild(style)
        }
      }
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default MemoryInitializer