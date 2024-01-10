import { Provider } from "react-redux"
import { ReactNode } from "react"
import { store } from "./store"
import MemoryInitializer from "./MemoryInitializer"

interface props { children: ReactNode }

const Redux = ({ children }: props) => {
  return (
    <Provider store={store}>
      <MemoryInitializer>
        {children}
      </MemoryInitializer>
    </Provider>
  )
}

export default Redux