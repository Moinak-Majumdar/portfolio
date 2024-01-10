import {useContext, createContext, ReactNode, Context,} from 'react'
import { NextFont } from 'next/dist/compiled/@next/font';
import { Roboto, Ubuntu, Comic_Neue, Poppins, Lato, Pacifico } from 'next/font/google'

const roboto = Roboto({ display: 'swap', weight: ['400', '500', '700'], subsets: ['latin'] });
const ubuntu = Ubuntu({ display: 'swap', weight: ['400', '700'], subsets: ['latin'] });
const comicNeue = Comic_Neue({ display: 'swap', weight: ['700'], subsets: ['latin'] });
const poppins = Poppins({ display: 'swap', weight: ['400', '500', '600', '700'], subsets: ['latin'] })
const lato =  Lato({display: 'swap', weight:['400', '700'], subsets: ['latin']});
const pacifico = Pacifico({display: 'swap', weight: ['400'], subsets: ['latin']});

type contextType = {roboto: NextFont, ubuntu: NextFont, comicNeue: NextFont, poppins: NextFont, lato: NextFont, pacifico: NextFont};
let FontContext: Context<contextType>;

interface props {children: ReactNode}
export default function FontProvider({children}: props) {

    const value = {roboto, ubuntu, comicNeue, poppins, lato, pacifico}
    FontContext = createContext(value);

    return(
        <FontContext.Provider value={value}>
            {children}
        </FontContext.Provider>
    );
}

export function useFont() {
    return useContext(FontContext);
}