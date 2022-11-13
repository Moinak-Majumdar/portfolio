import { useState } from "react"
const Textarea = ({id, autoComplete, onChange, value, name, required, type, disable, darkMode, theme, placeholder, className}) => {

    const [isFocused, setIsFocused] = useState(false)

    return (
        <textarea 
            id={id} autoComplete={autoComplete} name={name} 
            onChange={onChange} value={value} 
            required={required} type={type}  placeholder={placeholder}
            onFocus={() => {setIsFocused(true)}}
            onBlur={() => {setIsFocused(false)}}
            className={`w-full h-24 resize-y rounded border outline-none py-1 px-3 leading-6 transition-colors duration-200 ease-in-out  ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'text-gray-700   border-gray-300'} ${disable ? 'cursor-not-allowed': ''} ${className}`}
            style={isFocused?{boxShadow: `0px 0px 5px ${theme.val}`, borderWidth : "1px", borderColor : `${theme.val}`}: null}
        />
    )
}

export default Textarea